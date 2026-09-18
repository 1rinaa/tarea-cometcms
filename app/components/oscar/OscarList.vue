<template>
    <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin text-4xl">⏳</div>
        <p class="text-gray-500 mt-2">Cargando datos...</p>
    </div>
    
    <div v-else-if="items.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No se encontraron resultados</p>
        <p class="text-gray-400 text-sm">Intenta con otros filtros</p>
    </div>
    
    <div v-else class="space-y-4">
        <OscarCard 
            v-for="(item, index) in paginatedItems" 
            :key="index"
            :item="item"
        />
        
        <Pagination 
            v-if="items.length > perPage"
            :total="items.length"
            :per-page="perPage"
            :current-page="currentPage"
            @page-change="handlePageChange"
        />
    </div>
</template>

<script setup>
import OscarCard from '~/components/oscar/OscarCard.vue';
import Pagination from '~/components/ui/Pagination.vue';

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    perPage: {
        type: Number,
        default: 10
    }
});

const currentPage = ref(1);

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * props.perPage;
    const end = start + props.perPage;
    return props.items.slice(start, end);
});

const handlePageChange = (page) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(() => props.items, () => {
    currentPage.value = 1;
});
</script>