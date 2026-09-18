<template>
    <div class="card-oscar p-4 mb-6">
        <div class="flex flex-wrap items-end gap-4">
            <div class="flex-1 min-w-[200px]">
                <label class="block text-sm font-medium text-[#5C3D2E]/70 dark:text-[#E8D5A3]/60 mb-1 tracking-wider">
                    Categoría
                </label>
                <select 
                    v-model="selectedCategory"
                    @change="applyFilters"
                    class="w-full px-3 py-2.5 bg-[#FAF7F2] dark:bg-[#2D231E] text-[#1A1410] dark:text-[#F5EDE0] border-2 border-[#E8D5A3]/30 dark:border-[#C9A84C]/20 rounded-xl focus:outline-none focus:border-[#C9A84C] dark:focus:border-[#C9A84C] transition-all duration-300"
                >
                    <option value="">Todas las categorías</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                        {{ cat }}
                    </option>
                </select>
            </div>
            
            <div class="flex-1 min-w-[150px]">
                <label class="block text-sm font-medium text-[#5C3D2E]/70 dark:text-[#E8D5A3]/60 mb-1 tracking-wider">
                    🎯 Estado
                </label>
                <select 
                    v-model="selectedStatus"
                    @change="applyFilters"
                    class="w-full px-3 py-2.5 bg-[#FAF7F2] dark:bg-[#2D231E] text-[#1A1410] dark:text-[#F5EDE0] border-2 border-[#E8D5A3]/30 dark:border-[#C9A84C]/20 rounded-xl focus:outline-none focus:border-[#C9A84C] dark:focus:border-[#C9A84C] transition-all duration-300"
                >
                    <option value="">Todos</option>
                    <option value="winner">Ganadores</option>
                    <option value="nominee">Nominados</option>
                </select>
            </div>
            
            <button 
                @click="resetFilters"
                class="px-5 py-2.5 rounded-xl border-2 border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1410] transition-all duration-300 font-medium text-sm"
            >
                ↺ Resetear
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    categories: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['filter']);

const selectedCategory = ref('');
const selectedStatus = ref('');

const applyFilters = () => {
    emit('filter', {
        category: selectedCategory.value,
        status: selectedStatus.value
    });
};

const resetFilters = () => {
    selectedCategory.value = '';
    selectedStatus.value = '';
    applyFilters();
};
</script>