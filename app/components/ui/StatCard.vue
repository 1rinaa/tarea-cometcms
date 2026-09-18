<template>
    <div class="bg-white dark:bg-[#2D231E] rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 border border-[#E8D5A3]/20 dark:border-[#C9A84C]/10 hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)]">
        <!-- Decoración dorada en esquina -->
        <div class="absolute top-0 right-0 w-16 h-16">
            <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C]/30 group-hover:border-[#C9A84C] transition-all duration-300"></div>
        </div>
        
        <!-- Efecto de brillo -->
        <div class="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative z-10 flex items-center justify-between">
            <div>
                <p class="text-sm text-[#5C3D2E]/60 dark:text-[#E8D5A3]/60 font-medium uppercase tracking-wider">
                    {{ title }}
                </p>
                <p class="text-3xl font-display font-bold text-[#1A1410] dark:text-[#F5EDE0] mt-2">
                    {{ value || 0 }}
                </p>
            </div>
            <div class="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                {{ icon }}
            </div>
        </div>
        
        <!-- Línea decorativa inferior -->
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent group-hover:via-[#C9A84C] transition-all duration-500"></div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        default: 0
    },
    icon: {
        type: String,
        default: '📊'
    }
});
</script>