import { JSDOM } from 'jsdom'
import fs from 'node:fs/promises'
import path from 'node:path'

const CMS_HOST = 'https://cms-una.gt.tc'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

let cachedCookie = ''

async function fetchRaw(url, cookie = '') {
  return await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'application/json, text/html, */*',
      ...(cookie ? { Cookie: cookie } : {})
    }
  })
}

async function solveChallenge(html, url) {
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    url,
    pretendToBeVisual: true,
  })

  return new Promise((resolve) => {
    const start = Date.now()
    const check = setInterval(() => {
      const cookie = dom.window.document.cookie || ''
      if (cookie.includes('__test')) {
        clearInterval(check)
        const m = cookie.match(/__test=[^;]+/)
        dom.window.close()
        resolve(m ? m[0] : '')
      } else if (Date.now() - start > 15000) {
        clearInterval(check)
        dom.window.close()
        resolve('')
      }
    }, 200)
  })
}

async function fetchCms(resource) {
  const url = `${CMS_HOST}/api/v1/workspaces/default/${resource}?limit=100`

  if (cachedCookie) {
    const res = await fetchRaw(url, cachedCookie)
    const text = await res.text()
    if (!text.includes('aes.js')) return JSON.parse(text)
  }

  console.log(`🔒 Resolviendo challenge para ${resource}...`)
  const firstRes = await fetchRaw(url)
  const firstText = await firstRes.text()

  if (!firstText.includes('aes.js')) return JSON.parse(firstText)

  const cookie = await solveChallenge(firstText, url)
  if (!cookie) throw new Error('No se pudo resolver el challenge')
  console.log(`🍪 Cookie: ${cookie.substring(0, 60)}...`)
  cachedCookie = cookie

  const finalRes = await fetchRaw(url, cookie)
  const finalText = await finalRes.text()
  return JSON.parse(finalText)
}

async function main() {
  console.log('🚀 Fetching Comet CMS en build time...')

  const [nomRes, peliRes, catRes, perRes] = await Promise.all([
    fetchCms('content/nominaciones'),
    fetchCms('content/peliculas'),
    fetchCms('content/categorias'),
    fetchCms('content/personas'),
  ])

  console.log('📦 CMS data:', {
    nominaciones: nomRes.data.length,
    peliculas: peliRes.data.length,
    categorias: catRes.data.length,
    personas: perRes.data.length,
  })

  const peliMap = Object.fromEntries(peliRes.data.map(p => [p.id, p]))
  const catMap = Object.fromEntries(catRes.data.map(c => [c.id, c]))
  const perMap = Object.fromEntries(perRes.data.map(p => [p.id, p]))

  const data = nomRes.data.map(nom => {
    const nd = nom.data || {}
    const peli = peliMap[nd.pel_cula] || {}
    const cat = catMap[nd.categoria] || {}
    const per = perMap[nd.persona] || null

    const pf = peli.data || {}
    const cf = cat.data || {}
    const perf = per ? (per.data || {}) : null

    const nombrePersona = perf?.nombre || null
    const nombreCategoria = cf.nombre || cat.title || 'Sin categoría'
    const tituloPeli = pf.titulo || peli.title || 'Desconocida'

    return {
      id: nom.id,
      film: tituloPeli,
      category: nombreCategoria,
      year_ceremony: pf.anio || 0,
      year_film: pf.anio || 0,
      ceremony: pf.anio || 0,
      poster: (pf.poster && pf.poster[0]) ? pf.poster[0] : '/posters/placeholder.jpg',
      country: 'Estados Unidos',
      winner: Boolean(nd.ganador),
      people: nombrePersona ? [nombrePersona] : [],
      allNames: nombrePersona ? [nombrePersona] : [],
      name: nombrePersona || 'Anónimo',
      totalNominations: 1,
      winnersCount: nd.ganador ? 1 : 0,
      description: (() => {
        const w = nd.ganador ? 'Ganador' : 'Nominado'
        const base = `${w} del Oscar a ${nombreCategoria} en ${pf.anio || 'N/A'}`
        return nombrePersona ? `${base} - ${nombrePersona}` : base
      })()
    }
  })

  const outDir = path.join(process.cwd(), 'public', 'data')
  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(
    path.join(outDir, 'oscar-data.json'),
    JSON.stringify(data, null, 2)
  )
  console.log(`✅ Guardado: public/data/oscar-data.json (${data.length} registros)`)
}

main().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})