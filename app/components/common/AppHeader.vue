<template>
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#0A0808]/95 backdrop-blur-sm border-b border-[#BEA260]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <!-- Línea dorada decorativa -->
        <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BEA260]/60 to-transparent"></div>
        
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-16 relative">
                <!-- Logo a la izquierda -->
                <NuxtLink to="/" class="flex items-center gap-3 group flex-shrink-0 z-10">
                    <img 
                        src="/oscar-award.png" 
                        alt="Oscar Awards Logo" 
                        class="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_2px_8px_rgba(190,162,96,0.3)]"
                    >
                </NuxtLink>

                <!-- Enlaces del header -->
                <nav class="hidden lg:flex items-center gap-10 text-sm absolute left-1/2 -translate-x-1/2">
                    <NuxtLink to="/" class="relative text-[#F3E09C]/70 hover:text-[#BEA260] transition-colors duration-300 font-light tracking-[0.2em] uppercase text-xs group">
                        Inicio
                        <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#BEA260] transition-all duration-300 group-hover:w-full"></span>
                    </NuxtLink>
                    
                    <NuxtLink to="/#explore" class="relative text-[#F3E09C]/70 hover:text-[#BEA260] transition-colors duration-300 font-light tracking-[0.2em] uppercase text-xs group">
                        Explorar
                        <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#BEA260] transition-all duration-300 group-hover:w-full"></span>
                    </NuxtLink>
                    
                    <NuxtLink to="/#collections" class="relative text-[#F3E09C]/70 hover:text-[#BEA260] transition-colors duration-300 font-light tracking-[0.2em] uppercase text-xs group">
                        Colecciones
                        <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#BEA260] transition-all duration-300 group-hover:w-full"></span>
                    </NuxtLink>
                </nav>

                <!-- Botones a la derecha -->
                <div class="flex items-center gap-3 z-10">
                    <SearchBar @search="handleSearch" class="hidden md:block w-64" />
                    
                    <button
                        @click="toggleDarkMode"
                        class="relative w-10 h-10 rounded-full duration-300 flex items-center justify-center group hover:bg-[#BEA260]/10"
                        :title="isDark ? 'Modo claro' : 'Modo oscuro'"
                    >
                        <svg 
                            v-if="isDark"
                            class="w-4 h-4 text-[#BEA260] group-hover:scale-110 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <svg 
                            v-else
                            class="w-4 h-4 text-[#F3E09C]/70 group-hover:text-[#BEA260] group-hover:scale-110 transition-all duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                        </svg>
                    </button>

                    <button
                        @click="mobileMenuOpen = !mobileMenuOpen"
                        class="lg:hidden p-2 rounded-lg hover:bg-[#BEA260]/10 transition-colors duration-300 text-[#F3E09C]"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div v-show="mobileMenuOpen" class="lg:hidden py-4 border-t border-[#BEA260]/10">
                <div class="flex flex-col space-y-3">
                    <NuxtLink to="/" class="text-[#F3E09C]/70 hover:text-[#BEA260] transition-colors duration-300 font-light tracking-wider px-2 py-1">Inicio</NuxtLink>
                    <NuxtLink to="/#explore" class="text-[#F3E09C]/70 hover:text-[#BEA260] transition-colors duration-300 font-light tracking-wider px-2 py-1">Explorar</NuxtLink>
                    <NuxtLink to="/#collections" class="text-[#F3E09C]/70 hover:text-[#BEA260] transition-colors duration-300 font-light tracking-wider px-2 py-1">Colecciones</NuxtLink>
                    <SearchBar @search="handleSearch" class="w-full mt-2" />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import SearchBar from '~/components/common/SearchBar.vue';

const isDark = ref(false);
const mobileMenuOpen = ref(false);

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true;
        document.documentElement.classList.add('dark');
    }
});

const handleSearch = (query) => {
    console.log('Buscando:', query);
};
</script>

<style scoped>
.gold-text {
    background: linear-gradient(135deg, #F3E09C 0%, #BEA260 50%, #F3E09C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>