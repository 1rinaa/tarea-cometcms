<template>
    <div class="bg-white dark:bg-[#242424] rounded-2xl overflow-hidden group transition-all duration-500 border border-[#E8D5A3]/20 dark:border-[#3a3a3a] hover:shadow-[0_4px_30px_rgba(190,162,96,0.15)] hover:border-[#BEA260]/40">
        <div class="flex flex-col sm:flex-row">
            <!-- Imagen -->
            <div class="sm:w-32 h-48 sm:h-auto flex-shrink-0 bg-gradient-to-br from-[#BEA260]/10 to-[#F3E09C]/5 dark:from-[#BEA260]/5 dark:to-[#F3E09C]/2">
                <div v-if="posterUrl" class="w-full h-full">
                    <img 
                        :src="posterUrl" 
                        :alt="item.film"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        @error="handleImageError"
                    />
                </div>
                <div v-else class="w-full h-full flex items-center justify-center text-4xl opacity-20">
                    🎬
                </div>
            </div>
            
            <!-- Contenido -->
            <div class="flex-1 p-5 relative">
                <!-- Badge -->
                <div class="absolute top-4 right-4">
                    <span class="px-3 py-1 rounded-full text-xs font-light uppercase tracking-[0.15em]"
                          :class="item.winner ? 'bg-gradient-to-r from-[#F3E09C] to-[#BEA260] text-[#1A1410]' : 'bg-[#2D231E]/10 dark:bg-[#F3E09C]/10 text-[#2D231E] dark:text-[#F3E09C] border border-[#2D231E]/10 dark:border-[#F3E09C]/20'">
                        {{ item.winner ? 'Ganador' : 'Nominado' }}
                    </span>
                </div>

                <div class="pr-24">
                    <h3 class="font-display text-xl font-light tracking-[0.05em] text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors duration-300">
                        <NuxtLink :to="`/film/${encodeURIComponent(item.film)}`">
                            {{ item.film || 'Sin título' }}
                        </NuxtLink>
                    </h3>
                    
                    <div class="mt-3 space-y-1.5">
                        <p class="text-sm font-light text-[#55565A]/70 dark:text-[#F3E09C]/50">
                            <span class="tracking-wider uppercase text-xs text-[#BEA260]">Categoría:</span> 
                            <!-- ✅ ENLACE CORRECTO: /category/[id] -->
                            <NuxtLink :to="`/category/${encodeURIComponent(item.category)}`" class="text-[#1A1410] dark:text-[#F3E09C] hover:text-[#BEA260] transition-colors duration-300">
                                {{ item.category }}
                            </NuxtLink>
                        </p>
                        <p class="text-sm font-light text-[#55565A]/70 dark:text-[#F3E09C]/50">
                            <span class="tracking-wider uppercase text-xs text-[#BEA260]">Nominado:</span> 
                            <!-- ✅ ENLACE CORRECTO: /nominee/[id] -->
                            <NuxtLink :to="`/nominee/${encodeURIComponent(item.name)}`" 
                                      class="text-[#1A1410] dark:text-[#F3E09C] hover:text-[#BEA260] transition-colors duration-300">
                                {{ item.name || 'Anónimo' }}
                            </NuxtLink>
                        </p>
                        <div class="flex items-center gap-3 mt-3 text-xs font-light text-[#55565A]/50 dark:text-[#F3E09C]/30">
                            <!-- ✅ ENLACE CORRECTO: /year/[id] -->
                            <NuxtLink :to="`/year/${item.year_ceremony}`" class="flex items-center gap-1 hover:text-[#BEA260] transition-colors duration-300">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Ceremonia {{ item.ceremony }} ({{ item.year_ceremony }})
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Línea decorativa -->
        <div class="h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/20 to-transparent group-hover:via-[#BEA260]/80 transition-all duration-500"></div>
    </div>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    },
    posterUrl: {
        type: String,
        default: null
    }
});

const handleImageError = (event) => {
    event.target.src = '/images/default/poster-default.jpg';
};
</script>