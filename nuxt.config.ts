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
  
  compatibilityDate: '2026-06-30'
})