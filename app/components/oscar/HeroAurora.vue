<template>
    <div class="relative w-full h-[800px] md:h-[900px] overflow-hidden">
        <!-- Fondo con negro profundo -->
        <div class="absolute inset-0 bg-[#0A0808]"></div>
        
        <!-- Efecto Aurora con luz dorada más intensa -->
        <div class="absolute inset-0 aurora-effect">
            <div class="aurora-layer aurora-1"></div>
            <div class="aurora-layer aurora-2"></div>
            <div class="aurora-layer aurora-3"></div>
            <div class="aurora-layer aurora-4"></div>
        </div>
        
        <!-- Partículas doradas flotantes (reducidas) -->
        <div class="absolute inset-0 particles-container">
            <div v-for="i in 15" :key="i" class="particle" :style="particleStyle(i)"></div>
        </div>
        
        <!-- Líneas decorativas doradas -->
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BEA260]/80 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BEA260]/40 to-transparent"></div>
        
        <!-- Círculos decorativos con brillo -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-10 left-10 w-40 h-40 border border-[#BEA260]/50 rounded-full glow-circle"></div>
            <div class="absolute bottom-10 right-10 w-60 h-60 border border-[#BEA260]/50 rounded-full glow-circle"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#BEA260]/40 rounded-full glow-circle"></div>
            <div class="absolute top-20 right-20 w-24 h-24 border border-[#BEA260]/40 rounded-full glow-circle"></div>
            <div class="absolute bottom-20 left-20 w-32 h-32 border border-[#BEA260]/40 rounded-full glow-circle"></div>
        </div>
        
        <!-- Rayos de luz dorada (más sutiles) -->
        <div class="absolute inset-0 light-rays">
            <div class="ray ray-1"></div>
            <div class="ray ray-2"></div>
            <div class="ray ray-3"></div>
            <div class="ray ray-4"></div>
        </div>
        
        <!-- Contenido -->
        <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <div class="max-w-4xl">
                <div class="flex items-center justify-center gap-4 mb-6 animate-fade-up">
                    <div class="w-20 h-px bg-gradient-to-r from-transparent via-[#F3E09C] to-transparent"></div>
                    <img src="/oscar-award.png" alt="Oscar Award" class="h-20 w-auto object-contain drop-shadow-[0_2px_10px_rgba(243,224,156,0.2)] animate-glow-subtle">
                    <div class="w-20 h-px bg-gradient-to-r from-transparent via-[#F3E09C] to-transparent"></div>
                </div>
                
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-[0.08em] animate-fade-up gold-text">
                    OSCAR AWARDS
                </h1>
                
                <p class="text-[#F3E09C]/80 text-lg md:text-xl mt-4 font-light tracking-[0.25em] uppercase max-w-2xl mx-auto animate-fade-up subtitle" style="animation-delay: 0.2s">
                    Celebrating excellence in cinema since 1927
                </p>
                
                <div class="w-32 h-px bg-gradient-to-r from-transparent via-[#F3E09C] to-transparent mx-auto mt-8 animate-fade-up" style="animation-delay: 0.4s"></div>
                
                <NuxtLink 
                    to="#explore"
                    class="inline-flex items-center gap-3 mt-10 px-10 py-4 btn-gold rounded-full animate-fade-up font-medium tracking-[0.15em] uppercase text-sm group"
                    style="animation-delay: 0.6s"
                >
                    <span>Explorar más</span>
                    <svg class="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </NuxtLink>
                
                <div class="flex flex-wrap items-center justify-center gap-10 mt-10 animate-fade-up" style="animation-delay: 0.8s">
                    <div class="flex items-center gap-3 text-[#F3E09C]/70 text-sm font-light tracking-wider group cursor-pointer">
                        <span class="w-2 h-2 bg-[#F3E09C] rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_6px_rgba(243,224,156,0.5)]"></span>
                        {{ data.length || 0 }} Nominaciones
                    </div>
                    <div class="flex items-center gap-3 text-[#F3E09C]/70 text-sm font-light tracking-wider group cursor-pointer">
                        <span class="w-2 h-2 bg-[#F3E09C] rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_6px_rgba(243,224,156,0.5)]"></span>
                        {{ years.length || 0 }} Años
                    </div>
                    <div class="flex items-center gap-3 text-[#F3E09C]/70 text-sm font-light tracking-wider group cursor-pointer">
                        <span class="w-2 h-2 bg-[#F3E09C] rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_6px_rgba(243,224,156,0.5)]"></span>
                        {{ winnersCount || 0 }} Ganadores
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { useOscarData } from '~/../composables/useOscarData';

const { data, getYears } = useOscarData();
const years = computed(() => getYears.value || []);
const winnersCount = computed(() => data.value?.filter(item => item.winner).length || 0);

// Partículas doradas
const particles = ref([]);

const particleStyle = (index) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 5;
    
    return {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
    };
};

onMounted(() => {
    particles.value = Array.from({ length: 15 }, (_, i) => i);
});
</script>

<style scoped>
/* Efecto Aurora */
.aurora-effect {
    position: absolute;
    inset: 0;
    overflow: hidden;
    opacity: 0.4;
}

.aurora-layer {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: auroraFloat 10s ease-in-out infinite alternate;
}

.aurora-1 {
    width: 70%;
    height: 50%;
    top: -10%;
    left: -20%;
    background: radial-gradient(circle, rgba(190, 162, 96, 0.25), rgba(243, 224, 156, 0.1), transparent);
    animation-delay: 0s;
    animation-duration: 12s;
}

.aurora-2 {
    width: 60%;
    height: 45%;
    bottom: -10%;
    right: -20%;
    background: radial-gradient(circle, rgba(190, 162, 96, 0.2), rgba(243, 224, 156, 0.08), transparent);
    animation-delay: -3s;
    animation-duration: 14s;
}

.aurora-3 {
    width: 50%;
    height: 40%;
    top: 20%;
    left: 30%;
    background: radial-gradient(circle, rgba(243, 224, 156, 0.15), rgba(190, 162, 96, 0.05), transparent);
    animation-delay: -6s;
    animation-duration: 16s;
}

.aurora-4 {
    width: 40%;
    height: 35%;
    bottom: 20%;
    left: 10%;
    background: radial-gradient(circle, rgba(190, 162, 96, 0.12), rgba(243, 224, 156, 0.04), transparent);
    animation-delay: -9s;
    animation-duration: 18s;
}

@keyframes auroraFloat {
    0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
    }
    25% {
        transform: translate(40px, -30px) scale(1.15) rotate(5deg);
    }
    50% {
        transform: translate(-30px, 20px) scale(0.9) rotate(-5deg);
    }
    75% {
        transform: translate(20px, -10px) scale(1.1) rotate(3deg);
    }
    100% {
        transform: translate(-20px, 30px) scale(0.95) rotate(-3deg);
    }
}

/* Partículas doradas (más sutiles) */
.particles-container {
    pointer-events: none;
}

.particle {
    position: absolute;
    background: radial-gradient(circle, rgba(243, 224, 156, 0.6), transparent);
    border-radius: 50%;
    animation: floatUp linear infinite;
    box-shadow: 0 0 5px rgba(243, 224, 156, 0.4);
    opacity: 0.7;
}

@keyframes floatUp {
    0% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }
    10% {
        opacity: 0.7;
    }
    90% {
        opacity: 0.7;
    }
    100% {
        transform: translateY(-100px) scale(0.5);
        opacity: 0;
    }
}

/* Círculos con brillo (más sutil) */
.glow-circle {
    animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
    0%, 100% {
        box-shadow: 0 0 10px rgba(190, 162, 96, 0.15);
        border-color: rgba(190, 162, 96, 0.4);
    }
    50% {
        box-shadow: 0 0 20px rgba(243, 224, 156, 0.3);
        border-color: rgba(243, 224, 156, 0.5);
    }
}

/* Rayos de luz (más sutiles) */
.light-rays {
    overflow: hidden;
}

.ray {
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(243, 224, 156, 0.03) 50%, transparent 70%);
    animation: raySweep 10s ease-in-out infinite alternate;
}

.ray-1 {
    top: -50%;
    left: -50%;
    animation-delay: 0s;
}

.ray-2 {
    top: -50%;
    left: -50%;
    transform: rotate(90deg);
    animation-delay: -2.5s;
}

.ray-3 {
    top: -50%;
    left: -50%;
    transform: rotate(180deg);
    animation-delay: -5s;
}

.ray-4 {
    top: -50%;
    left: -50%;
    transform: rotate(270deg);
    animation-delay: -7.5s;
}

@keyframes raySweep {
    0% {
        transform: rotate(0deg) scale(1);
    }
    100% {
        transform: rotate(20deg) scale(1.2);
    }
}

/* Texto dorado (menos brillo para mejor legibilidad) */
.gold-text {
    background: linear-gradient(135deg, #F3E09C 0%, #D4B86A 50%, #F3E09C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 20px rgba(190, 162, 96, 0.2));
    background-size: 200% 200%;
    animation: goldShimmer 4s ease-in-out infinite;
}

@keyframes goldShimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

/* Animaciones de entrada */
.animate-fade-up {
    animation: fadeUp 0.8s ease-out both;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Logo con brillo sutil */
.animate-glow-subtle {
    animation: logoGlowSubtle 3s ease-in-out infinite;
}

@keyframes logoGlowSubtle {
    0%, 100% {
        filter: drop-shadow(0 2px 10px rgba(243, 224, 156, 0.2));
    }
    50% {
        filter: drop-shadow(0 2px 20px rgba(243, 224, 156, 0.5));
    }
}

/* Botón dorado elegante */
.btn-gold {
    background: linear-gradient(135deg, #F3E09C 0%, #D4B86A 50%, #F3E09C 100%);
    color: #1A1410; /* Color más oscuro para mejor contraste */
    border: 1px solid rgba(243, 224, 156, 0.3);
    font-weight: 500; /* Peso medio para mejor legibilidad */
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3); /* Sutil sombra para dar profundidad */
    transition: all 0.4s ease;
}

.btn-gold:hover {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(243, 224, 156, 0.5);
    background: linear-gradient(135deg, #FFE4A3 0%, #D4B86A 50%, #FFE4A3 100%);
}

/* Subtítulo elegante */
.subtitle {
    font-weight: 300;
    letter-spacing: 0.25em;
}

/* Indicador de scroll animado */
.animate-bounce-slow {
    animation: bounceSlow 2s ease-in-out infinite;
}

@keyframes bounceSlow {
    0%, 100% {
        transform: translate(-50%, 0);
    }
    50% {
        transform: translate(-50%, 10px);
    }
}

.animate-scroll-dot {
    animation: scrollDot 1.5s ease-in-out infinite;
}

@keyframes scrollDot {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(15px);
        opacity: 0;
    }
}
</style>