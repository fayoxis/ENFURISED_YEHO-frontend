<template>
  <header class="w-full bg-white fixed top-0 z-50 h-fit flex-wrap">
    <div class="container mx-auto flex items-end justify-center h-32 lg:px-10  max-w-[1480px] pb-5">
      <!-- Logo -->
      <nuxt-link to="/" class="flex-wrap h-full flex items-center px-5">
        <img src="/images/logo-yeho.svg" alt="YEHO Logo" class="w-full h-[178px]" />
      </nuxt-link>
      <!-- Search Bar -->
      <div class="lg:block flex-grow mx-4 justify-end">
        <SearchBar />
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:block">
        <Navigation :isMobile="false" />
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="lg:hidden p-2 rounded focus:outline-none focus:ring mb-1"
        @click.prevent="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <svg v-else class="h-6 w-6 hover:bg-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-show="isMenuOpen"
      class="lg:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg transform transition-transform duration-200 ease-out"
      :class="{ 'translate-y-0': isMenuOpen, '-translate-y-full': !isMenuOpen }"
    >
      <nav class="container overflow-y-visible px-4 py-3 space-y-4">
        <nuxt-link 
          v-for="(link, index) in mobileLinks" 
          :key="index" 
          :to="link.to"
          class="block text-gray-600 hover:text-emerald-500 font-medium text-sm py-2" 
          @click="closeMobileMenu"
        >
          {{ link.text }}
        </nuxt-link>

        <!-- Auth Button for Mobile -->
          <AuthButton />
      </nav>
    </div>

    <!-- Bottom Mobile Menu -->
    <div class="fixed lg:hidden left-0 right-0 bottom-0 bg-white z-40">
      <Navigation class="flex items-center justify-center" />
    </div>
  </header>

  <!-- Spacer to prevent content from being hidden under fixed header -->
  <div class="h-32"></div>
</template>

<script>
import SearchBar from './Navbar/SearchBar.vue'
import Navigation from './Navbar/Navigation.vue'
import AuthButton from './AuthButton.vue'
import MobileMenu from './Navbar/MobileMenu.vue'

export default {
  name: "AppHeader",
  components: {
    SearchBar,
    Navigation,
    AuthButton,
    MobileMenu
  },
  data() {
    return {
      isMenuOpen: false,
      mobileLinks: [
        { to: '/immobilier', text: 'Immobilier' },
        { to: '/carrieres', text: 'Carrières' },
        { to: '/a-propos', text: 'À Propos' },
      ],
    }
  },
  methods: {
    toggleMobileMenu() {
      console.log('Toggle menu clicked, current state:', this.isMenuOpen)
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? "hidden" : ""
      console.log('New menu state:', this.isMenuOpen)
    },
    closeMobileMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ""
    }
  },
  beforeDestroy() {
    document.body.style.overflow = ""
  },
}
</script>

<style scoped>
.transform {
  transition: transform 0.2s ease-out;
}
</style>