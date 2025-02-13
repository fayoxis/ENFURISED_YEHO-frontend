<template>
    <section 
      ref="heroSection"
      class="w-full relative px-6 py-8 md:px-12 lg:px-24 rounded-2xl shadow-2xl overflow-hidden"
      @mousemove="handleMouseMove"
      @mouseleave="resetBackground"
    >
      <!-- Dynamic Background Layer -->
      <div 
        ref="backgroundLayer"
        class="absolute inset-0 transition-all duration-500 ease-out opacity-20"
        :style="{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${dynamicGradientColors}, transparent 40%)`
        }"
      ></div>
      
      <!-- Content Layer -->
      <div class="relative z-10 text-center">
        <transition 
          appear
          enter-active-class="transition duration-600 ease-out"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
        >
          <h1 class="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            TROUVEZ VOTRE <span class="text-lime-600 mt-2 animate-pulse">COIN DE PARADIS</span>
          </h1>
        </transition>
        
        <transition 
          appear
          enter-active-class="transition duration-600 ease-out delay-400"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
        >
          <p class="max-w-2xl mx-auto text-gray-600 mt-2 text-sm">
            Votre <span class="text-lime-600 font-semibold">nouveau chez-vous</span> vous attend. Découvrez des propriétés exceptionnelles <span class="text-lime-600 font-semibold">et faites de la mellieure votre foyer.</span> 
          </p>
        </transition>
        
        <transition 
          appear
          enter-active-class="transition duration-600 ease-out delay-500"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div class="mt-4">
            <a 
              href="#proprietes" 
              class="inline-block px-6 py-2 bg-lime-600 text-white rounded-full 
              font-bold uppercase tracking-wide shadow-lg hover:bg-lime-700 
              transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Explorez Maintenant
            </a>
          </div>
        </transition>
      </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// References to section and background layer
const heroSection = ref(null)
const backgroundLayer = ref(null)

// Mouse position state
const mousePosition = ref({ x: 0, y: 0 })

// Color palette for dynamic background
const colorPalette = [
    'rgba(163, 230, 53, 0.1)', // Lime
    'rgba(134, 239, 172, 0.1)', // Green
    'rgba(45, 212, 191, 0.1)', // Teal
    'rgba(96, 165, 250, 0.1)', // Blue
]

// Computed dynamic gradient colors
const dynamicGradientColors = computed(() => {
    const randomColors = colorPalette
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .join(', ')
    return randomColors
})

// Handle mouse movement
const handleMouseMove = (event) => {
    if (heroSection.value) {
        const rect = heroSection.value.getBoundingClientRect()
        mousePosition.value = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
}

// Reset background when mouse leaves
const resetBackground = () => {
    mousePosition.value = { x: 0, y: 0 }
}
</script>

<style scoped>
/* Additional subtle styling to enhance interactivity */
section {
    transition: all 0.3s ease;
    cursor: default;
}
section:hover {
    transform: scale(1.01);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
</style>