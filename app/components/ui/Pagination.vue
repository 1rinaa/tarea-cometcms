<!-- components/ui/Pagination.vue -->
<template>
    <div class="flex flex-wrap items-center justify-center gap-2 mt-8">
        <!-- Botón Anterior -->
        <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium
                   border-[#BEA260]/40 text-[#BEA260] hover:bg-[#BEA260]/10 hover:border-[#BEA260] 
                   dark:border-[#BEA260]/30 dark:text-[#F3E09C]/70 dark:hover:text-[#F3E09C] dark:hover:border-[#F3E09C]/50
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
            ← Anterior
        </button>
        
        <!-- Números de página -->
        <template v-for="(page, index) in visiblePages" :key="index">
            <!-- Puntos suspensivos -->
            <span v-if="page === '...'" 
                  class="w-10 h-10 flex items-center justify-center text-[#55565A]/40 dark:text-[#F3E09C]/20 text-sm font-light select-none">
                …
            </span>
            
            <!-- Número de página -->
            <button
                v-else
                @click="changePage(page)"
                class="w-10 h-10 rounded-lg transition-all duration-300 text-sm font-medium
                       hover:scale-105"
                :class="page === currentPage 
                    ? 'bg-[#C9A84C] text-white dark:bg-[#F3E09C] dark:text-[#1A1410] shadow-[0_4px_20px_rgba(201,168,76,0.3)]' 
                    : 'border border-[#BEA260]/30 text-[#55565A] dark:text-[#F3E09C]/50 hover:border-[#BEA260] hover:text-[#BEA260] dark:hover:text-[#F3E09C] hover:bg-[#BEA260]/5'"
            >
                {{ page }}
            </button>
        </template>
        
        <!-- Botón Siguiente -->
        <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium
                   border-[#BEA260]/40 text-[#BEA260] hover:bg-[#BEA260]/10 hover:border-[#BEA260] 
                   dark:border-[#BEA260]/30 dark:text-[#F3E09C]/70 dark:hover:text-[#F3E09C] dark:hover:border-[#F3E09C]/50
                   disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
            Siguiente →
        </button>
        
        <!-- Info de página -->
        <span class="text-sm text-[#55565A]/60 dark:text-[#F3E09C]/40 ml-3 font-light">
            Página {{ currentPage }} de {{ totalPages }}
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    total: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        default: 10
    },
    currentPage: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['page-change']);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = props.currentPage;
    const maxVisible = 5;
    
    if (total <= maxVisible + 2) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    const pages = [];
    pages.push(1);
    
    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);
    
    if (current <= 3) {
        start = 2;
        end = 4;
    } else if (current >= total - 2) {
        start = total - 3;
        end = total - 1;
    }
    
    if (start > 2) {
        pages.push('...');
    }
    
    for (let i = start; i <= end; i++) {
        if (i > 1 && i < total) {
            pages.push(i);
        }
    }
    
    if (end < total - 1) {
        pages.push('...');
    }
    
    if (total > 1) {
        pages.push(total);
    }
    
    return pages;
});

const changePage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    emit('page-change', page);
};
</script>