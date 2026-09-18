<!-- pages/about.vue -->
<template>
  <div class="min-h-screen bg-[#F5F0E8] dark:bg-[#000000]">
    <!-- Breadcrumbs -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
      <Breadcrumbs :custom-crumbs="breadcrumbs" />
    </div>

    <!-- Header -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
      <div class="flex items-center justify-center gap-4 mb-4">
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
        <svg class="w-10 h-10 text-[#BEA260]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
      </div>
      <h1 class="text-3xl md:text-5xl font-display font-light tracking-[0.15em] uppercase text-[#1A1410] dark:text-[#F3E09C]">
        Sobre este proyecto
      </h1>
      <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 text-sm mt-3 font-light tracking-wide">
        Alcance, fuentes y decisiones de diseño
      </p>
    </div>

    <!-- Contenido -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <!-- Tarjeta principal -->
      <div class="bg-white dark:bg-[#242424] rounded-3xl overflow-hidden border border-[#E8D5A3]/20 dark:border-[#3a3a3a] shadow-[0_8px_40px_rgba(190,162,96,0.1)] p-8 md:p-12">
        
        <!-- Introducción -->
        <div class="flex flex-col md:flex-row gap-8 items-start mb-10">
          <div class="flex-1">
            <h2 class="text-2xl font-display font-light text-[#1A1410] dark:text-[#F3E09C] mb-4">
              Datos <span class="gold-text font-medium">enfocados</span> para una mejor experiencia
            </h2>
            <p class="text-[#55565A]/70 dark:text-[#F3E09C]/50 font-light leading-relaxed">
              Este sitio web muestra información de las nominaciones y ganadores de los Premios Oscar,
              pero con un enfoque específico para mantener el proyecto manejable, rápido y con buen rendimiento.
            </p>
          </div>
          <div class="flex-shrink-0">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-[#BEA260]/20 to-[#F3E09C]/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-[#BEA260]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/30 to-transparent mb-10"></div>

        <!-- Grid de cards informativas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <!-- Card: Período -->
          <div class="group bg-[#FAF7F2] dark:bg-[#1a1a1a] rounded-2xl p-6 border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(190,162,96,0.1)]">
            <div class="flex items-center gap-3 mb-3">
              <h3 class="card-text text-lg font-display font-medium text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors">
                Período de tiempo
              </h3>
            </div>
            <p class="text-sm text-[#55565A]/70 dark:text-[#F3E09C]/50 font-light leading-relaxed">
              Solo se incluyen datos desde el <strong class="card-text font-medium">año 2000 hasta la actualidad</strong> 
              (incluyendo proyecciones hasta 2026). No encontrarás información de ceremonias anteriores al 2000.
            </p>
          </div>

          <!-- Card: Categorías -->
          <div class="group bg-[#FAF7F2] dark:bg-[#1a1a1a] rounded-2xl p-6 border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(190,162,96,0.1)]">
            <div class="flex items-center gap-3 mb-3">
              <h3 class="card-text text-lg font-display font-medium text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors">
                Categorías incluidas
              </h3>
            </div>
            <p class="text-sm text-[#55565A]/70 dark:text-[#F3E09C]/50 font-light leading-relaxed mb-3">
              Seleccionamos las categorías más relevantes para el público general:
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="cat in mainCategories" :key="cat" 
                    class="px-2 py-0.5 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-xs font-light">
                {{ cat }}
              </span>
            </div>
          </div>

          <div class="group bg-[#FAF7F2] dark:bg-[#1a1a1a] rounded-2xl p-6 border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(190,162,96,0.1)]">
            <div class="flex items-center gap-3 mb-3">
              <h3 class="card-text text-lg font-display font-medium text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors">
                Colecciones
              </h3>
            </div>
            <p class="text-sm text-[#55565A]/70 dark:text-[#F3E09C]/50 font-light leading-relaxed">
              Las colecciones permiten explorar los datos de manera más rápida y enfocada, como por ejemplo:
              <strong class="card-text font-medium">Películas por década</strong>, 
              <strong class="card-text font-medium">Top de ganadores en los oscars</strong>, 
              <strong class="card-text font-medium">Top de películas ganadoras</strong> y 
              <strong class="card-text font-medium">Clasificación de películas por país</strong>.

            </p>
          </div>

          <!-- Card: Fuente -->
          <div class="group bg-[#FAF7F2] dark:bg-[#1a1a1a] rounded-2xl p-6 border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(190,162,96,0.1)]">
            <div class="flex items-center gap-3 mb-3">
              <h3 class="card-text text-lg font-display font-medium text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors">
                Fuente de los datos
              </h3>
            </div>
            <p class="text-sm text-[#55565A]/70 dark:text-[#F3E09C]/50 font-light leading-relaxed">
              Los datos provienen del conjunto público 
              <a href="https://www.kaggle.com/datasets/thedevastator/oscar-awards-dataset" 
                 target="_blank" rel="noopener noreferrer"
                 class="text-[#BEA260] hover:underline transition-colors">
                "The Oscar Award" en Kaggle
              </a>.
              Han sido procesados y filtrados para adaptarlos a las necesidades de este proyecto.
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/30 to-transparent mb-10"></div>

        <!-- Sección: ¿Por qué esta selección? -->
        <div class="mb-10">
          <div class="flex items-center gap-3 mb-2">
            <h2 class="text-2xl font-display font-light text-[#1A1410] dark:text-[#F3E09C] mb-4">
              Seleccion y filtrado de <span class="gold-text font-medium">datos</span>
            </h2>
          </div>
          <div class="grid grid-cols-1  gap-4">
            <div class="bg-gradient-to-br from-[#BEA260]/5 to-[#F3E09C]/5 dark:from-[#BEA260]/10 dark:to-[#F3E09C]/5 rounded-xl p-5 border border-[#E8D5A3]/20 dark:border-[#3a3a3a]">
              <p class="text-sm text-[#55565A]/70 dark:text-[#F3E09C]/50 font-light">
                El conjunto de datos original contiene más de <strong class="text-[#BEA260] font-medium">13,000 registros</strong> 
                que abarcan más de 90 años de historia. Al reducir el alcance a categorías clave y años recientes, logramos:
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div class="bg-[#FAF7F2] dark:bg-[#1a1a1a] rounded-xl p-5 text-center border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300">
              <h4 class="text-sm font-medium text-[#1A1410] dark:text-[#F3E09C]">Rendimiento rápido</h4>
              <p class="text-xs text-[#55565A]/60 dark:text-[#F3E09C]/40 font-light">Búsquedas y filtros instantáneos</p>
            </div>
            <div class="bg-[#FAF7F2] dark:bg-[#1a1a1a] rounded-xl p-5 text-center border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300">
              <h4 class="text-sm font-medium text-[#1A1410] dark:text-[#F3E09C]">Experiencia enfocada</h4>
              <p class="text-xs text-[#55565A]/60 dark:text-[#F3E09C]/40 font-light">Información relevante al instante</p>
            </div>
            <div class="bg-[#FAF7F2] dark:bg-[#1a1a1a] rounded-xl p-5 text-center border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300">
              <h4 class="text-sm font-medium text-[#1A1410] dark:text-[#F3E09C]">Mantenimiento sencillo</h4>
              <p class="text-xs text-[#55565A]/60 dark:text-[#F3E09C]/40 font-light">Código y datos fáciles de gestionar</p>
            </div>
            <div class="bg-[#FAF7F2] dark:bg-[#1a1a1a] rounded-xl p-5 text-center border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300">
              <h4 class="text-sm font-medium text-[#1A1410] dark:text-[#F3E09C]">Proyecto académico</h4>
              <p class="text-xs text-[#55565A]/60 dark:text-[#F3E09C]/40 font-light">Ideal para portafolios y demos</p>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/30 to-transparent mb-10"></div>

        <!-- Tecnologías -->
        <div class="mb-6">
          <div class="flex items-center gap-3 mb-4">
            <h2 class="text-2xl font-display font-light text-[#1A1410] dark:text-[#F3E09C]">
              Tecnologias utilizadas
            </h2>
          </div>
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-sm font-light border border-[#BEA260]/20">
              Nuxt 3
            </span>
            <span class="px-4 py-2 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-sm font-light border border-[#BEA260]/20">
              Vue 3
            </span>
            <span class="px-4 py-2 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-sm font-light border border-[#BEA260]/20">
              Tailwind CSS
            </span>
            <span class="px-4 py-2 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-sm font-light border border-[#BEA260]/20">
              JSON
            </span>
            <span class="px-4 py-2 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-sm font-light border border-[#BEA260]/20">
              Vercel
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/30 to-transparent mb-8"></div>

        <!-- Nota final -->
        <div class="bg-gradient-to-r from-[#BEA260]/10 to-[#F3E09C]/10 dark:from-[#BEA260]/5 dark:to-[#F3E09C]/5 rounded-2xl p-6 border border-[#E8D5A3]/20 dark:border-[#3a3a3a]">
          <div class="flex items-start gap-4">
            <div>
              <p class="text-sm text-[#55565A]/70 dark:text-[#F3E09C]/50 font-light leading-relaxed">
                Este proyecto tiene fines educativos y de demostración. Si deseas explorar todos los
                datos históricos de los Oscar, te recomendamos visitar la 
                <a href="https://www.oscars.org/" target="_blank" rel="noopener noreferrer"
                   class="text-[#BEA260] hover:underline transition-colors">
                  página oficial de la Academia
                </a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumbs from '~/components/common/Breadcrumbs.vue';

const breadcrumbs = computed(() => [
  { path: '/', label: 'Inicio' },
  { path: '/about', label: 'Sobre este proyecto' }
]);

const mainCategories = [
  'Mejor Actor',
  'Mejor Actriz',
  'Mejor Actor de Reparto',
  'Mejor Actriz de Reparto',
  'Mejor Película',
  'Mejor Director',
  'Mejor Película de Animación',
  'Mejor Película Internacional',
];
</script>

<style scoped>
.gold-text {
  background: linear-gradient(135deg, #ceb96a 0%, #907538 50%, #d4c280 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-text {
  background: linear-gradient(135deg,  #8d8669 0%, #706240 50%, #8d8669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>