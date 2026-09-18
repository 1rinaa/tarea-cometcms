type CometResponse = { data?: any[]; meta?: any }

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  const query = getQuery(event)
  const url = `https://cms-una.gt.tc/api/v1/workspaces/default/${path}`
  
  try {
    const res = await $fetch.raw(url, {
      query,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        'Accept': 'application/json'
      }
    })
    
    console.log('🌐 Status:', res.status)
    console.log('🌐 Content-Type:', res.headers.get('content-type'))
    const body = res._data
    console.log('🌐 Tipo de body:', typeof body)
    console.log('🌐 Primeros 300 chars:', typeof body === 'string' ? body.substring(0, 300) : JSON.stringify(body).substring(0, 300))
    
    return body
  } catch (err: any) {
    console.error('🌐 Proxy ERROR:', err?.message ?? err)
    console.error('🌐 Status:', err?.response?.status)
    console.error('🌐 Data:', err?.response?._data)
    throw err
  }
})