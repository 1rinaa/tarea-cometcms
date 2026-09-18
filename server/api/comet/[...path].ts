import vm from 'node:vm'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

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

// Ejecuta el script del challenge en un contexto falso para extraer la cookie __test
function extractCookieFromHtml(html: string, url: string): string {
  let cookie = ''
  
  // Extraer todos los <script> inline
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi
  const scripts: string[] = []
  let match
  while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1] && match[1].trim().length > 0) scripts.push(match[1])
  }
  
  if (scripts.length === 0) return ''
  
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
  
  const context = vm.createContext({
    document: fakeDocument,
    window: fakeWindow,
    location: fakeLocation,
    navigator: { userAgent: UA },
    setTimeout: () => {},
    clearTimeout: () => {},
    console: { log: () => {}, error: () => {} },
    alert: () => {},
  })
  
  for (const code of scripts) {
    try {
      vm.runInContext(code, context, { timeout: 5000 })
    } catch (e: any) {
      console.log('⚠️ Error ejecutando script del challenge:', e?.message)
    }
  }
  
  cookie = fakeDocument._cookie
  const testMatch = cookie.match(/__test=[^;]+/)
  return testMatch ? testMatch[0] : cookie
}

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  const query = getQuery(event)
  const qs = new URLSearchParams(query as Record<string, string>).toString()
  const url = `https://cms-una.gt.tc/api/v1/workspaces/default/${path}${qs ? '?' + qs : ''}`

  // 1. Probar con cookie cacheada
  if (cachedCookie && Date.now() < cookieExpires) {
    const res = await fetchRaw(url, cachedCookie)
    const text = await res.text()
    if (!text.includes('aes.js')) {
      try {
        return JSON.parse(text)
      } catch {
        // Cookie caducó, resolver challenge
      }
    }
  }

  // 2. Sin cookie: resolver challenge
  console.log('🔒 Resolviendo challenge...')
  const firstRes = await fetchRaw(url)
  const firstText = await firstRes.text()

  // Si ya es JSON (sin challenge)
  if (!firstText.includes('aes.js')) {
    try {
      console.log('✅ Sin challenge')
      return JSON.parse(firstText)
    } catch {
      throw new Error('Respuesta no-JSON: ' + firstText.substring(0, 200))
    }
  }

  // Ejecutar el challenge
  const cookieValue = extractCookieFromHtml(firstText, url)
  console.log('🍪 Cookie extraída:', cookieValue)

  if (!cookieValue) {
    throw new Error('No se pudo resolver el challenge')
  }

  // Cachear por 30 minutos
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
})