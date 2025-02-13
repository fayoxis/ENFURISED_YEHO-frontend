<template>
  <main class="flex-1 bg-gradient-to-r h-full from-[#A2C02D] to-[#005C53]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <!-- Auth Buttons -->
        <div class="flex flex-row sm:flex-row  gap-3">
          <button
            class="bg-white text-[#005C53] px-8 py-3 rounded-lg font-extrabold hover:bg-gray-50 transition-colors duration-200"
            @click="navigateTo('/auth/register')">
            INSCRIPTION
          </button>
          <button
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-extrabold hover:bg-white/10 transition-colors duration-200"
            @click="navigateTo('/auth/login')">
            CONNEXION
          </button>
        </div>

        <!-- Social Login Section -->
        <div class="text-center  text-white">
          <div class="flex items-center justify-center space-x-4">
            <div class="w-full">
            <div class="border-2 border-white"></div>
          </div>
            <p class="mb-4 font-bold text-lg md:text-xl lg:text-2xl  flex">ou</p>
            <div class="w-full">
            <div class="border-2 border-white"></div>
          </div>
            
          </div>

          <p class="mb-6">Vous connecter avec vos réseaux sociaux</p>
          <div class="flex gap-6 w-full">
            <button v-for="(social, index) in socialNetworks" :key="index"
              class="w-full h-20  bg-[#005C53] rounded-lg flex items-center justify-center hover:bg-[#005C53]/50 transition-colors duration-200"
              @click="handleSocialLogin(social.name)">
              <img :src="social.icon" alt="" srcset="">
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const socialNetworks = [
  { name: 'google', icon: '/images/socials/google-icon.svg' },
  { name: 'facebook', icon: '/images/socials/facebook-icon.svg' },
  { name: 'twitter', icon: '/images/socials/twitter-icon.svg' }
]

const handleSocialLogin = (provider: string) => {
  console.log(`Login with ${provider}`)
  // Implement social login logic here
}
</script>