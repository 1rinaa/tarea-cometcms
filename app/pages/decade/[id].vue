<!-- pages/decade/[id].vue -->
<template>
    <div class="min-h-screen bg-[#F5F0E8] dark:bg-[#000000]">
        <!-- Header con breadcrumbs -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
            <Breadcrumbs :custom-crumbs="breadcrumbs" />
            
            <!-- Título y subtítulo -->
            <div class="text-center mb-8">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
                    <svg class="w-10 h-10 text-[#BEA260]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
                </div>
                <h1 class="text-3xl md:text-5xl font-display font-light tracking-[0.15em] uppercase text-[#1A1410] dark:text-[#F3E09C]">
                    {{ decadeName }}s
                </h1>
                <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 text-sm mt-3 font-light tracking-wide">
                    {{ filteredData.length }} resultado(s) encontrado(s)
                </p>
            </div>
        </div>

        <!-- Contenido principal con sidebar -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Sidebar de filtros -->
                <aside class="lg:w-72 flex-shrink-0">
                    <div class="bg-white dark:bg-[#242424] rounded-2xl border border-[#E8D5A3]/20 dark:border-[#3a3a3a] p-6 sticky top-24">
                        <!-- Título -->
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="font-display text-lg font-light tracking-[0.15em] uppercase text-[#1A1410] dark:text-[#F3E09C]">
                                Filtros
                            </h2>
                            <button 
                                v-if="hasActiveFilters"
                                @click="clearAllFilters"
                                class="text-xs font-light text-[#BEA260] hover:text-[#F3E09C] transition-colors duration-300"
                            >
                                Limpiar todo
                            </button>
                        </div>

                        <!-- Filtros aplicados -->
                        <div v-if="hasActiveFilters" class="mb-6">
                            <p class="text-xs font-light uppercase tracking-wider text-[#55565A]/60 dark:text-[#F3E09C]/40 mb-3">
                                Filtros aplicados
                            </p>
                            <div class="flex flex-wrap gap-2">
                                <!-- ✅ DÉCADA - Tag destacado -->
                                <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#BEA260]/30 to-[#F3E09C]/30 text-[#BEA260] text-sm font-medium border-2 border-[#BEA260]/50 shadow-lg shadow-[#BEA260]/20">
                                    <span class="text-base">📅</span>
                                    {{ decadeName }}s
                                    <button @click="clearAllFilters" class="hover:text-[#F3E09C] transition-colors duration-300 ml-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>

                                <span v-if="route.query.q" 
                                      class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-xs font-light">
                                    "{{ route.query.q }}"
                                    <button @click="removeFilter('q')" class="hover:text-[#F3E09C]">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                                <span v-if="route.query.year" 
                                      class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-xs font-light">
                                    Año: {{ route.query.year }}
                                    <button @click="removeFilter('year')" class="hover:text-[#F3E09C]">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                                <span v-if="route.query.category" 
                                      class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-xs font-light">
                                    {{ route.query.category }}
                                    <button @click="removeFilter('category')" class="hover:text-[#F3E09C]">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                                <span v-if="route.query.status" 
                                      class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#BEA260]/10 text-[#BEA260] text-xs font-light">
                                    {{ route.query.status === 'winner' ? 'Ganadores' : 'Nominados' }}
                                    <button @click="removeFilter('status')" class="hover:text-[#F3E09C]">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                        </div>

                        <!-- Búsqueda por texto -->
                        <div class="mb-6">
                            <label class="block text-xs font-light uppercase tracking-wider text-[#55565A]/60 dark:text-[#F3E09C]/40 mb-2">
                                Buscar
                            </label>
                            <div class="relative">
                                <input 
                                    v-model="localSearch"
                                    type="text"
                                    placeholder="Película, persona..."
                                    class="w-full px-4 py-2 bg-[#FAF7F2] dark:bg-[#1a1a1a] border border-[#E8D5A3]/20 dark:border-[#3a3a3a] rounded-lg focus:outline-none focus:border-[#BEA260] text-[#1A1410] dark:text-[#F3E09C] placeholder-[#55565A]/40 dark:placeholder-[#F3E09C]/40 text-sm font-light"
                                    @keyup.enter="applySearch"
                                />
                            </div>
                        </div>

                        <!-- Filtro por año (dentro de la década) -->
                        <div class="mb-6">
                            <label class="block text-xs font-light uppercase tracking-wider text-[#55565A]/60 dark:text-[#F3E09C]/40 mb-2">
                                Año específico
                            </label>
                            <select 
                                v-model="selectedYear"
                                @change="applyYear"
                                class="w-full px-4 py-2 bg-[#FAF7F2] dark:bg-[#1a1a1a] border border-[#E8D5A3]/20 dark:border-[#3a3a3a] rounded-lg focus:outline-none focus:border-[#BEA260] text-[#1A1410] dark:text-[#F3E09C] text-sm font-light"
                            >
                                <option value="">Todos los años</option>
                                <option v-for="year in availableYears" :key="year" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                        </div>

                        <!-- Filtro por categoría -->
                        <div class="mb-6">
                            <label class="block text-xs font-light uppercase tracking-wider text-[#55565A]/60 dark:text-[#F3E09C]/40 mb-2">
                                Categoría
                            </label>
                            <select 
                                v-model="selectedCategory"
                                @change="applyCategory"
                                class="w-full px-4 py-2 bg-[#FAF7F2] dark:bg-[#1a1a1a] border border-[#E8D5A3]/20 dark:border-[#3a3a3a] rounded-lg focus:outline-none focus:border-[#BEA260] text-[#1A1410] dark:text-[#F3E09C] text-sm font-light"
                            >
                                <option value="">Todas las categorías</option>
                                <option v-for="cat in availableCategories" :key="cat" :value="cat">
                                    {{ cat }}
                                </option>
                            </select>
                        </div>

                        <!-- Filtro por década - DESTACADO -->
                        <div class="mb-6">
                            <label class="block text-xs font-light uppercase tracking-wider text-[#55565A]/60 dark:text-[#F3E09C]/40 mb-2">
                                Década
                            </label>
                            <div class="w-full px-4 py-3 bg-gradient-to-r from-[#BEA260]/15 to-[#F3E09C]/15 dark:from-[#BEA260]/10 dark:to-[#F3E09C]/5 border-2 border-[#BEA260]/40 rounded-lg text-[#1A1410] dark:text-[#F3E09C] text-sm font-medium cursor-not-allowed flex items-center gap-2 shadow-inner shadow-[#BEA260]/10">
                                <span class="flex-1">{{ decadeName }}s</span>
                            </div>
                            <p class="text-xs text-[#BEA260]/60 mt-1 font-light flex items-center gap-1">
                                <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#BEA260] animate-pulse"></span>
                                Década seleccionada
                            </p>
                        </div>

                        <!-- Filtro por estado -->
                        <div class="mb-6">
                            <label class="block text-xs font-light uppercase tracking-wider text-[#55565A]/60 dark:text-[#F3E09C]/40 mb-2">
                                Estado
                            </label>
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="" 
                                        v-model="selectedStatus"
                                        @change="applyStatus"
                                        class="text-[#BEA260] focus:ring-[#BEA260]"
                                    />
                                    <span class="text-sm font-light text-[#1A1410] dark:text-[#F3E09C]">Todos</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="winner" 
                                        v-model="selectedStatus"
                                        @change="applyStatus"
                                        class="text-[#BEA260] focus:ring-[#BEA260]"
                                    />
                                    <span class="text-sm font-light text-[#1A1410] dark:text-[#F3E09C]">Ganadores</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="nominee" 
                                        v-model="selectedStatus"
                                        @change="applyStatus"
                                        class="text-[#BEA260] focus:ring-[#BEA260]"
                                    />
                                    <span class="text-sm font-light text-[#1A1410] dark:text-[#F3E09C]">Nominados</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Resultados -->
                <div class="flex-1">
                    <!-- Estado de carga -->
                    <div v-if="loading" class="text-center py-12">
                        <div class="inline-block w-8 h-8 border-2 border-[#BEA260] border-t-transparent rounded-full animate-spin"></div>
                        <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 mt-4">Cargando resultados...</p>
                    </div>
                    
                    <!-- Sin resultados -->
                    <div v-else-if="filteredData.length === 0" class="text-center py-12">
                        <p class="text-4xl mb-4">📅</p>
                        <h2 class="text-2xl font-light text-gray-700 dark:text-gray-300">No se encontraron resultados</h2>
                        <p class="text-gray-500 dark:text-gray-400 mt-2">Prueba con otros filtros o términos de búsqueda</p>
                    </div>
                    
                    <!-- Grid de resultados con OscarCard -->
                    <div v-else class="grid grid-cols-1 gap-6">
                        <OscarCard 
                            v-for="(item, index) in paginatedItems" 
                            :key="index"
                            :item="item"
                            :poster-url="item.poster || '/posters/placeholder.jpg'"
                        />
                    </div>

                    <!-- Paginación -->
                    <Pagination 
                        v-if="filteredData.length > perPage"
                        :total="filteredData.length"
                        :per-page="perPage"
                        :current-page="currentPage"
                        @page-change="handlePageChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Breadcrumbs from '~/components/common/Breadcrumbs.vue';
import OscarCard from '~/components/oscar/OscarCard.vue';
import Pagination from '~/components/ui/Pagination.vue';
import { useOscarData } from '~/../composables/useOscarData';

const route = useRoute();
const router = useRouter();
const { data, loading, loadData, getYears, getCategories } = useOscarData();

const decadeName = computed(() => decodeURIComponent(route.params.id || ''));

// Breadcrumbs personalizados
const breadcrumbs = computed(() => {
    const crumbs = [
        { path: '/', label: 'Inicio' },
        { path: '/#collections', label: 'Colecciones' },
        { path: '/decades', label: 'Décadas' },
        { path: route.path, label: `${decadeName.value}s` }
    ];
    
    return crumbs;
});

// Filtros locales para el sidebar
const localSearch = ref(route.query.q || '');
const selectedYear = ref(route.query.year || '');
const selectedCategory = ref(route.query.category || '');
const selectedStatus = ref(route.query.status || '');

const years = computed(() => getYears.value || []);
const categories = computed(() => getCategories.value || []);

// Datos filtrados por década
const decadeData = computed(() => {
    if (!data.value) return [];
    const decade = parseInt(decadeName.value);
    return data.value.filter(item => 
        item.year_ceremony && Math.floor(item.year_ceremony / 10) * 10 === decade
    );
});

// Años disponibles en esta década
const availableYears = computed(() => {
    const yearsSet = new Set();
    decadeData.value.forEach(item => {
        if (item.year_ceremony) yearsSet.add(item.year_ceremony);
    });
    return [...yearsSet].sort((a, b) => b - a);
});

// Categorías disponibles en esta década
const availableCategories = computed(() => {
    const cats = new Set();
    decadeData.value.forEach(item => {
        if (item.category) cats.add(item.category);
    });
    return [...cats].sort();
});

// Aplicar filtros adicionales a la década
const filteredData = computed(() => {
    if (!decadeData.value || decadeData.value.length === 0) return [];
    
    let filtered = decadeData.value;
    
    const q = route.query.q;
    const year = route.query.year;
    const category = route.query.category;
    const status = route.query.status;
    
    if (q) {
        const query = q.toLowerCase().trim();
        filtered = filtered.filter(item => {
            const filmMatch = item.film?.toLowerCase().includes(query);
            const nameMatch = item.name?.toLowerCase().includes(query);
            const categoryMatch = item.category?.toLowerCase().includes(query);
            const yearMatch = String(item.year_ceremony).includes(query);
            const allNamesMatch = item.allNames?.some(name => name.toLowerCase().includes(query));
            
            return filmMatch || nameMatch || categoryMatch || yearMatch || allNamesMatch;
        });
    }
    
    if (year) {
        filtered = filtered.filter(item => item.year_ceremony === parseInt(year));
    }
    
    if (category) {
        filtered = filtered.filter(item => item.category === category);
    }
    
    if (status === 'winner') {
        filtered = filtered.filter(item => item.winner === true);
    } else if (status === 'nominee') {
        filtered = filtered.filter(item => item.winner !== true);
    }
    
    return filtered;
});

const hasActiveFilters = computed(() => {
    return route.query.q || route.query.year || route.query.category || route.query.status;
});

const currentPage = ref(1);
const perPage = ref(10);

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredData.value.slice(start, end);
});

const handlePageChange = (page) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Aplicar filtros
const applySearch = () => {
    router.push({ 
        query: { 
            ...route.query, 
            q: localSearch.value || undefined 
        } 
    });
};

const applyYear = () => {
    router.push({ 
        query: { 
            ...route.query, 
            year: selectedYear.value || undefined 
        } 
    });
};

const applyCategory = () => {
    router.push({ 
        query: { 
            ...route.query, 
            category: selectedCategory.value || undefined 
        } 
    });
};

const applyStatus = () => {
    router.push({ 
        query: { 
            ...route.query, 
            status: selectedStatus.value || undefined 
        } 
    });
};

// Remover filtros
const removeFilter = (filter) => {
    const newQuery = { ...route.query };
    delete newQuery[filter];
    router.push({ query: newQuery });
};

const clearAllFilters = () => {
    localSearch.value = '';
    selectedYear.value = '';
    selectedCategory.value = '';
    selectedStatus.value = '';
    router.push({ query: {} });
};

// Sincronizar filtros con los query params
watch(() => route.query, () => {
    currentPage.value = 1;
    localSearch.value = route.query.q || '';
    selectedYear.value = route.query.year || '';
    selectedCategory.value = route.query.category || '';
    selectedStatus.value = route.query.status || '';
});

onMounted(async () => {
    await loadData();
});
</script>