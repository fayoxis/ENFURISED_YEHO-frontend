<template>
  <footer class="bg-white justify-center lg:space-y-10 text-white ">
    <div class="bg-white w-screen">
      <div class="container mx-auto ">
        <nav class="px-6 justify-center flex items-center py-4 space-x-10">
          <a href="/" class="text-black flex items-center gap-1">
            <img src="/icons/home/left-arrow-icon.svg" alt="left-arrow-icon">
            <span> Espace <br> Pro.</span>
          </a>
          <div class="flex space-y-7 md:space-y-0 lg:space-y-0 w-full items-center gap-2 flex-col sm:flex-row justify-end space-x-0 sm:space-x-20 px-10">
            <a href="#"
              class="text-black w-full sm:w-1/2 flex justify-end font-semibold lg:text-4xl text-2xl items-center space-x-5 group">
              <span class="mr-2">Joindre</span>
              <img src="/icons/home/up-right-arrow-icon.svg" alt="up-right-arrow-icon" class="h-7 w-7">
            </a>
            <a href="#"
              class="text-black w-full sm:w-1/2 flex justify-end font-semibold lg:text-4xl text-2xl items-center space-x-5 group">
              <span class="mr-2">Newsletter</span>
              <img src="/icons/home/up-right-arrow-icon.svg" alt="up-right-arrow-icon" class="h-7 w-7">
            </a>
          </div>
        </nav>
      </div>
    </div>

    <div class="px-3 pt-3 bg-black justify-between w-full rounded-t-[50px] ">
      <!-- Desktop View -->
      <div class="hidden container mx-auto lg:grid lg:grid-cols-12 gap-10 ">
        <!-- Left Section -->
        <div class="lg:col-span-4 py-9">
          <div class="space-y-4">
            <p class="text-sm uppercase font-medium">En savoir plus sur nous</p>
            <div class="flex items-center gap-2">
              <h1 class="text-emerald-400 text-4xl font-black leading-tight hover:text-green-400 hover:fond-black">
                YOUR ELITE<br />HOME
              </h1>
              <svg class="w-12 h-12 font-bold text-white" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
            <div class="pt-8">
              <p class="text-sm mb-4">Suivez nous sur nos réseaux</p>
              <div class="flex gap-4">
                <a v-for="social in socials" :key="social.name" :href="social.link" :aria-label="social.name"
                  class="w-6 h-6 transition-transform hover:scale-110">
                  <img :src="social.icon" :alt="social.name" class="w-full h-full" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle Section -->
        <div class="lg:col-span-6 py-9">
          <div class="grid grid-cols-2 gap-8">
            <!-- Les Demandes -->
            <div>
              <h3 class="text-gray-400 text-sm font-medium mb-4">Les Demandes</h3>
              <ul class="space-y-2">
                <li v-for="link in demandLinks" :key="link.text">
                  <a :href="link.url" class="text-sm hover:text-emerald-400 transition-colors">
                    {{ link.text }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Les Offres -->
            <div class="">
              <h3 class="text-gray-400 text-sm font-medium mb-4">Les Offres</h3>
              <p class="text-sm mb-4">Entreprise et Services</p>
              <div class="space-y-2">
                <button v-for="btn in offerButtons" :key="btn.text" @click="btn.action"
                  class="py-2 px-4 bg-[#A2C02D] text-black text-sm font-medium rounded-md hover:bg-lime-500 transition-colors">
                  {{ btn.text }}
                </button>
              </div>
            </div>
          </div>

          <!-- App Store Buttons -->
          <div class="mt-8 space-y-4">
            <div class="flex gap-4">
              <a v-for="store in appStores" :key="store.name" :href="store.link"
                class="flex items-center px-4 py-2 border border-white rounded-md hover:border-emerald-400 transition-colors">
                <img :src="store.image" :alt="store.name" class="h-5 mr-2" />
                <span class="text-sm">{{ store.name }}</span>
              </a>
            </div>
            <p class="text-xs text-gray-400 text-start">
              <span class="text-[#A2C02D]">Your Elite Home</span> - Tous droits réservés
              <span class="text-[#A2C02D]">E.N.F.U.R.I.S.E.D</span> {{ currentYear }} - Conception Yoko Design            </p>
          </div>
        </div>

        <!-- Right Section - Logo -->
        <div class="lg:col-span-2 h-full">
          <img src="~/public/images/logo-yeho-green.png" alt="YEHO Logo" class="w-full h-full" />
        </div>
      </div>

      <!-- Mobile View -->
      <div class="lg:hidden justify-center py-10 w-full">
        <!-- Demandes & Offres -->
        <div class="flex space-x-5 justify-center">
          <div class="w-1/2 ">
            <h3 class="text-gray-400 text-sm font-medium mb-3">Les Demandes</h3>
            <ul class="space-y-2">
              <li v-for="link in demandLinks" :key="link.text">
                <a :href="link.url" class="text-sm hover:text-emerald-400 transition-colors">
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>

          <div class="">
            <h3 class="text-gray-400 text-sm font-medium mb-3">Les Offres</h3>
            <p class="text-sm mb-3">Entreprise et Services</p>
            <div class="space-y-2">
              <button v-for="btn in offerButtons" :key="btn.text" @click="btn.action"
                class="flex py-2 px-4 bg-[#A2C02D] text-black text-sm font-medium rounded-md hover:bg-emerald-500 transition-colors">
                {{ btn.text }}
              </button>
            </div>
          </div>
        </div>

        <!-- App Store Buttons -->
        <div class="flex justify-center py-10 gap-3">
          <a v-for="store in appStores" :key="store.name" :href="store.link"
            class="flex items-center px-4 py-2 border border-white rounded-lg hover:border-emerald-400 transition-colors">
            <img :src="store.image" :alt="store.name" class="h-5 mr-3" />
            <span class="text-sm">{{ store.name }}</span>
          </a>
        </div>

        <!-- Elite Home Section -->
        <div class="text-center">
          <p class="text-md font-bold uppercase tracking-wide">En savoir plus sur nous</p>
          <div class="flex items-center justify-center space-x-2">
            <h1 class="text-emerald-400 text-5xl font-black leading-tight">
              YOUR ELITE<br />HOME
            </h1>
            <svg class="w-11 h-11 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <!-- Section: Social Media Links and logo -->
        <div class="flex items-center space-x-5 justify-center h-full w-full">
          <div class="flex flex-col justify-center items-center w-1/2">
            <p class="text-sm mb-4 text-center font-sans">Suivez-nous sur nos réseaux</p>
            <div class="flex justify-center space-x-4">
              <a v-for="social in socials" :key="social.name" :href="social.link" :aria-label="social.name"
                class="w-6 h-6 transform bg-transparent hover:scale-110 transition-transform duration-200">
                <img :src="social.icon" :alt="social.name" class="h-full w-full bg-transparent" />
              </a>
            </div>
            <p class="py-5 text-xs text-center text-gray-500 font-sans">
              <span class="text-[#A2C02D]">Your Elite Home</span> - Tous droits réservés
              <span class="text-[#A2C02D]">E.N.F.U.R.I.S.E.D</span> {{ currentYear }} - Conception Yoko Design
            </p>
          </div>
          <div class="lg:col-span-20 justify-center w-1/3 h-full">
            <img src="~/public/images/logo-yeho-green.png" alt="YEHO Logo" class="w-35 h-full" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const demandLinks = ref([
  { text: "Immobilier", url: "#" },
  { text: "Opportunités", url: "#" },
  { text: "Dossier immobilier", url: "#" },
  { text: "Nous écrire", url: "#" },
])

const offerButtons = ref([
  { text: "Je suis bailleur", action: () => console.log("Bailleur clicked") },
  { text: "Devenir un agent", action: () => console.log("Agent clicked") },
])

const socials = ref([
  { name: "Instagram", icon: "/images/socials/instagram-icon.svg", link: "#" },
  { name: "Facebook", icon: "/images/socials/facebook-icon.svg", link: "#" },
  { name: "Twitter", icon: "/images/socials/twitter-icon.svg", link: "#" },
  { name: "LinkedIn", icon: "/images/socials/linkedIn-icon.svg", link: "#" },
  { name: "TikTok", icon: "/images/socials/whatsapp-icon.svg", link: "#" },
])

const appStores = ref([
  { name: "Google Play", image: "/images/store/google-play.png", link: "#" },
  { name: "App Store", image: "/images/store/app-store.png", link: "#" },
])
</script>

<style scoped>
.container {
  max-width: 1200px;
}

footer ul {
  list-style: none;
  padding: 0;
}

/* Animations and Interactions */
a,
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

a:hover {
  transform: translateY(-2px);
  text-shadow: 0 0 8px rgba(52, 211, 153, 0.3);
}

.group:hover img {
  transform: translate(5px, -5px);
  transition: transform 0.3s ease;
}

button {
  position: relative;
  overflow: hidden;
}

button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
  transition: 0.5s;
}

button:hover::after {
  left: 100%;
}

/* Social Media Icons Animation */
.social-icon {
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.2) rotate(8deg);
  filter: brightness(1.2);
}

/* App Store Buttons  */
[class*="store-button"] {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

[class*="store-button"]:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(52, 211, 153, 0.2);
}

/* Logo Animation */
img[alt="YEHO Logo"] {
  transition: all 0.5s ease;
}

img[alt="YEHO Logo"]:hover {
  filter: brightness(1.2);
  transform: scale(1.05);
}

/* Medium Screen Specific Styles */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    padding: 0 2rem;
  }

  /* Navigation Enhancement */
  nav {
    padding: 1.5rem 0;
  }

  nav a {
    font-size: calc(1.2rem + 0.5vw);
  }

  /* Grid Layout Improvements */
  .grid-cols-2 {
    gap: 2rem;
  }

  /* Button Styling */
  button {
    width: 100%;
    max-width: 250px;
    margin: 0.5rem 0;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 600;
  }

  /* Enhanced Text Visibility */
  .text-sm {
    font-size: 0.925rem;
    line-height: 1.5;
  }

  /* Improved Spacing */
  .space-y-4 {
    margin: 1.5rem 0;
  }

  /* Social Media Section */
  .social-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  /* App Store Buttons */
  .store-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
  }

  /* Hover Effects for Medium Screens */
  .hover-effect {
    position: relative;
  }

  .hover-effect::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #34D399;
    transition: width 0.3s ease;
  }

  .hover-effect:hover::after {
    width: 100%;
  }
}

/* Enhanced Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Apply Animations */
.fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.pulse {
  animation: pulse 2s infinite;
}

.slide-in {
  animation: slideIn 0.5s ease forwards;
}

/* Interaction States */
.text-emerald-400:hover {
  text-shadow: 0 0 15px rgba(52, 211, 153, 0.4);
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #34D399;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2dd4bf;
}

/* Focus States */
a:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.4);
  border-radius: 4px;
}

/* Loading States */
.loading {
  opacity: 0.7;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
</style>