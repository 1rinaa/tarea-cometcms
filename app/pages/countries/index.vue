<template>
    <div class="min-h-screen bg-[#F5F0E8] dark:bg-[#000000]">
        <!-- Header con breadcrumbs -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
            <Breadcrumbs :custom-crumbs="breadcrumbs" />
            
            <div class="flex items-center justify-center gap-4 mb-4">
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
                <svg class="w-10 h-10 text-[#BEA260]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
            </div>
            <h1 class="text-3xl md:text-5xl font-display font-light tracking-[0.15em] uppercase text-[#1A1410] dark:text-[#F3E09C]">
                Paises
            </h1>
            <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 text-sm mt-3 font-light tracking-wide">
                {{ countries.length }} países • Explora las películas por país de origen
            </p>
        </div>

        <!-- Galería de países -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block w-8 h-8 border-2 border-[#BEA260] border-t-transparent rounded-full animate-spin"></div>
                <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 mt-4">Cargando...</p>
            </div>
            
            <!-- Grid de países -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Bloque de país - AHORA ES UN NuxtLink -->
                <NuxtLink 
                    v-for="country in countries" 
                    :key="country.name"
                    :to="`/country/${encodeURIComponent(country.name)}`"
                    class="group cursor-pointer"
                >
                    <!-- Carrusel de posters destacados (efecto abanico) -->
                    <div class="relative h-52 w-full bg-transparent overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div v-for="(film, index) in country.previewFilms.slice(0, 5)" :key="film.film"
                                 class="absolute w-16 h-24 rounded-lg overflow-hidden shadow-lg border-2 border-white dark:border-[#242424] transition-all duration-500 ease-out group-hover:brightness-105"
                                 :style="fanStyle(index, Math.min(country.previewFilms.length, 5))"
                            >
                                <img 
                                    :src="film.poster || '/posters/placeholder.jpg'" 
                                    :alt="film.film"
                                    class="w-full h-full object-cover"
                                    @error="handleImageError"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <!-- Título + tooltip -->
                    <div class="flex items-center justify-center gap-2 mt-4">
                        <h3 class="font-display text-2xl font-light tracking-[0.05em] text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors duration-300">
                            {{ country.name }}
                        </h3>

                        <!-- Infotip -->
                        <div class="relative group/tip">
                            <button
                                type="button"
                                class="w-5 h-5 rounded-full border border-[#BEA260]/50 text-[#BEA260] text-[11px] leading-none flex items-center justify-center hover:bg-[#BEA260]/10 transition-colors duration-300"
                                aria-label="Ver detalles del país"
                                @click.stop
                            >
                                i
                            </button>

                            <div class="pointer-events-none opacity-0 group-hover/tip:opacity-100 group-hover/tip:pointer-events-auto transition-opacity duration-200 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 rounded-xl bg-[#1A1410] dark:bg-[#F3E09C] text-[#F3E09C] dark:text-[#1A1410] text-xs p-3 shadow-2xl z-30">
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="font-light opacity-70">Premios</span>
                                    <span class="font-medium">{{ country.winners }}</span>
                                </div>
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="font-light opacity-70">Nominaciones</span>
                                    <span class="font-medium">{{ country.nominations }}</span>
                                </div>
                                <div class="flex items-center justify-between py-0.5">
                                    <span class="font-light opacity-70">Películas</span>
                                    <span class="font-medium">{{ country.films }}</span>
                                </div>
                                <!-- Flechita -->
                                <div class="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-[#1A1410] dark:bg-[#F3E09C] rotate-45"></div>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'; // 👈 Ruta correcta
import { ref, computed } from 'vue';
import { useOscarData } from '~/../composables/useOscarData';

const { data, loadData, loading } = useOscarData();

// 👇 Breadcrumbs personalizados
const breadcrumbs = computed(() => {
    return [
        { path: '/', label: 'Inicio' },
        { path: '/#collections', label: 'Colecciones' },
        { path: '/countries', label: 'Países' }
    ];
});

const countries = computed(() => {
    if (!data.value || !Array.isArray(data.value)) return [];
    
    const countryMap = new Map();
    
    data.value.forEach(item => {
        const country = item.country || 'Estados Unidos';
        
        if (!countryMap.has(country)) {
            countryMap.set(country, {
                name: country,
                count: 0,
                winners: 0,
                nominations: 0,
                films: new Set(),
                categories: new Set(),
                filmData: []
            });
        }
        
        const countryData = countryMap.get(country);
        countryData.count++;
        
        if (item.winner) {
            countryData.winners++;
        } else {
            countryData.nominations++;
        }
        
        if (item.film) {
            countryData.films.add(item.film);
        }
        
        if (item.category) {
            countryData.categories.add(item.category);
        }
        
        countryData.filmData.push(item);
    });
    
    const result = [...countryMap.values()]
        .map(country => {
            const filmMap = new Map();
            country.filmData.forEach(item => {
                if (!filmMap.has(item.film)) {
                    filmMap.set(item.film, {
                        film: item.film,
                        poster: item.poster,
                        wins: 0,
                        nominations: 0
                    });
                }
                const filmData = filmMap.get(item.film);
                if (item.winner) {
                    filmData.wins++;
                } else {
                    filmData.nominations++;
                }
            });

            const allFilms = [...filmMap.values()]
                .sort((a, b) => b.wins - a.wins || b.nominations - a.nominations || a.film.localeCompare(b.film));
            
            return {
                ...country,
                films: country.films.size,
                topCategories: [...country.categories].slice(0, 3),
                previewFilms: allFilms.slice(0, 5),
                allFilms
            };
        })
        .sort((a, b) => b.count - a.count);
    
    return result;
});

// Calcula la posición de cada poster dentro del abanico
const fanStyle = (index, total, large = false) => {
    if (total <= 1) {
        return { transform: 'translate(0, 0) rotate(0deg) scale(1)', zIndex: 10 };
    }

    const center = (total - 1) / 2;
    const offset = index - center;
    const spread = large ? 42 : 30;
    const rotate = offset * 7;
    const translateX = offset * spread;
    const translateY = Math.abs(offset) * (large ? 14 : 10);
    const isCenter = Math.abs(offset) < 0.01;
    const scale = isCenter ? 1.12 : 1 - Math.abs(offset) * 0.06;
    const zIndex = 20 - Math.abs(Math.round(offset));

    return {
        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
        zIndex
    };
};

const handleImageError = (event) => {
    event.target.src = '/posters/placeholder.jpg';
    event.target.onerror = null;
};

onMounted(async () => {
    await loadData();
});
</script>