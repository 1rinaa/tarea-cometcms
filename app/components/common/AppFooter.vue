<!-- components/common/Footer.vue -->
<template>
    <footer class="bg-[#0A0808] border-t border-[#BEA260]/20 relative">
        <!-- Línea dorada decorativa superior -->
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
        
        <div class="container mx-auto px-4 py-12">
            <!-- Grid footer -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Logo y descripción -->
                <div class="space-y-3">
                    <NuxtLink to="/" class="flex items-center gap-3 group">
                        <img 
                            src="/oscar-award.png" 
                            alt="Oscar Awards Logo" 
                            class="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_2px_8px_rgba(190,162,96,0.3)]"
                        >
                        <span class="text-lg font-display font-light tracking-[0.2em] uppercase gold-text">
                            Oscar Awards
                        </span>
                    </NuxtLink>
                    <p class="text-[#F3E09C]/40 text-sm font-light leading-relaxed">
                        Celebrando la excelencia cinematográfica desde 1927. Descubre la historia completa de los Premios de la Academia.
                    </p>
                </div>

                <!-- Categorías -->
                <div>
                    <h4 class="text-[#F3E09C]/60 text-sm font-light uppercase tracking-[0.2em] mb-4">
                        Categorias
                    </h4>
                    <ul class="space-y-2 text-sm">
                        <li v-for="cat in topCategories.slice(0, 6)" :key="cat.category">
                            <NuxtLink :to="`/category/${encodeURIComponent(cat.category)}`" 
                                     class="text-[#F3E09C]/40 hover:text-[#BEA260] transition-colors duration-300 font-light">
                                {{ cat.category }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Enlaces rápidos -->
                <div>
                    <h4 class="text-[#F3E09C]/60 text-sm font-light uppercase tracking-[0.2em] mb-4">
                        Colecciones
                    </h4>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <NuxtLink to="/collections/top-winners" class="text-[#F3E09C]/40 hover:text-[#BEA260] transition-colors duration-300 font-light">
                                Más Ganadores
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/collections/top-films" class="text-[#F3E09C]/40 hover:text-[#BEA260] transition-colors duration-300 font-light">
                                Películas Legendarias
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/decades" class="text-[#F3E09C]/40 hover:text-[#BEA260] transition-colors duration-300 font-light">
                                Décadas
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/countries" class="text-[#F3E09C]/40 hover:text-[#BEA260] transition-colors duration-300 font-light">
                                Países
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Social -->
                <div>
                    <h4 class="text-[#F3E09C]/60 text-sm font-light uppercase tracking-[0.2em] mb-4">
                        Redes Sociales
                    </h4>
                    <div class="flex gap-4">
                        <a href="#" class="text-[#F3E09C]/40 hover:text-[#BEA260] transition-colors duration-300 group">
                            <span class="sr-only">Twitter</span>
                            <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" class="text-[#F3E09C]/40 hover:text-[#BEA260] transition-colors duration-300 group">
                            <span class="sr-only">Instagram</span>
                            <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>
                        <a href="#" class="text-[#F3E09C]/40 hover:text-[#BEA260] transition-colors duration-300 group">
                            <span class="sr-only">YouTube</span>
                            <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom bar -->
            <div class="mt-8 pt-6 border-t border-[#BEA260]/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-[#F3E09C]/30 text-sm font-light">
                    &copy; {{ new Date().getFullYear() }} Oscar Awards. All rights reserved.
                </p>
                <div class="flex items-center gap-6 text-xs text-[#F3E09C]/30">
                    <NuxtLink to="/about" class="hover:text-[#BEA260] transition-colors duration-300 font-light">
                        Acerca de
                    </NuxtLink>
                    <NuxtLink to="#" class="hover:text-[#BEA260] transition-colors duration-300 font-light">
                        Privacidad
                    </NuxtLink>
                    <NuxtLink to="#" class="hover:text-[#BEA260] transition-colors duration-300 font-light">
                        Términos
                    </NuxtLink>
                    <span class="font-light">Arquitectura de Información - Universidad Nacional</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { useOscarData } from '~/../composables/useOscarData';
const { getTopCategories } = useOscarData();
const topCategories = computed(() => getTopCategories(10));
</script>

<style scoped>
.gold-text {
    background: linear-gradient(135deg, #F3E09C 0%, #BEA260 50%, #F3E09C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>