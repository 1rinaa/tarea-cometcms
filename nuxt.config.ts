import dns from 'node:dns'

if (process.env.NODE_ENV !== 'production') {
  dns.setDefaultResultOrder('ipv4first')
  dns.setServers(['8.8.8.8', '1.1.1.1'])
}

export default defineNuxtConfig({
  devtools: { enabled: true },
  
  css: ['~/assets/css/main.css'],
  
  components: [
    { path: '~/components', pathPrefix: false }
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },

  nitro: {
    preset: 'netlify'
  },
  
  compatibilityDate: '2026-06-30',

  runtimeConfig: {
    cometUrl: 'https://cms-una.gt.tc',
    cometWorkspace: 'default'
  }
})