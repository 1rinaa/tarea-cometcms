<template>
    <NuxtLink 
        :to="link"
        class="group relative overflow-hidden rounded-2xl border border-[#E8D5A3]/20 dark:border-[#3a3a3a] bg-white dark:bg-[#242424] p-6 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(190,162,96,0.15)] hover:border-[#BEA260]/40 hover:-translate-y-1"
    >
        <!-- Resplandor dorado sutil al hover -->
        <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#BEA260]/0 group-hover:to-[#BEA260]/10 transition-all duration-500"></div>
        
        <!-- Línea dorada superior -->
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <!-- Icono SVG elegante -->
        <div class="relative w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-[#F3E09C]/20 to-[#BEA260]/10 dark:from-[#F3E09C]/10 dark:to-[#BEA260]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <!-- Trofeo -->
            <svg v-if="icon === 'trophy'" class="w-7 h-7 text-[#BEA260] dark:text-[#F3E09C]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21h8m-4-4v4m-6-17h12v4a6 6 0 01-12 0V4zm-4 4h4m12 0h4m-4 0a4 4 0 01-8 0m-4 0a4 4 0 008 0"/>
            </svg>
            
            <!-- Película -->
            <svg v-else-if="icon === 'film'" class="w-7 h-7 text-[#BEA260] dark:text-[#F3E09C]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
            </svg>
            
            <!-- Calendario -->
            <svg v-else-if="icon === 'calendar'" class="w-7 h-7 text-[#BEA260] dark:text-[#F3E09C]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            
            <!-- Categorías (Lista) -->
            <svg v-else-if="icon === 'category'" class="w-7 h-7 text-[#BEA260] dark:text-[#F3E09C]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            
            <!-- Icono por defecto -->
            <svg v-else class="w-7 h-7 text-[#BEA260] dark:text-[#F3E09C]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21h8m-4-4v4m-6-17h12v4a6 6 0 01-12 0V4zm-4 4h4m12 0h4m-4 0a4 4 0 01-8 0m-4 0a4 4 0 008 0"/>
            </svg>
        </div>
        
        <!-- Título -->
        <h3 class="font-display text-lg font-medium tracking-[0.08em] uppercase text-[#1A1410] dark:text-[#F3E09C] group-hover:text-[#BEA260] transition-colors duration-300 mb-2">
            {{ title }}
        </h3>
        
        <!-- Descripción -->
        <p class="text-sm font-normal text-[#55565A]/70 dark:text-[#F3E09C]/50 leading-relaxed mb-4">
            {{ description }}
        </p>
        
        <!-- Contador y flecha -->
        <div class="flex items-center justify-between">
            <span class="text-xs font-medium tracking-wider text-[#BEA260] dark:text-[#F3E09C]/60">
                {{ count }} elementos
            </span>
            <div class="flex items-center gap-1 text-[#BEA260] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
                <span class="text-xs font-medium uppercase tracking-wider">Explorar</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
        
        <!-- Línea decorativa inferior -->
        <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/0 to-transparent group-hover:via-[#BEA260]/60 transition-all duration-500"></div>
    </NuxtLink>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: 'trophy'
    },
    link: {
        type: String,
        default: '#'
    },
    count: {
        type: Number,
        default: 0
    }
});
</script>