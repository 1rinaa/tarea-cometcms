<template>
    <div class="min-h-screen bg-[#F5F0E8] dark:bg-[#000000]">
        <!-- Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
             <Breadcrumbs :custom-crumbs="breadcrumbs" />
            
            <div class="flex items-center justify-center gap-4 mb-4">
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
                <svg class="w-10 h-10 text-[#BEA260]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
                </svg>
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
            </div>
            <h1 class="text-3xl md:text-5xl font-display font-light tracking-[0.15em] uppercase text-[#1A1410] dark:text-[#F3E09C]">
                Peliculas Legendarias
            </h1>
            <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 text-sm mt-3 font-light tracking-wide">
                Las películas con más nominaciones y premios
            </p>
        </div>

        <!-- Lista de películas -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block w-8 h-8 border-2 border-[#BEA260] border-t-transparent rounded-full animate-spin"></div>
                <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 mt-4">Cargando películas...</p>
            </div>
            
            <div v-else-if="error" class="text-center py-12">
                <p class="text-red-500">Error: {{ error }}</p>
            </div>
            
            <div v-else-if="topWinningFilms.length === 0" class="text-center py-12">
                <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40">No se encontraron películas</p>
            </div>
            
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Mostrar cada película -->
                <NuxtLink 
                    v-for="(film, index) in topWinningFilms" 
                    :key="index"
                    :to="`/film/${encodeURIComponent(film.film)}?from=top-films`"
                    class="group bg-white dark:bg-[#242424] rounded-2xl overflow-hidden border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:shadow-[0_8px_40px_rgba(190,162,96,0.2)] hover:border-[#BEA260]/40 hover:-translate-y-1 transition-all duration-500"
                >
                    <!-- Poster -->
                    <div class="h-56 bg-gradient-to-br from-[#BEA260]/20 to-[#F3E09C]/10 dark:from-[#BEA260]/10 dark:to-[#F3E09C]/5 relative">
                        <img 
                            v-if="film.poster" 
                            :src="film.poster" 
                            :alt="film.film"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            @error="handleImageError"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <div class="text-center">
                                <span class="text-6xl mb-2">🎬</span>
                                <p class="text-xs text-[#BEA260]/60 mt-2">Sin poster</p>
                            </div>
                        </div>
                        
                        <!-- Badge de posición -->
                        <div class="absolute top-4 right-4">
                            <span class="px-3 py-1 rounded-full bg-[#F3E09C] text-[#1A1410] text-xs font-medium shadow-lg shadow-[#BEA260]/20">
                                #{{ index + 1 }}
                            </span>
                        </div>
                    </div>

                    <!-- Información -->
                    <div class="p-6">
                        <!-- Título -->
                        <h3 class="font-display text-xl font-medium tracking-[0.05em] text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors duration-300 mb-2">
                            {{ film.film }}
                        </h3>
                        
                        <!-- Premios -->
                        <div class="flex items-center gap-2 text-sm font-light text-[#55565A]/60 dark:text-[#F3E09C]/40 mb-4">
                            <svg class="w-5 h-5 text-[#BEA260]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21h8m-4-4v4m-6-17h12v4a6 6 0 01-12 0V4zm-4 4h4m12 0h4m-4 0a4 4 0 01-8 0m-4 0a4 4 0 008 0"/>
                            </svg>
                            {{ film.wins }} premios Oscar
                        </div>

                        <!-- Divider dorado -->
                        <div class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/20 to-transparent group-hover:via-[#BEA260]/60 transition-all duration-500"></div>

                        <!-- Categorías -->
                        <div class="mt-4">
                            <p class="text-sm font-medium uppercase tracking-wider text-[#4a3c1b]/40 dark:text-[#F3E09C]/30 mb-2">
                                Categorías
                            </p>
                            <div class="flex flex-wrap gap-1.5">
                                <span v-for="cat in film.categories.slice(0, 3)" :key="cat" 
                                      class="px-2 py-0.5 rounded-full bg-[#F3E09C]/10 text-[#BEA260] text-[10px] font-light">
                                    {{ cat }}
                                </span>
                                <span v-if="film.categories.length > 3" class="px-2 py-0.5 rounded-full bg-[#55565A]/10 text-[#55565A] dark:text-[#F3E09C]/40 text-[10px] font-light">
                                    +{{ film.categories.length - 3 }}
                                </span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import Breadcrumbs from '~/components/common/Breadcrumbs.vue';
import { useOscarData } from '~/../composables/useOscarData';

const { data, loadData, getTopWinningFilms, loading, error } = useOscarData();

onMounted(async () => {
    await loadData();
});

const topWinningFilms = computed(() => {
    // Obtener películas con más premios
    const films = getTopWinningFilms(20);
    
    // Agregar categorías y posters
    return films.map(film => {
        // Buscar datos completos de la película
        const filmData = data.value?.filter(item => item.film === film.film) || [];
        
        const categories = new Set();
        const posters = [];
        
        filmData.forEach(item => {
            if (item.category) categories.add(item.category);
            if (item.poster) posters.push(item.poster);
        });
        
        return {
            ...film,
            poster: posters[0] || '/posters/placeholder.jpg',
            categories: [...categories]
        };
    });
});

const breadcrumbs = computed(() => {
    return [
        { path: '/', label: 'Inicio' },
        { path: '/collections/top-films', label: 'Películas Legendarias' }
    ];
});

const handleImageError = (event) => {
    event.target.src = '/posters/placeholder.jpg';
    event.target.onerror = null;
};
</script>