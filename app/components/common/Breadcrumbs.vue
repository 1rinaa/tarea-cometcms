<!-- components/ui/Breadcrumbs.vue -->
<template>
    <nav class="flex items-center gap-2 text-sm py-3" aria-label="Breadcrumb">
        <template v-for="(crumb, index) in displayCrumbs" :key="index">
            <!-- Si es el primer elemento, no mostrar separador antes -->
            <template v-if="index === 0">
                <NuxtLink 
                    :to="crumb.path"
                    class="text-[#55565A]/60 dark:text-[#F3E09C]/40 hover:text-[#BEA260] dark:hover:text-[#BEA260] transition-colors duration-300 font-light tracking-[0.15em] uppercase text-xs"
                >
                    {{ crumb.label }}
                </NuxtLink>
            </template>
            
            <!-- Para el resto de elementos -->
            <template v-else>
                <span class="text-[#55565A]/30 dark:text-[#BEA260]/30 select-none">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </span>
                
                <NuxtLink 
                    v-if="index < displayCrumbs.length - 1"
                    :to="crumb.path"
                    class="text-[#55565A]/60 dark:text-[#F3E09C]/40 hover:text-[#BEA260] dark:hover:text-[#BEA260] transition-colors duration-300 font-light tracking-[0.15em] uppercase text-xs"
                >
                    {{ crumb.label }}
                </NuxtLink>
                
                <span v-else class="text-[#1A1410] dark:text-[#BEA260] font-light tracking-[0.15em] uppercase text-xs border-b border-[#BEA260]/40 dark:border-[#BEA260]/30 pb-0.5">
                    {{ crumb.label }}
                </span>
            </template>
        </template>
    </nav>
</template>

<script setup>
const route = useRoute();

// Definir props
const props = defineProps({
    customCrumbs: {
        type: Array,
        default: null
    },
    useCustomOnly: {
        type: Boolean,
        default: false
    }
});

// Diccionario de traducciones
const translations = {
    'search': 'Resultados de Búsqueda',
    'explore': 'Explorar',
    'collections': 'Colecciones',
    'categories': 'Categorías',
    'decades': 'Décadas',
    'about': 'Acerca de',
    'contact': 'Contacto',
    'privacy': 'Privacidad',
    'terms': 'Términos',
    'film': 'Película',
    'nominee': 'Nominado',
    'category': 'Categoría',
    'year': 'Año',
    'top-winners': 'Más Ganadores',
    'top-films': 'Películas Legendarias',
    'mejor-actor': 'Mejor Actor',
    'mejor-actriz': 'Mejor Actriz',
    'mejor-actor-de-reparto': 'Mejor Actor de Reparto',
    'mejor-actriz-de-reparto': 'Mejor Actriz de Reparto',
    'mejor-pelicula': 'Mejor Película',
    'mejor-director': 'Mejor Director',
    'mejor-pelicula-de-animacion': 'Mejor Película de Animación',
    'mejor-pelicula-internacional': 'Mejor Película Internacional',
    'mejor-cancion-original': 'Mejor Canción Original',
    'mejor-banda-sonora': 'Mejor Banda Sonora',
};

// Crumbs generados automáticamente desde la ruta
const defaultCrumbs = computed(() => {
    const path = route.path;
    const parts = path.split('/').filter(Boolean);
    
    const result = [];
    let currentPath = '';
    
    parts.forEach((part, index) => {
        currentPath += '/' + part;
        
        let label = decodeURIComponent(part).replace(/-/g, ' ');
        
        const key = label.toLowerCase().replace(/\s+/g, '-');
        if (translations[key]) {
            label = translations[key];
        }
        
        const nameKey = label.toLowerCase();
        if (translations[nameKey]) {
            label = translations[nameKey];
        }
        
        if (!translations[key] && !translations[nameKey]) {
            label = label.charAt(0).toUpperCase() + label.slice(1);
        }
        
        result.push({
            path: currentPath,
            label: label
        });
    });
    
    return result;
});

// Crumbs finales a mostrar
const displayCrumbs = computed(() => {
    if (props.customCrumbs && props.customCrumbs.length > 0) {
        return props.customCrumbs;
    }
    
    if (props.useCustomOnly) {
        return [];
    }
    
    return defaultCrumbs.value;
});
</script>