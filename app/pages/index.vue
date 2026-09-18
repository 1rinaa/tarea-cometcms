<template>
    <div>
        
        <!-- Hero - 100% ancho SIN padding -->
        <HeroAurora />

        <!-- Contenido -->
        <div class="w-full">
            <!-- Sección de exploración -->
            <section id="explore" class="scroll-mt-20 relative">

                <!-- Fondo de transición: FUERA del overflow-hidden -->
                <div class="absolute -top-[300px] left-0 right-0 bottom-0 -z-10 pointer-events-none
                    bg-[linear-gradient(to_bottom,transparent_0%,#0A0808_25%,#0A0808_40%,#2B2418_70%,#F5F0E8_100%)]
                    dark:bg-[linear-gradient(to_bottom,transparent_0%,#0A0808_25%,#0A0808_40%,#141414_70%,#000000_100%)]">
                </div>

                <div class="relative w-full pt-8 pb-16 text-center overflow-hidden">
                    
                    <!-- Resplandor aurora sutil (esto sí puede seguir con overflow-hidden en el padre) -->
                    <div class="absolute inset-0 pointer-events-none">
                        <div class="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#BEA260]/10 rounded-full blur-[120px]"></div>
                        <div class="absolute top-20 right-1/4 w-[400px] h-[250px] bg-[#F3E09C]/5 rounded-full blur-[100px]"></div>
                        <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#BEA260]/5 rounded-full blur-[80px]"></div>
                    </div>
                    <!-- Contenido del título -->
                    <div class="relative z-10 px-4">
                        <div class="flex items-center justify-center gap-4 mb-6">
                            <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
                            <span class="text-lg text-[#BEA260]/70">✦</span>
                            <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
                        </div>
                        
                        <h2 class="text-3xl md:text-5xl font-display font-light tracking-[0.15em] uppercase text-[#F3E09C] drop-shadow-[0_2px_10px_rgba(243,224,156,0.2)]">
                            Explorar la historia
                        </h2>
                        
                        <p class="text-[#F3E09C]/50 text-sm mt-3 font-light tracking-wide max-w-xl mx-auto">
                            Encuentra nominaciones por año, categoría o persona
                        </p>
                    </div>
                </div>

                <!-- Filtros avanzados -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <!-- Contenedor con fondo para la sección completa -->
                        <div class="card-oscar p-8 shadow-2xl shadow-[#0A0808]/15 border border-[#BEA260]/20 rounded-3xl dark:bg-[#242424] dark:border-[#3a3a3a]">
                            <!-- Radio buttons para tipo de búsqueda -->
                            <div class="flex justify-center mb-8">
                                <div class="inline-flex items-center gap-4 bg-[#FAF7F2] dark:bg-[#1a1a1a] p-2 rounded-full border border-[#E8D5A3]/30 dark:border-[#3a3a3a]">
                                    <button 
                                        @click="yearSearchType = 'specific'"
                                        :class="[
                                            'px-6 py-2.5 rounded-full text-sm font-light tracking-[0.15em] uppercase transition-all duration-300',
                                            yearSearchType === 'specific' 
                                                ? 'bg-gradient-to-r from-[#F3E09C] via-[#BEA260] to-[#F3E09C] text-[#1A1410] shadow-lg shadow-[#BEA260]/30' 
                                                : 'text-[#55565A]/60 dark:text-[#F3E09C]/40 hover:text-[#BEA260]'
                                        ]"
                                    >
                                        Año específico
                                    </button>
                                    <button 
                                        @click="yearSearchType = 'range'"
                                        :class="[
                                            'px-6 py-2.5 rounded-full text-sm font-light tracking-[0.15em] uppercase transition-all duration-300',
                                            yearSearchType === 'range' 
                                                ? 'bg-gradient-to-r from-[#F3E09C] via-[#BEA260] to-[#F3E09C] text-[#1A1410] shadow-lg shadow-[#BEA260]/30' 
                                                : 'text-[#55565A]/60 dark:text-[#F3E09C]/40 hover:text-[#BEA260]'
                                        ]"
                                    >
                                        Intervalo
                                    </button>
                                </div>
                            </div>

                            <!-- Grid de filtros -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <!-- Año específico -->
                                <div v-if="yearSearchType === 'specific'" class="lg:col-span-1">
                                    <label class="block text-xs font-light text-[#55565A]/60 dark:text-[#F3E09C]/40 uppercase tracking-[0.15em] mb-3">
                                        Año de la ceremonia
                                    </label>
                                    <div class="relative group">
                                        <select 
                                            v-model="filters.year"
                                            class="w-full px-5 py-4 bg-[#FAF7F2] dark:bg-[#2a2a2a] border-2 border-[#E8D5A3]/30 dark:border-[#3a3a3a] rounded-xl focus:outline-none focus:border-[#BEA260] dark:focus:border-[#BEA260] focus:ring-4 focus:ring-[#BEA260]/10 text-[#1A1410] dark:text-[#F3E09C] transition-all duration-300 text-sm font-light appearance-none cursor-pointer"
                                        >
                                            <option value="">Todos los años</option>
                                            <option v-for="year in years" :key="year" :value="year" class="text-[#1A1410] dark:text-[#F3E09C]">
                                                {{ year }}
                                            </option>
                                        </select>
                                        <div class="absolute right-4 top-1/2 -translate-y-1/2 text-[#BEA260] pointer-events-none">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <!-- Intervalo de años -->
                                <div v-if="yearSearchType === 'range'" class="lg:col-span-2">
                                    <label class="block text-xs font-light text-[#55565A]/60 dark:text-[#F3E09C]/40 uppercase tracking-[0.15em] mb-3">
                                        Intervalo de años
                                    </label>
                                    <div class="flex items-center gap-3">
                                        <div class="relative flex-1 group">
                                            <select 
                                                v-model="filters.yearFrom"
                                                class="w-full px-5 py-4 bg-[#FAF7F2] dark:bg-[#2a2a2a] border-2 border-[#E8D5A3]/30 dark:border-[#3a3a3a] rounded-xl focus:outline-none focus:border-[#BEA260] dark:focus:border-[#BEA260] focus:ring-4 focus:ring-[#BEA260]/10 text-[#1A1410] dark:text-[#F3E09C] transition-all duration-300 text-sm font-light appearance-none cursor-pointer"
                                            >
                                                <option value="">Desde</option>
                                                <option v-for="year in years" :key="'from-' + year" :value="year" class="text-[#1A1410] dark:text-[#F3E09C]">
                                                    {{ year }}
                                                </option>
                                            </select>
                                            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-[#BEA260] pointer-events-none">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        <div class="text-[#BEA260] font-light text-2xl select-none flex-shrink-0">—</div>
                                        
                                        <div class="relative flex-1 group">
                                            <select 
                                                v-model="filters.yearTo"
                                                class="w-full px-5 py-4 bg-[#FAF7F2] dark:bg-[#2a2a2a] border-2 border-[#E8D5A3]/30 dark:border-[#3a3a3a] rounded-xl focus:outline-none focus:border-[#BEA260] dark:focus:border-[#BEA260] focus:ring-4 focus:ring-[#BEA260]/10 text-[#1A1410] dark:text-[#F3E09C] transition-all duration-300 text-sm font-light appearance-none cursor-pointer"
                                            >
                                                <option value="">Hasta</option>
                                                <option v-for="year in years" :key="'to-' + year" :value="year" class="text-[#1A1410] dark:text-[#F3E09C]">
                                                    {{ year }}
                                                </option>
                                            </select>
                                            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-[#BEA260] pointer-events-none">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Categoría -->
                                <div class="lg:col-span-1">
                                    <label class="block text-xs font-light text-[#55565A]/60 dark:text-[#F3E09C]/40 uppercase tracking-[0.15em] mb-3">
                                        Categoría
                                    </label>
                                    <div class="relative group">
                                        <select 
                                            v-model="filters.category"
                                            class="w-full px-5 py-4 bg-[#FAF7F2] dark:bg-[#2a2a2a] border-2 border-[#E8D5A3]/30 dark:border-[#3a3a3a] rounded-xl focus:outline-none focus:border-[#BEA260] dark:focus:border-[#BEA260] focus:ring-4 focus:ring-[#BEA260]/10 text-[#1A1410] dark:text-[#F3E09C] transition-all duration-300 text-sm font-light appearance-none cursor-pointer"
                                        >
                                            <option value="">Todas las categorías</option>
                                            <option v-for="cat in categories" :key="cat" :value="cat" class="text-[#1A1410] dark:text-[#F3E09C]">
                                                {{ cat }}
                                            </option>
                                        </select>
                                        <div class="absolute right-4 top-1/2 -translate-y-1/2 text-[#BEA260] pointer-events-none">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <!-- Estado -->
                                <div class="lg:col-span-1">
                                    <label class="block text-xs font-light text-[#55565A]/60 dark:text-[#F3E09C]/40 uppercase tracking-[0.15em] mb-3">
                                        Estado
                                    </label>
                                    <div class="relative group">
                                        <select 
                                            v-model="filters.status"
                                            class="w-full px-5 py-4 bg-[#FAF7F2] dark:bg-[#2a2a2a] border-2 border-[#E8D5A3]/30 dark:border-[#3a3a3a] rounded-xl focus:outline-none focus:border-[#BEA260] dark:focus:border-[#BEA260] focus:ring-4 focus:ring-[#BEA260]/10 text-[#1A1410] dark:text-[#F3E09C] transition-all duration-300 text-sm font-light appearance-none cursor-pointer"
                                        >
                                            <option value="">Todos</option>
                                            <option value="winner" class="text-[#1A1410] dark:text-[#F3E09C]">Ganadores</option>
                                            <option value="nominee" class="text-[#1A1410] dark:text-[#F3E09C]">Nominados</option>
                                        </select>
                                        <div class="absolute right-4 top-1/2 -translate-y-1/2 text-[#BEA260] pointer-events-none">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Botones de acción -->
                            <div class="flex items-center justify-between mt-8 pt-6 border-t border-[#E8D5A3]/20 dark:border-[#3a3a3a]">
                                <button 
                                    @click="resetFilters"
                                    class="px-5 py-2.5 text-sm font-light text-[#BEA260] hover:text-[#F3E09C] transition-colors duration-300 group flex items-center gap-2"
                                >
                                    <svg class="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Restablecer filtros
                                </button>
                                
                                <NuxtLink 
                                    :to="searchRoute"
                                    class="px-8 py-3 bg-gradient-to-r from-[#F3E09C] via-[#BEA260] to-[#F3E09C] text-[#1A1410] font-medium tracking-[0.15em] uppercase text-sm rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#BEA260]/40 group"
                                >
                                    Buscar
                                </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Colecciones -->
            <section id="collections" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-24 dark:bg-[#000000]">
                <!-- Título de sección -->
                <div class="text-center mb-10">
                    <div class="flex items-center justify-center gap-4 mb-4">
                        <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
                        <span class="text-lg text-[#BEA260]/70">✦</span>
                        <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
                    </div>
                    <h2 class="text-2xl md:text-4xl font-display font-medium tracking-[0.15em] uppercase text-[#1A1410] dark:text-[#F3E09C]">
                        Colecciones destacadas
                    </h2>
                    <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 text-sm mt-3 font-light tracking-wide">
                        Explora las categorías más icónicas de los Premios Oscar
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CollectionCard
                        title="Mas ganadores"
                        description="Actores y actrices con más premios Oscar"
                        icon="trophy"
                        link="/collections/top-winners"
                        :count="10"
                    />
                    <CollectionCard
                        title="Peliculas legendarias"
                        description="Las películas con más nominaciones y premios"
                        icon="film"
                        link="/collections/top-films"
                        :count="10"
                    />
                    <CollectionCard
                        title="Por decada"
                        description="Explora los Oscar década por década"
                        icon="calendar"
                        link="/decades"
                        :count="10"
                    />
                    <CollectionCard
                        title="Por paises"
                        description="Explora la representación de los Premios Oscar por país"
                        icon="category"
                        link="/countries"
                        :count="10"
                    />
                </div>
            </section>

            <!-- Resultados de búsqueda -->
            <section v-if="hasFilters" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div class="card-oscar p-6 rounded-3xl dark:bg-[#242424] dark:border-[#3a3a3a]">
                    <h3 class="font-display text-lg font-bold text-[#1A1410] dark:text-[#F3E09C] mb-4">
                        Resultados
                    </h3>
                    <div v-if="filteredGroupedByFilm.length === 0" class="text-center py-8">
                        <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40">No se encontraron resultados</p>
                    </div>
                    <div v-else class="space-y-3">
                        <OscarCard 
                            v-for="(item, index) in filteredGroupedByFilm.slice(0, 5)" 
                            :key="index"
                            :item="item"
                        />
                        <NuxtLink 
                            v-if="filteredGroupedByFilm.length > 5"
                            :to="searchRoute"
                            class="block text-center text-[#BEA260] hover:text-[#F3E09C] transition-colors duration-300 text-sm mt-4"
                        >
                            Ver todos los {{ filteredGroupedByFilm.length }} resultados →
                        </NuxtLink>
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>

<script setup>
import HeroAurora from '~/components/oscar/HeroAurora.vue';
import CollectionCard from '~/components/oscar/CollectionCard.vue';
import OscarCard from '~/components/oscar/OscarCard.vue';
import { useOscarData } from '~/../composables/useOscarData';

const { 
    data, 
    getYears, 
    getCategories,
    getTopWinningFilms,
    getTopNominatedFilms,
    loadData,
    loading,
    error 
} = useOscarData();

const years = computed(() => getYears.value || []);
const categories = computed(() => getCategories.value || []);

const yearSearchType = ref('specific');

const decades = computed(() => {
    if (!data.value) return [];
    const decadeSet = new Set();
    data.value.forEach(item => {
        if (item.year_ceremony) {
            const decade = Math.floor(item.year_ceremony / 10) * 10;
            decadeSet.add(decade);
        }
    });
    return [...decadeSet].sort((a, b) => b - a);
});

// Películas destacadas
const featuredFilms = computed(() => {
    if (!data.value || data.value.length === 0) return [];
    
    // Agrupar por película y contar premios
    const filmMap = new Map();
    data.value.forEach(item => {
        if (!filmMap.has(item.film)) {
            filmMap.set(item.film, {
                ...item,
                totalNominations: 0,
                totalWins: 0
            });
        }
        const filmData = filmMap.get(item.film);
        filmData.totalNominations++;
        if (item.winner) {
            filmData.totalWins++;
        }
    });
    
    // Ordenar por número de premios y tomar las primeras 5
    return [...filmMap.values()]
        .sort((a, b) => b.totalWins - a.totalWins || b.totalNominations - a.totalNominations)
        .slice(0, 5);
});

onMounted(async () => {
    await loadData();
    console.log('📊 Datos completos:', data.value?.length);
    console.log('📊 Primer registro:', data.value?.[0]);
    console.log('📊 Películas destacadas:', featuredFilms.value);
});

const filters = ref({
    year: '',
    yearFrom: '',
    yearTo: '',
    category: '',
    status: ''
});

const hasFilters = computed(() => {
    return filters.value.year || filters.value.yearFrom || filters.value.yearTo || filters.value.category || filters.value.status;
});

const filteredGroupedByFilm = computed(() => {
    let results = data.value || [];
    
    // Filtro por año específico
    if (filters.value.year) {
        results = results.filter(item => item.year_ceremony === parseInt(filters.value.year));
    }
    
    // Filtro por intervalo de años
    if (filters.value.yearFrom) {
        results = results.filter(item => item.year_ceremony >= parseInt(filters.value.yearFrom));
    }
    
    if (filters.value.yearTo) {
        results = results.filter(item => item.year_ceremony <= parseInt(filters.value.yearTo));
    }
    
    // Filtro por categoría
    if (filters.value.category) {
        results = results.filter(item => item.category === filters.value.category);
    }
    
    // Filtro por estado
    if (filters.value.status === 'winner') {
        results = results.filter(item => item.winner === true);
    } else if (filters.value.status === 'nominee') {
        results = results.filter(item => item.winner !== true);
    }
    
    return results;
});

const searchRoute = computed(() => {
    const params = new URLSearchParams();
    if (filters.value.year) params.append('year', filters.value.year);
    if (filters.value.yearFrom) params.append('yearFrom', filters.value.yearFrom);
    if (filters.value.yearTo) params.append('yearTo', filters.value.yearTo);
    if (filters.value.category) params.append('category', filters.value.category);
    if (filters.value.status) params.append('status', filters.value.status);
    return `/search?${params.toString()}`;
});

const resetFilters = () => {
    filters.value = {
        year: '',
        yearFrom: '',
        yearTo: '',
        category: '',
        status: ''
    };
};
</script>

<style scoped>
.card-oscar {
    background-color: #FFFFFF;
    border-radius: 1rem;
    border: 1px solid rgba(232, 213, 163, 0.2);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(26, 20, 16, 0.06);
}

.dark .card-oscar {
    background-color: #242424;  /* Antes era #2D231E (café) */
    border-color: rgba(58, 58, 58, 0.3);
}

.card-oscar:hover {
    box-shadow: 0 8px 40px rgba(190, 162, 96, 0.1);
}

/* Estilos para selects elegantes */
select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23BEA260' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1rem;
    cursor: pointer;
}

select:focus {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23F3E09C' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
}

/* Animación de entrada para la sección */
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

section#explore {
    animation: slideUp 0.8s ease-out both;
}
</style>