<template>
  <div>
    <AppHeader />
    <main class="min-h-screen bg-[#F5F0E8] dark:bg-[#000000]">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    
  </div>
</template>

<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'es'
  }
})

const title = 'Oscar Awards - Historia de los Premios de la Academia'
const description = 'Explora la historia completa de los Premios Oscar desde 1927'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>