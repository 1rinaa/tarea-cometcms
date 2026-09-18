/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ✅ Colores oficiales Oscar
        oscar: {
          'gold-dark': '#BEA260',    // Dorado oscuro
          'gold-light': '#F3E09C',   // Dorado claro
          'gold-gradient': 'linear-gradient(135deg, #F3E09C 0%, #BEA260 50%, #F3E09C 100%)',
          'charcoal': '#55565A',     // Gris carbón
          'black': '#000000',        // Negro puro
          'dark': '#000000',         // Negro puro (antes era #1A1410)
          'card-dark': '#242424',    // Gris oscuro para tarjetas en dark mode
          'beige': '#F5F0E8',        // Tono hueso/beige claro
        },
        // Colores secundarios
        'red-dark': '#801B1D',
        'red-bright': '#DC1E33',
        'blue-dark': '#323F6B',
        'blue-medium': '#1B5091',
        'purple-dark': '#3E1952',
        'purple-medium': '#6C4A9E',
        'teal-dark': '#114E43',
        'teal-medium': '#196853',
      },
      fontFamily: {
        // ✅ Futura PT (alternativas)
        display: ['"Futura PT"', 'Century Gothic', 'CenturyGothic', 'Apple Gothic', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}