<template>
  <div class="transform bg-white transition-all duration-300 hover:scale-[1.02] w-full rounded-3xl">
    <div class="rounded-2xl overflow-hidden border-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
      :class="property.status === 'indisponible' ? 'border-[#F24405]' : 'border-[#2FAC66]'">

      <!-- Image Section -->
      <div class="relative p-2 bg-white rounded-3xl group">
        <div class="rounded-3xl transition-transform duration-300"
          :class="property.status === 'indisponible' ? 'bg-[#F24405]' : 'bg-[#2FAC66]'">
          <div class="relative overflow-hidden rounded-3xl">
            <img :src="property.imageUrl"
              class="w-full h-[120px] sm:h-[150px] md:h-[120px] lg:h-[160px] object-cover rounded-3xl transform transition-transform duration-500 group-hover:scale-110"
              alt="Property Image" />
            <!-- Image Overlay on Hover -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
            </div>
          </div>

          <!-- Status Badge -->
          <!-- Status Badge with Dropdown -->
          <div class="absolute top-4 right-4">
            <div class="relative">
              <button @click="toggleStatusDropdown"
                class="flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transform transition-all duration-300 hover:scale-105"
                :class="property.status === 'indisponible' ? 'bg-[#F24405]' : 'bg-[#2FAC66]'">
                {{ property.status }}
                <img src="/icons/profile/dpc-icon.svg" alt="" class="px-2" />
              </button>

              <!-- Dropdown Menu -->
              <div v-if="isStatusDropdownOpen"
                class="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                <ul class="py-1">
                  <li @click="updateStatus('disponible')"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-green-600">
                    Disponible
                  </li>
                  <li @click="updateStatus('indisponible')"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                    Indisponible
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Stats Bar -->
          <div class="py-2 px-3 rounded-3xl"
            :class="property.status === 'indisponible' ? 'bg-[#F24405]' : 'bg-[#2FAC66]'">
            <div
              class="rounded-3xl flex lg:flex-wrap md:flex-nowrap justify-between text-white text-sm sm:text-xs gap-2">
              <div class="flex items-center space-x-1 hover:scale-105 transition-transform">
                <img src="/icons/profile/camera-icon.svg" alt="camera icon" class="h-5 w-5" />
                <span>{{ property.photos }} Photos</span>
              </div>
              <div class="flex items-center space-x-1 hover:scale-105 transition-transform">
                <img src="/icons/profile/visited-icon.svg" class="h-5 w-5" />
                <span>{{ property.visits }} Visites</span>
              </div>
              <div class="flex items-center space-x-1 hover:scale-105 transition-transform">
                <img src="/icons/profile/favorite-icon.svg" class="h-5 w-5" />
                <span>{{ property.interests }} Intéressés</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Property Details -->
      <div class="px-3 bg-white space-y-1">
        <h2 class="text-xl md:text-2xl font-bold text-[#005C53]  hover:text-emerald-600 transition-colors">
          {{ property.title }}
        </h2>

        <!-- Amenities -->
        <div class="flex flex-wrap md:flex-nowrap items-center gap-3">
          <div class="hidden md:block w-px h-4 bg-gray-300"></div>

          <div class="flex items-center space-x-1 hover:scale-105 transition-transform">
            <ToiletIcon class="h-4 w-4 text-[#005C53]" />
            <span class="font-medium text-xs text-[#005C53]">{{ property.bathrooms }} Douches</span>
          </div>
          <div class="hidden md:block w-px h-4 bg-gray-300"></div>
          <div class="flex items-center space-x-1 hover:scale-105 transition-transform">
            <HomeIcon class="h-4 w-4 text-[#005C53]" />
            <span class="font-medium text-xs text-[#005C53]">{{ property.bedrooms }} Chambres</span>
          </div>
          <div class="hidden md:block w-px h-4 bg-gray-300"></div>
          <div class="flex items-center space-x-1 hover:scale-105 transition-transform">
            <SquareIcon class="h-4 w-4 text-[#005C53]" />
            <span class="font-medium text-xs text-[#005C53]">{{ property.area }} M²</span>
          </div>
        </div>

        <!-- Location & Price -->
        <div class="flex lg:flex-row justify-between items-start md:items-center p-2 gap-2 w-full">
          <div class="flex items-center w-full group cursor-pointer">
            <img src="/icons/location-icon.svg" alt="location icon"
              class="h-4 w-4 text-[#005C53] font-extralight text-xs group-hover:text-emerald-600 transition-colors" />
            <span class="text-black w-full font-thin text-xs group-hover:text-emerald-600 transition-colors">
              {{ property.location }}</span>
          </div>
          <div class="text-[#A2C02D] font-bold text-end text-xs  hover:scale-105 transition-transform">
            {{ formatPrice(property.price) }} <span class="text-xs w- text-black font-extralight"> / Mois</span>
          </div>
        </div>
        <div class="justify-center pt-2  px-10">
          <div class="border-[#8DAD9D] border  "></div>
        </div>

        <!-- Agent Profile -->
        <div class="flex items-center border-gray-200 group cursor-pointer p-2">
          <div
            class="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center transform transition-transform group-hover:scale-110">
            <span class="text-[#005C53] font-bold text-sm">{{ getInitials(property.agent.name) }}</span>
          </div>

          <div class="ml-3">
            <div class="text-sm font-medium text-black group-hover:text-emerald-600 transition-colors">
              {{ property.agent.name }}
            </div>
            <div class="flex space-x-1">
              <StarIcon v-for="n in 5" :key="n" class="h-4 w-4 transition-all duration-300"
                :class="n <= property.agent.rating ? 'text-[#FFBB00] hover:text-yellow-500' : 'text-gray-300'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {

  StarIcon,
  HomeIcon,
} from '@heroicons/vue/24/solid'

import { Square2StackIcon as SquareIcon } from '@heroicons/vue/24/outline'
import { ToiletIcon } from 'lucide-vue-next'

const props = defineProps({
  property: {
    type: Object,
    default: () => ({
      imageUrl: '',
      status: 'indisponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    })
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' XAF'
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}


// Emit an event to parent component to update the property status
const emit = defineEmits(['update:status'])

// State for dropdown
const isStatusDropdownOpen = ref(false)

// Method to toggle dropdown
const toggleStatusDropdown = () => {
  isStatusDropdownOpen.value = !isStatusDropdownOpen.value
}

// Method to update status
const updateStatus = (newStatus) => {
  // Close dropdown
  isStatusDropdownOpen.value = false

  // Emit event to parent to update status
  emit('update:status', newStatus)
}

</script>

<style scoped>
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

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>