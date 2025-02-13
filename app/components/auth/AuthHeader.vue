<template>
  <header class="h-full w-full ">
    <nav class="w-full h-1/3 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-full">
          <!-- Logo -->
          <div class="flex-shrink-0" >
            <NuxtLink to="/" class="block">
              <img src="/icons/yeho-auth-logo.svg" class="h-full" alt="">
            </NuxtLink>
          </div>
  
          <!-- Desktop Navigation -->
          <div class="hidden md:flex md:items-center md:space-x-8 lg:space-x-10">
            <NuxtLink 
              v-for="link in navigationLinks" 
              :key="link.path"
              :to="link.path"
              class="text-[#8DAD9D] lg:px-2 hover:text-[#A2C02D] transition-colors duration-200"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
  
          <!-- Mobile Navigation Button -->
          <div class="md:hidden">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="text-[#8DAD9D] hover:text-[#A2C02D]"
            >
              <span class="sr-only">Open menu</span>
              <svg 
                class="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  v-if="!isMobileMenuOpen" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path 
                  v-else 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile Navigation Menu -->
      <div 
        v-show="isMobileMenuOpen" 
        class="md:hidden"
      >
        <div class="relative  w-full bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.path"
            :to="link.path"
            class="block px-3 py-2 text-[#A2C02D] hover:text-[#A2C02D]/60 transition-colors duration-200"
            @click="isMobileMenuOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
  </template>
  
  <script setup lang="ts">
  const isMobileMenuOpen = ref(false)
  
  const navigationLinks = [
    { name: 'Accueil', path: '/home' },
    { name: 'Mentions légales', path: '/legal' },
    { name: 'About YEHO', path: '/about' }
  ]
  </script>