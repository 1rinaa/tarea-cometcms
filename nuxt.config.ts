// @ts-expect-error Node.js type definitions are not available in this project.
import dns from 'node:dns'

dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '1.1.1.1', '192.168.50.1'])

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
  
  compatibilityDate: '2026-06-30',

  runtimeConfig: {
    cometUrl: 'https://cms-una.gt.tc',
    cometWorkspace: 'default'
  }
})