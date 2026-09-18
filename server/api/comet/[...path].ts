import vm from 'node:vm'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const CMS_HOST = 'https://cms-una.gt.tc'

let cachedCookie = ''
let cookieExpires = 0

async function fetchRaw(url: string, cookie = '') {
  return await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'application/json, text/html, */*',
      ...(cookie ? { Cookie: cookie } : {})
    }
  })
}

async function extractCookieFromHtml(html: string, url: string): Promise<string> {
  // Fake DOM mínimo
  const urlObj = new URL(url)
  const fakeDocument: any = {
    _cookie: '',
    get cookie() { return this._cookie },
    set cookie(val: string) { this._cookie = val },
    location: { href: url },
  }
  const fakeLocation = {
    href: url,
    reload: () => {},
    replace: () => {},
    assign: () => {},
    pathname: urlObj.pathname,
    search: urlObj.search,
    hostname: urlObj.hostname,
    protocol: urlObj.protocol,
  }
  const fakeWindow: any = {
    document: fakeDocument,
    location: fakeLocation,
  }

  // Contexto con muchos stubs para que el challenge no explote
  const context = vm.createContext({
    document: fakeDocument,
    window: fakeWindow,
    location: fakeLocation,
    navigator: { userAgent: UA },
    setTimeout: () => {},
    setInterval: () => {},
    clearTimeout: () => {},
    clearInterval: () => {},
    console: { log: () => {}, error: () => {}, warn: () => {} },
    alert: () => {},
    Math,
    Date,
    String,
    Number,
    Array,
    Object,
    JSON,
    parseInt,
    parseFloat,
    isNaN,
    encodeURIComponent,
    decodeURIComponent,
    escape,
    unescape,
  })
  // Alias global para que `window.X` y `X` funcionen igual
  ;(context as any).globalThis = context

  // 1. Extraer y descargar los <script src="...">
    const srcRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/gi
    const externalSrcs: string[] = []
    let srcMatch
    while ((srcMatch = srcRegex.exec(html)) !== null) {
    if (srcMatch[1]) externalSrcs.push(srcMatch[1])
    }

  for (const src of externalSrcs) {
    const fullUrl = src.startsWith('http') ? src : `${CMS_HOST}${src.startsWith('/') ? '' : '/'}${src}`
    try {
      console.log('📥 Descargando script externo:', fullUrl)
      const res = await fetchRaw(fullUrl)
      const code = await res.text()
      vm.runInContext(code, context, { timeout: 5000 })
      console.log('✅ Script externo ejecutado:', src)
    } catch (e: any) {
      console.log('⚠️ Error con script externo', src, ':', e?.message)
    }
  }

  // 2. Extraer y ejecutar los scripts inline
  const inlineRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi
  const inlineScripts: string[] = []
  let inlineMatch
  while ((inlineMatch = inlineRegex.exec(html)) !== null) {
    if (inlineMatch[1] && inlineMatch[1].trim().length > 0) {
      inlineScripts.push(inlineMatch[1])
    }
  }

  for (const code of inlineScripts) {
    try {
      vm.runInContext(code, context, { timeout: 5000 })
    } catch (e: any) {
      console.log('⚠️ Error ejecutando script inline:', e?.message)
    }
  }

  const cookie: string = fakeDocument._cookie || ''
  console.log('🍪 Cookie completa:', cookie)
  const testMatch = cookie.match(/__test=[^;]+/)
  return testMatch ? testMatch[0] : ''
}

export default defineEventHandler(async (event) => {
  try {
    const path = getRouterParam(event, 'path') || ''
    const query = getQuery(event)
    const qs = new URLSearchParams(query as Record<string, string>).toString()
    const url = `${CMS_HOST}/api/v1/workspaces/default/${path}${qs ? '?' + qs : ''}`

    // 1. Probar con cookie cacheada
    if (cachedCookie && Date.now() < cookieExpires) {
      const res = await fetchRaw(url, cachedCookie)
      const text = await res.text()
      if (!text.includes('aes.js')) {
        try {
          return JSON.parse(text)
        } catch {
          // Cookie caducó, resolver challenge de nuevo
        }
      }
    }

    // 2. Sin cookie: pedir y resolver challenge
    console.log('🔒 Resolviendo challenge para:', path)
    const firstRes = await fetchRaw(url)
    const firstText = await firstRes.text()

    if (!firstText.includes('aes.js')) {
      try {
        return JSON.parse(firstText)
      } catch {
        throw new Error('Respuesta no-JSON: ' + firstText.substring(0, 200))
      }
    }

    const cookieValue = await extractCookieFromHtml(firstText, url)
    console.log('🍪 Cookie final:', cookieValue)

    if (!cookieValue) {
      throw new Error('No se pudo resolver el challenge')
    }

    cachedCookie = cookieValue
    cookieExpires = Date.now() + 30 * 60 * 1000

    // 3. Reintentar con la cookie
    const finalRes = await fetchRaw(url, cookieValue)
    const finalText = await finalRes.text()

    try {
      const data = JSON.parse(finalText)
      console.log('✅ Proxy OK:', data?.data?.length)
      return data
    } catch {
      console.error('❌ Respuesta no-JSON tras challenge:', finalText.substring(0, 300))
      throw new Error('El CMS no devolvió JSON ni tras resolver challenge')
    }
  } catch (err: any) {
    console.error('💥 ERROR EN PROXY:', err?.message)
    console.error('💥 STACK:', err?.stack)
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || 'Error desconocido en el proxy'
    })
  }
})