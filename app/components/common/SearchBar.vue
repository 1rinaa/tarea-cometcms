<!-- components/common/SearchBar.vue -->
<template>
    <div class="relative w-full group">
        <!-- Icono de búsqueda dorado brillante -->
        <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F3E09C] group-focus-within:text-[#FFD700] transition-colors duration-300 z-10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        
        <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Buscar película, persona..."
            class="w-full pl-12 pr-10 py-2.5 bg-[#0A0808] text-[#F3E09C] placeholder-[#F3E09C]/40 border border-[#BEA260]/20 focus:border-[#BEA260]/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#BEA260]/30 transition-all duration-300 text-sm font-light tracking-wide"
            @input="handleSearch"
            @keyup.enter="handleSearch"
            @focus="showDropdown = true"
            @blur="hideDropdown"
        />
        
        <!-- Botón limpiar -->
        <button 
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#F3E09C]/40 hover:text-[#BEA260] transition-all duration-300 text-sm hover:scale-110"
            type="button"
        >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <!-- Dropdown de resultados -->
        <div v-if="showDropdown && searchResults.length > 0" 
             class="absolute top-full left-0 right-0 mt-2 bg-[#0A0808] border border-[#BEA260]/20 rounded-xl shadow-2xl shadow-[#0A0808]/50 overflow-hidden z-50">
            <div class="max-h-96 overflow-y-auto">
                <div v-for="(result, index) in searchResults" :key="index"
                     class="flex items-center gap-3 p-3 hover:bg-[#BEA260]/10 transition-colors duration-200 cursor-pointer border-b border-[#BEA260]/10 last:border-b-0"
                     @mousedown.prevent="goToResult(result)"
                >
                    <!-- Poster -->
                    <div class="w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#BEA260]/20 to-[#F3E09C]/10">
                        <img 
                            v-if="result.poster" 
                            :src="result.poster" 
                            :alt="result.film"
                            class="w-full h-full object-cover"
                            @error="handleImageError"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center text-xl">
                            🎬
                        </div>
                    </div>
                    
                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-light text-[#F3E09C] truncate">
                            {{ result.film || 'Sin título' }}
                        </p>
                        <p class="text-xs text-[#F3E09C]/60 truncate">
                            {{ result.name || 'Anónimo' }}
                        </p>
                        <p class="text-xs text-[#BEA260] truncate">
                            {{ result.category }}
                        </p>
                    </div>
                    
                    <!-- Badge ganador/nominado -->
                    <span class="flex-shrink-0 px-2 py-1 rounded-full text-xs font-light"
                          :class="result.winner ? 'bg-[#F3E09C] text-[#1A1410]' : 'bg-[#F3E09C]/10 text-[#F3E09C]/60'">
                        {{ result.winner ? '🏆' : '🎬' }}
                    </span>
                </div>
            </div>
            
            <!-- Ver todos los resultados -->
            <NuxtLink 
                :to="`/search?q=${encodeURIComponent(searchQuery)}`"
                class="block text-center py-3 text-sm font-light text-[#BEA260] hover:bg-[#BEA260]/10 transition-colors duration-200"
                @mousedown.prevent
            >
                Ver todos los resultados →
            </NuxtLink>
        </div>
        
        <!-- Sin resultados -->
        <div v-if="showDropdown && searchQuery && searchResults.length === 0 && !loadingResults" 
             class="absolute top-full left-0 right-0 mt-2 bg-[#0A0808] border border-[#BEA260]/20 rounded-xl shadow-2xl shadow-[#0A0808]/50 overflow-hidden z-50 p-4 text-center">
            <p class="text-sm text-[#F3E09C]/60">No se encontraron resultados para "{{ searchQuery }}"</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useOscarData } from '~/../composables/useOscarData';

const searchQuery = ref('');
const showDropdown = ref(false);
const loadingResults = ref(false);
const emit = defineEmits(['search']);

const { data, loadData } = useOscarData();

// Resultados en tiempo real
const searchResults = computed(() => {
    if (!searchQuery.value || searchQuery.value.length < 2) return [];
    
    const query = searchQuery.value.toLowerCase().trim();
    
    // Buscar en películas, nombres, categorías, años
    return (data.value || [])
        .filter(item => {
            const filmMatch = item.film?.toLowerCase().includes(query);
            const nameMatch = item.name?.toLowerCase().includes(query);
            const categoryMatch = item.category?.toLowerCase().includes(query);
            const yearMatch = String(item.year_ceremony).includes(query);
            const allNamesMatch = item.allNames?.some(name => name.toLowerCase().includes(query));
            
            return filmMatch || nameMatch || categoryMatch || yearMatch || allNamesMatch;
        })
        .slice(0, 10); // Limitar a 10 resultados
});

// Cargar datos al montar
onMounted(async () => {
    await loadData();
});

// Debounce para búsqueda más suave
let debounceTimeout;
watch(searchQuery, (newQuery) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        loadingResults.value = false;
    }, 300);
});

const handleSearch = () => {
    emit('search', searchQuery.value);
};

const clearSearch = () => {
    searchQuery.value = '';
    showDropdown.value = false;
    emit('search', '');
};

const hideDropdown = () => {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200);
};

const goToResult = (result) => {
    // Navegar a la página de la película
    navigateTo(`/film/${encodeURIComponent(result.film)}`);
};

const handleImageError = (event) => {
    event.target.src = '/posters/placeholder.jpg';
    event.target.onerror = null;
};
</script>