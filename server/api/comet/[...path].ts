import { JSDOM } from 'jsdom'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

// Cache de cookie para no resolver el challenge en cada petición
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

async function solveChallenge(html: string, url: string): Promise<string> {
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    url,
    pretendToBeVisual: true,
    //userAgent: UA
  })

  // Esperar a que el script del challenge setee la cookie __test
  await new Promise<void>((resolve) => {
    const start = Date.now()
    const check = setInterval(() => {
      const cookie = dom.window.document.cookie || ''
      if (cookie.includes('__test')) {
        clearInterval(check)
        resolve()
      } else if (Date.now() - start > 10000) {
        clearInterval(check)
        resolve()
      }
    }, 200)
  })

  const cookie = dom.window.document.cookie || ''
  dom.window.close()
  return cookie
}

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  const query = getQuery(event)
  const qs = new URLSearchParams(query as Record<string, string>).toString()
  const url = `https://cms-una.gt.tc/api/v1/workspaces/default/${path}${qs ? '?' + qs : ''}`

  // 1. Intentar con cookie cacheada
  if (cachedCookie && Date.now() < cookieExpires) {
    const res = await fetchRaw(url, cachedCookie)
    const text = await res.text()
    if (!text.includes('aes.js')) {
      try {
        return JSON.parse(text)
      } catch {
        // La cookie caducó, seguimos al challenge
      }
    }
  }

  // 2. Sin cookie válida: pedir la página y resolver el challenge
  console.log('🔒 Resolviendo challenge del CMS...')
  const firstRes = await fetchRaw(url)
  const firstText = await firstRes.text()

  // Si no hay challenge, ya es JSON
  if (!firstText.includes('aes.js')) {
    try {
      console.log('✅ Sin challenge, respuesta directa')
      return JSON.parse(firstText)
    } catch {
      throw new Error('Respuesta no-JSON inesperada: ' + firstText.substring(0, 200))
    }
  }

  const cookie = await solveChallenge(firstText, url)
  console.log('🍪 Cookie del challenge:', cookie.substring(0, 60) + '...')

  if (!cookie) {
    throw new Error('No se pudo resolver el challenge de InfinityFree')
  }

  // Cachear por 1 hora
  cachedCookie = cookie
  cookieExpires = Date.now() + 60 * 60 * 1000

  // 3. Reintentar con la cookie
  const finalRes = await fetchRaw(url, cookie)
  const finalText = await finalRes.text()

  try {
    const data = JSON.parse(finalText)
    console.log('✅ Proxy ← data.length:', data?.data?.length)
    return data
  } catch {
    console.error('❌ Respuesta no-JSON tras challenge:', finalText.substring(0, 300))
    throw new Error('El CMS no devolvió JSON ni después de resolver el challenge')
  }
})