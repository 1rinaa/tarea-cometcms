<template>
    <div class="min-h-screen bg-[#F5F0E8] dark:bg-[#000000]">
        <!-- Breadcrumbs -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
            <Breadcrumbs :custom-crumbs="customBreadcrumbs" />
        </div>

        <!-- Detalle de la película -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block w-8 h-8 border-2 border-[#BEA260] border-t-transparent rounded-full animate-spin"></div>
                <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 mt-4">Cargando...</p>
            </div>
            
            <div v-else-if="filmData.length === 0" class="text-center py-12">
                <p class="text-4xl mb-4">🎬</p>
                <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-300">Película no encontrada</h2>
                <p class="text-gray-500 dark:text-gray-400 mt-2">No hay registros para "{{ filmName }}"</p>
                <NuxtLink to="/" class="inline-block mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
                    Volver al inicio
                </NuxtLink>
            </div>
            
            <div v-else class="bg-white dark:bg-[#242424] rounded-3xl overflow-hidden border border-[#E8D5A3]/20 dark:border-[#3a3a3a] shadow-[0_8px_40px_rgba(190,162,96,0.1)]">
                <!-- Contenido principal: Poster + Información -->
                <div class="flex flex-col md:flex-row">
                    <!-- Poster grande -->
                    <div class="md:w-80 h-96 md:h-auto flex-shrink-0 bg-gradient-to-br from-[#BEA260]/20 to-[#F3E09C]/10 dark:from-[#BEA260]/10 dark:to-[#F3E09C]/5">
                        <div v-if="displayPoster" class="w-full h-full">
                            <img 
                                :src="displayPoster" 
                                :alt="filmName"
                                class="w-full h-full object-cover"
                                @error="handleImageError"
                            />
                        </div>
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <div class="text-center">
                                <span class="text-7xl mb-2">🎬</span>
                                <p class="text-xs text-[#BEA260]/60 mt-2">Sin poster</p>
                            </div>
                        </div>
                    </div>

                    <!-- Información de la película -->
                    <div class="flex-1 p-8 md:p-10">
                        <!-- Título -->
                        <h1 class="font-display text-4xl md:text-5xl font-light tracking-[0.05em] text-[#1A1410] dark:text-[#F3E09C] mb-3">
                            {{ filmName }}
                        </h1>
                        
                        <!-- Tags -->
                        <div class="flex flex-wrap gap-3 mb-6">
                            <span class="px-3 py-1 rounded-full text-xs font-light bg-[#BEA260]/10 dark:bg-[#BEA260]/20 text-[#BEA260]">
                                {{ firstItem.year_ceremony }}
                            </span>
                            <span class="px-3 py-1 rounded-full text-xs font-light bg-[#F3E09C] text-[#1A1410]">
                                {{ winners.length }} Premios
                            </span>
                            <span class="px-3 py-1 rounded-full text-xs font-light bg-[#55565A]/10 dark:bg-[#F3E09C]/10 text-[#55565A] dark:text-[#F3E09C]">
                                {{ filmData.length }} Nominaciones
                            </span>
                        </div>

                        <!-- Divider dorado -->
                        <div class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent mb-6"></div>

                        <!-- Información detallada -->
                        <div class="space-y-3 mb-6">
                            <div class="flex items-start gap-3">
                                <span class="text-[#BEA260] mt-0.5">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </span>
                                <div>
                                    <p class="text-xs font-light uppercase tracking-wider text-[#BEA260]">Año de la ceremonia</p>
                                    <p class="text-sm text-[#1A1410] dark:text-[#F3E09C] font-light">{{ firstItem.year_ceremony }}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-3">
                                <span class="text-[#BEA260] mt-0.5">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </span>
                                <div>
                                    <p class="text-xs font-light uppercase tracking-wider text-[#BEA260]">Año de la película</p>
                                    <p class="text-sm text-[#1A1410] dark:text-[#F3E09C] font-light">{{ firstItem.year_film }}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-3">
                                <span class="text-[#BEA260] mt-0.5">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </span>
                                <div>
                                    <p class="text-xs font-light uppercase tracking-wider text-[#BEA260]">Ceremonia</p>
                                    <p class="text-sm text-[#1A1410] dark:text-[#F3E09C] font-light">#{{ firstItem.ceremony }}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-3">
                                <span class="text-[#BEA260] mt-0.5">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h10M7 17h10"/>
                                    </svg>
                                </span>
                                <div>
                                    <p class="text-xs font-light uppercase tracking-wider text-[#BEA260]">Categorías</p>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <NuxtLink 
                                            v-for="cat in uniqueCategories" 
                                            :key="cat"
                                            :to="`/search?category=${encodeURIComponent(cat)}`"
                                            class="px-2 py-1 rounded-full bg-[#BEA260]/10 dark:bg-[#BEA260]/20 text-[#BEA260] text-xs font-light hover:bg-[#BEA260] hover:text-[#1A1410] transition-all duration-300"
                                        >
                                            {{ cat }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Botones de acción -->
                        <div class="flex flex-wrap gap-3 mt-8">
                            <NuxtLink 
                                to="/search"
                                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#BEA260]/30 text-[#BEA260] hover:bg-[#BEA260] hover:text-[#1A1410] transition-all duration-300 text-sm font-light"
                            >
                                Buscar más
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Divider dorado -->
                <div class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>

                 <!-- Lista de nominaciones -->
                <div class="p-8 md:p-10">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="font-display text-xl font-light tracking-[0.15em] uppercase text-[#1A1410] dark:text-[#F3E09C]">
                            Nominaciones y Premios
                        </h2>
                        <span class="text-xs font-light text-[#55565A]/60 dark:text-[#F3E09C]/40">
                            {{ filmData.length }} registros
                        </span>
                    </div>
                    
                    <div class="space-y-3">
                        <div v-for="(item, index) in filmData" :key="index" 
                             class="flex items-center justify-between p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#1a1a1a] border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300 group">
                            <div class="flex-1">
                                <!-- ✅ Categoría específica del item -->
                                <NuxtLink 
                                    :to="`/search?category=${encodeURIComponent(item.category)}`"
                                    class="text-[#BEA260] hover:text-[#F3E09C] transition-colors duration-300 font-medium text-sm group-hover:underline"
                                >
                                    {{ item.category }}
                                </NuxtLink>
                                
                                <!-- ✅ Nominado específico del item -->
                                <div class="flex flex-wrap gap-2 mt-2">
                                    <template v-for="(name, idx) in (item.allNames || [item.name])" :key="idx">
                                        <NuxtLink 
                                            :to="`/nominee/${encodeURIComponent(name)}?from=film&film=${encodeURIComponent(item.film)}`"
                                            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2D231E]/5 dark:bg-[#F3E09C]/5 text-[#55565A] dark:text-[#F3E09C] text-xs font-light hover:bg-[#BEA260]/20 transition-colors duration-300"
                                        >
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                            </svg>
                                            {{ name }}
                                        </NuxtLink>
                                    </template>
                                </div>
                            </div>
                            
                            <!-- Estado -->
                            <span class="ml-4 px-3 py-1 rounded-full text-xs font-light whitespace-nowrap"
                                  :class="item.winner ? 'bg-[#F3E09C] text-[#1A1410] shadow-lg shadow-[#BEA260]/20' : 'bg-[#55565A]/10 dark:bg-[#F3E09C]/10 text-[#55565A] dark:text-[#F3E09C]'">
                                {{ item.winner ? ' Ganador' : 'Nominado' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Breadcrumbs from '~/components/common/Breadcrumbs.vue';
import { computed } from 'vue';
import { useOscarData } from '~/../composables/useOscarData';

const route = useRoute();
const router = useRouter();
const { data, loading, loadData } = useOscarData();

const customBreadcrumbs = computed(() => {
    const crumbs = [];
    
    crumbs.push({
        path: '/',
        label: 'Inicio'
    });
    
    const from = route.query.from;
    
    // 👇 AÑADIR ESTE CASO
    if (from === 'top-films') {
        crumbs.push({
            path: '/collections/top-films',
            label: 'Películas Legendarias'
        });
    }
    else if (from === 'search') {
        crumbs.push({
            path: '/search',
            label: 'Resultados de Búsqueda'
        });
    }
    else {
        crumbs.push({
            path: '/search',
            label: 'Películas'
        });
    }
    
    crumbs.push({
        path: route.path,
        label: filmName.value
    });
    
    return crumbs;
});

const filmName = computed(() => decodeURIComponent(route.params.id || ''));
const filmData = computed(() => {
    if (!data.value) return [];
    return data.value.filter(item => 
        item.film?.toLowerCase() === filmName.value.toLowerCase()
    );
});

const firstItem = computed(() => filmData.value[0] || {});
const winners = computed(() => filmData.value.filter(item => item.winner));

// Obtener categorías únicas
const uniqueCategories = computed(() => {
    const cats = new Set();
    filmData.value.forEach(item => {
        if (item.category) cats.add(item.category);
    });
    return [...cats];
});

// Usar placeholder local si no hay poster
const displayPoster = computed(() => {
    return firstItem.value.poster || '/posters/placeholder.jpg';
});

const handleImageError = (event) => {
    event.target.src = '/posters/placeholder.jpg';
    event.target.onerror = null;
};

onMounted(() => {
    loadData();
});
</script>