<!-- pages/nominee/[id].vue -->
<template>
    <div class="min-h-screen bg-[#F5F0E8] dark:bg-[#000000]">
        <!-- Breadcrumbs -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
            <Breadcrumbs :custom-crumbs="breadcrumbs" />
        </div>

        <!-- Detalle de la persona -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block w-8 h-8 border-2 border-[#BEA260] border-t-transparent rounded-full animate-spin"></div>
                <p class="text-[#55565A]/60 dark:text-[#F3E09C]/40 mt-4">Cargando...</p>
            </div>
            
            <div v-else-if="personData.length === 0" class="text-center py-12">
                <p class="text-4xl mb-4">🎭</p>
                <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-300">Persona no encontrada</h2>
                <p class="text-gray-500 dark:text-gray-400 mt-2">No hay registros para "{{ personName }}"</p>
                <NuxtLink to="/" class="inline-block mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
                    Volver al inicio
                </NuxtLink>
            </div>
            
            <div v-else class="bg-white dark:bg-[#242424] rounded-3xl overflow-hidden border border-[#E8D5A3]/20 dark:border-[#3a3a3a] shadow-[0_8px_40px_rgba(190,162,96,0.1)]">
                <!-- Contenido principal -->
                <div class="flex flex-col md:flex-row">
                   <!-- Avatar / Imagen -->
                    <div class="md:w-80 h-96 md:h-auto flex-shrink-0 bg-gradient-to-br from-[#BEA260]/20 to-[#F3E09C]/10 dark:from-[#BEA260]/10 dark:to-[#F3E09C]/5">
                        <img 
                            :src="getPersonImage(personName)" 
                            :alt="personName"
                            class="w-full h-full object-cover"
                            @error="handleImageError"
                        />
                    </div>

                    <!-- Información -->
                    <div class="flex-1 p-8 md:p-10">
                        <h1 class="font-display text-4xl md:text-5xl font-light tracking-[0.05em] text-[#1A1410] dark:text-[#F3E09C] mb-3">
                            {{ personName }}
                        </h1>
                        
                        <!-- ✅ BADGES CORREGIDOS -->
                        <div class="flex flex-wrap gap-3 mb-6">
                            <!-- País -->
                            <span v-if="personCountry" class="px-3 py-1 rounded-full text-xs font-light bg-[#BEA260]/10 dark:bg-[#BEA260]/20 text-[#BEA260]">
                                {{ personCountry }}
                            </span>
                            <!-- ✅ NOMINACIONES: total de registros -->
                            <span class="px-3 py-1 rounded-full text-xs font-light bg-[#BEA260]/10 dark:bg-[#BEA260]/20 text-[#BEA260]">
                                {{ personData.length }} Nominaciones
                            </span>
                            <!-- ✅ PREMIOS: usar uniqueWinsCount en lugar de winners.length -->
                            <span class="px-3 py-1 rounded-full text-xs font-light bg-[#F3E09C] text-[#1A1410]">
                                {{ personStats.uniqueWinsCount }} Premios
                            </span>
                            <!-- ✅ AÑO: mostrar el más reciente -->
                            <span class="px-3 py-1 rounded-full text-xs font-light bg-[#55565A]/10 dark:bg-[#F3E09C]/10 text-[#55565A] dark:text-[#F3E09C]">
                                {{ sortedPersonData[0]?.year_ceremony || 'N/A' }}
                            </span>
                        </div>

                        <!-- Divider dorado -->
                        <div class="w-full h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent mb-6"></div>

                        <!-- Información detallada -->
                        <div class="space-y-4 mb-6">
                            <!-- ✅ CATEGORÍAS GANADAS (nuevo) -->
                            <div v-if="personStats.winCategories.length > 0" class="flex items-start gap-3">
                                <span class="text-[#BEA260] mt-0.5">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                    </svg>
                                </span>
                                <div>
                                    <p class="text-xs font-light uppercase tracking-wider text-[#BEA260]">Premios Oscar</p>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <span v-for="cat in personStats.winCategories" :key="cat"
                                              class="px-2 py-1 rounded-full bg-[#F3E09C]/20 text-[#BEA260] text-xs font-light">
                                            {{ cat }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- ✅ CATEGORÍAS (todas) -->
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
                            
                            <!-- ✅ PELÍCULAS -->
                            <div class="flex items-start gap-3">
                                <span class="text-[#BEA260] mt-0.5">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h10M7 17h10"/>
                                    </svg>
                                </span>
                                <div>
                                    <p class="text-xs font-light uppercase tracking-wider text-[#BEA260]">Películas</p>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <NuxtLink 
                                            v-for="film in uniqueFilms" 
                                            :key="film"
                                            :to="`/film/${encodeURIComponent(film)}`"
                                            class="px-2 py-1 rounded-full bg-[#F3E09C]/10 text-[#BEA260] text-xs font-light hover:bg-[#F3E09C] hover:text-[#1A1410] transition-all duration-300"
                                        >
                                            {{ film }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>

                            <!-- ✅ PELÍCULAS GANADORAS (nuevo) -->
                            <div v-if="personStats.winFilms.length > 0" class="flex items-start gap-3">
                                <span class="text-[#BEA260] mt-0.5">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                    </svg>
                                </span>
                                <div>
                                    <p class="text-xs font-light uppercase tracking-wider text-[#BEA260]">Películas Ganadoras</p>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <NuxtLink 
                                            v-for="film in personStats.winFilms" 
                                            :key="film"
                                            :to="`/film/${encodeURIComponent(film)}`"
                                            class="px-2 py-1 rounded-full bg-[#F3E09C]/20 text-[#1A1410] dark:text-[#F3E09C] text-xs font-light hover:bg-[#F3E09C] hover:text-[#1A1410] transition-all duration-300"
                                        >
                                            {{ film }}
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
                            {{ sortedPersonData.length }} registros
                        </span>
                    </div>
                    
                    <div class="space-y-3">
                        <div v-for="(item, index) in sortedPersonData" :key="index" 
                             class="flex items-center justify-between p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#1a1a1a] border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:border-[#BEA260]/40 transition-all duration-300 group">
                            <div class="flex-1">
                                <!-- Película -->
                                <NuxtLink 
                                    :to="`/film/${encodeURIComponent(item.film)}`"
                                    class="text-[#BEA260] hover:text-[#F3E09C] transition-colors duration-300 font-light text-sm group-hover:underline"
                                >
                                    {{ item.film }}
                                </NuxtLink>
                                <!-- Categoría -->
                                <NuxtLink 
                                    :to="`/category/${encodeURIComponent(item.category)}`"
                                    class="block text-xs text-[#55565A]/60 dark:text-[#F3E09C]/40 mt-1 font-light hover:text-[#BEA260] transition-colors duration-300"
                                >
                                    {{ item.category }}
                                </NuxtLink>
                                <!-- ✅ PERSONAS (mostrar todas las personas del registro) -->
                                <div class="flex flex-wrap gap-1 mt-1">
                                    <span v-for="person in item.people || [item.name]" :key="person"
                                          class="text-xs text-[#55565A]/60 dark:text-[#F3E09C]/40 font-light">
                                        {{ person }}
                                    </span>
                                </div>
                                <!-- País -->
                                <span class="inline-flex items-center gap-1 text-xs text-[#55565A]/50 dark:text-[#F3E09C]/30 mt-1 font-light">
                                    {{ item.country || 'Estados Unidos' }}
                                </span>
                                <!-- Año -->
                                <NuxtLink 
                                    :to="`/year/${item.year_ceremony}`"
                                    class="inline-flex items-center gap-1 text-xs text-[#55565A]/50 dark:text-[#F3E09C]/30 mt-1 font-light hover:text-[#BEA260] transition-colors duration-300 ml-2"
                                >
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    Ceremonia #{{ item.ceremony }} ({{ item.year_ceremony }})
                                </NuxtLink>
                            </div>
                            
                            <!-- Estado -->
                            <span class="ml-4 px-3 py-1 rounded-full text-xs font-light whitespace-nowrap"
                                  :class="item.winner ? 'bg-[#F3E09C] text-[#1A1410] shadow-lg shadow-[#BEA260]/20' : 'bg-[#55565A]/10 dark:bg-[#F3E09C]/10 text-[#55565A] dark:text-[#F3E09C]'">
                                {{ item.winner ? 'Ganador' : 'Nominado' }}
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
import { computed, onMounted } from 'vue';
import { useOscarData } from '~/../composables/useOscarData';

const route = useRoute();
const router = useRouter();
const { data, loading, loadData } = useOscarData();

const breadcrumbs = computed(() => {
    const crumbs = [];
    crumbs.push({ path: '/', label: 'Inicio' });
    
    const from = route.query.from;
    const filmParam = route.query.film;
    const categoryParam = route.query.category;
    
    if (from === 'top-winners') {
        crumbs.push({ path: '/collections/top-winners', label: 'Más Ganadores' });
    } else if (from === 'search') {
        crumbs.push({ path: '/search', label: 'Resultados de Búsqueda' });
    } else if (from === 'film' && filmParam) {
        crumbs.push({ path: '/search', label: 'Películas' });
        crumbs.push({ path: `/film/${encodeURIComponent(filmParam)}`, label: filmParam });
    } else if (from === 'category' && categoryParam) {
        crumbs.push({ path: '/search', label: 'Categorías' });
        crumbs.push({ path: `/category/${encodeURIComponent(categoryParam)}`, label: categoryParam });
    } else if (from === 'year') {
        crumbs.push({ path: '/search', label: 'Años' });
        if (route.query.year) {
            crumbs.push({ path: `/year/${route.query.year}`, label: route.query.year });
        }
    } else {
        crumbs.push({ path: '/search', label: 'Nominados' });
    }
    
    crumbs.push({ path: route.path, label: personName.value });
    return crumbs;
});

const personName = computed(() => decodeURIComponent(route.params.id || ''));

// ✅ BUSCAR EN "people" en lugar de solo "name"
const personData = computed(() => {
    if (!data.value) return [];
    
    const searchName = personName.value.toLowerCase().trim();
    
    return data.value.filter(item => {
        if (item.isInternational) return false;
        
        const people = item.people || [];
        if (people.length > 0) {
            return people.some(person => {
                const cleanPerson = person.toLowerCase().trim();
                return cleanPerson === searchName || 
                       cleanPerson.includes(searchName) || 
                       searchName.includes(cleanPerson);
            });
        }
        
        // Fallback: buscar en name
        if (item.name) {
            const itemName = item.name.toLowerCase().trim();
            return itemName === searchName || 
                   itemName.includes(searchName) || 
                   searchName.includes(itemName);
        }
        
        return false;
    });
});

// ✅ Ordenar por año (más reciente primero)
const sortedPersonData = computed(() => {
    return [...personData.value].sort((a, b) => b.year_ceremony - a.year_ceremony);
});

// ✅ Obtener país de la persona
const personCountry = computed(() => {
    if (personData.value.length === 0) return null;
    
    const countryCount = {};
    personData.value.forEach(item => {
        const country = item.country || 'Desconocido';
        countryCount[country] = (countryCount[country] || 0) + 1;
    });
    
    const sorted = Object.entries(countryCount).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || null;
});

// ✅ CATEGORÍAS ÚNICAS (todas)
const uniqueCategories = computed(() => {
    const cats = new Set();
    personData.value.forEach(item => {
        if (item.category) cats.add(item.category);
    });
    return [...cats];
});

// ✅ PELÍCULAS ÚNICAS (todas)
const uniqueFilms = computed(() => {
    const films = new Set();
    personData.value.forEach(item => {
        if (item.film) films.add(item.film);
    });
    return [...films];
});

// ✅ ESTADÍSTICAS CORRECTAS
const personStats = computed(() => {
    // Contar premios únicos (por categoría)
    const winCategories = new Set();
    const winFilms = new Set();
    
    personData.value.forEach(item => {
        if (item.winner) {
            if (item.category) winCategories.add(item.category);
            if (item.film) winFilms.add(item.film);
        }
    });
    
    return {
        // Número de premios (categorías únicas ganadas)
        uniqueWinsCount: winCategories.size,
        // Categorías ganadas
        winCategories: [...winCategories],
        // Películas ganadoras
        winFilms: [...winFilms],
        // Total de registros (nominaciones)
        totalNominations: personData.value.length
    };
});

// ✅ Función para obtener la imagen
const getPersonImage = (name) => {
    const fileName = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    
    return `/winners/${fileName}.jpg`;
};

const handleImageError = (event) => {
    event.target.src = '/winners/placeholder.jpg';
    event.target.onerror = null;
};

onMounted(() => {
    loadData();
});
</script>