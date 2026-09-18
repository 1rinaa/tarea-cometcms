<!-- components/oscar/ResultCard.vue -->
<template>
    <div 
        @click="goToDetail" 
        class="bg-white dark:bg-[#242424] rounded-2xl overflow-hidden group transition-all duration-500 border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:shadow-[0_8px_40px_rgba(190,162,96,0.2)] hover:border-[#BEA260]/40 hover:-translate-y-1 cursor-pointer"
    >
        <div class="flex flex-col sm:flex-row">
            <!-- Poster -->
            <div class="sm:w-48 h-64 sm:h-auto flex-shrink-0 bg-gradient-to-br from-[#BEA260]/20 to-[#F3E09C]/10 dark:from-[#BEA260]/10 dark:to-[#F3E09C]/5">
                <div v-if="displayPoster" class="w-full h-full">
                    <img 
                        :src="displayPoster" 
                        :alt="item.film"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        @error="handleImageError"
                    />
                </div>
                <div v-else class="w-full h-full flex items-center justify-center">
                    <div class="text-center">
                        <span class="text-5xl mb-2">🎬</span>
                        <p class="text-xs text-[#BEA260]/60 mt-2">Sin poster</p>
                    </div>
                </div>
            </div>
            
            <!-- Contenido -->
            <div class="flex-1 p-6 relative">
                <!-- Badge principal -->
                <div class="absolute top-4 right-4">
                    <span class="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                          :class="item.winner ? 'bg-gradient-to-r from-[#F3E09C] to-[#BEA260] text-[#1A1410] shadow-lg shadow-[#BEA260]/30' : 'bg-[#2D231E]/10 dark:bg-[#F3E09C]/10 text-[#2D231E] dark:text-[#F3E09C] border border-[#2D231E]/10 dark:border-[#F3E09C]/20'">
                        {{ item.winner ? 'Ganador' : 'Nominado' }}
                    </span>
                </div>

                <!-- Título de la película -->
                <h3 class="font-display text-2xl font-light tracking-[0.05em] text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors duration-300 mb-2 pr-24">
                    <NuxtLink :to="`/film/${encodeURIComponent(item.film)}`" class="hover:underline" @click.stop>
                        {{ item.film || 'Sin título' }}
                    </NuxtLink>
                </h3>

                <!-- Descripción -->
                <p class="text-sm font-light text-[#55565A]/60 dark:text-[#F3E09C]/40 leading-relaxed mb-4">
                    {{ formattedDescription }}
                </p>

                <!-- Tags / Etiquetas -->
                <div class="flex flex-wrap gap-2 mb-4">
                    <!-- País -->
                    <NuxtLink 
                        :to="`/search?country=${encodeURIComponent(item.country || 'Estados Unidos')}&from=search`"
                        class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-light bg-[#BEA260]/10 dark:bg-[#BEA260]/20 text-[#BEA260] hover:bg-[#BEA260] hover:text-[#1A1410] transition-all duration-300"
                        @click.stop
                    >
                        {{ item.country || 'Estados Unidos' }}
                    </NuxtLink>

                    <!-- Categoría -->
                    <NuxtLink 
                        :to="`/search?category=${encodeURIComponent(item.category)}&from=search`"
                        class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-light bg-[#BEA260]/10 dark:bg-[#BEA260]/20 text-[#BEA260] hover:bg-[#BEA260] hover:text-[#1A1410] transition-all duration-300"
                        @click.stop
                    >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                        </svg>
                        {{ item.category }}
                    </NuxtLink>

                    <!-- Año -->
                    <NuxtLink 
                        :to="`/search?year=${item.year_ceremony}&from=search`"
                        class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-light bg-[#F3E09C]/10 dark:bg-[#F3E09C]/10 text-[#BEA260] hover:bg-[#F3E09C] hover:text-[#1A1410] transition-all duration-300"
                        @click.stop
                    >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        {{ item.year_ceremony }}
                    </NuxtLink>

                    <!-- Nominados (múltiples) -->
                    <template v-for="(name, idx) in displayNames" :key="idx">
                        <NuxtLink 
                            :to="`/search?q=${encodeURIComponent(name)}&from=search`"
                            class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-light bg-[#2D231E]/10 dark:bg-[#F3E09C]/10 text-[#55565A] dark:text-[#F3E09C] hover:bg-[#2D231E] hover:text-[#F3E09C] transition-all duration-300"
                            @click.stop
                        >
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            {{ name }}
                        </NuxtLink>
                    </template>
                </div>

                <!-- Botón de acción -->
                <NuxtLink 
                    :to="`/film/${encodeURIComponent(item.film)}`"
                    class="inline-flex items-center gap-2 text-sm font-light text-[#BEA260] hover:text-[#1A1410] hover:bg-[#BEA260] px-4 py-2 rounded-full transition-all duration-300"
                    @click.stop
                >
                    Ver detalles
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const goToDetail = () => { 
    router.push({
        path: `/film/${encodeURIComponent(props.item.film)}`,
        query: { 
            from: 'search' 
        }
    });
};

const formattedDescription = computed(() => {
    if (!props.item.description) return '';
    
    let desc = props.item.description;
    
    const categoryMap = {
        'actor in a leading role': 'Mejor Actor',
        'actress in a leading role': 'Mejor Actriz',
        'actor in a supporting role': 'Mejor Actor de Reparto',
        'actress in a supporting role': 'Mejor Actriz de Reparto',
        'best picture': 'Mejor Película',
        'directing': 'Mejor Director',
        'animated feature film': 'Mejor Película de Animación',
        'international feature film': 'Mejor Película Internacional',
        'foreign language film': 'Mejor Película Internacional',
        'music (original song)': 'Mejor Canción Original',
        'music (original score)': 'Mejor Banda Sonora',
        'music (scoring)': 'Mejor Banda Sonora'
    };
    
    for (const [eng, esp] of Object.entries(categoryMap)) {
        if (desc.toLowerCase().includes(eng)) {
            desc = desc.replace(new RegExp(eng, 'gi'), esp);
            break;
        }
    }
    
    return desc.charAt(0).toUpperCase() + desc.slice(1);
});

const displayPoster = computed(() => {
    return props.item.poster || '/posters/placeholder.jpg';
});

const displayNames = computed(() => {
    if (!props.item.name) return ['Anónimo'];
    if (props.item.allNames && props.item.allNames.length > 0) {
        return props.item.allNames;
    }
    return props.item.name.split('/').map(name => name.trim()).filter(Boolean);
});

const handleImageError = (event) => {
    event.target.src = '/posters/placeholder.jpg';
    event.target.onerror = null;
};
</script>