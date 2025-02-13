<template>
  <div class="bg-white rounded-xl shadow-lg p-5 w-full">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-[#005C53]">Recommended Properties</h2>
        <p class="text-sm text-gray-500 mt-1">Based on your interests</p>
      </div>
      <div class="flex space-x-2">
        <button @click="scroll('left')" 
                class="p-2 text-[#005C53] hover:bg-gray-100 rounded-full transition-colors">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button @click="scroll('right')" 
                class="p-2 text-[#005C53] hover:bg-gray-100 rounded-full transition-colors">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Scrollable Container -->
    <div class="relative w-full overflow-x-auto hide-scrollbar"
         ref="scrollContainer"
         @mouseenter="stopAutoScroll"
         @mouseleave="startAutoScroll">
      <div ref="scrollContent" 
           class="flex gap-4 w-max transition-transform duration-300 ease-out">
        <div v-for="property in allProperties" 
             :key="property.id"
             class="w-64 bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex-shrink-0">
          <!-- Property Card -->
          <div class="relative h-36 overflow-hidden group">
            <img :src="property.image" 
                 :alt="property.title"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            
            <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-sm">
              <span class="font-semibold text-[#005C53]">{{ formatPrice(property.price) }}</span>
            </div>

            <div class="absolute bottom-2 left-2">
              <span :class="`px-2 py-0.5 rounded-full text-xs font-medium ${
                property.status === 'For Sale' ? 'bg-[#F24405] text-white' : 
                'bg-[#A2C02D] text-white'
              }`">
                {{ property.status }}
              </span>
            </div>
          </div>

          <div class="p-3">
            <h3 class="font-medium text-[#005C53] mb-1 text-sm truncate">{{ property.title }}</h3>
            <p class="text-xs text-gray-500 mb-2">{{ property.location }}</p>
            
            <div class="flex items-center space-x-3 text-xs text-gray-600 mb-3">
              <div class="flex items-center">
                <i class="fas fa-bed mr-1 text-[#8DAD9D]"></i>
                {{ property.beds }}
              </div>
              <div class="flex items-center">
                <i class="fas fa-bath mr-1 text-[#8DAD9D]"></i>
                {{ property.baths }}
              </div>
              <div class="flex items-center">
                <i class="fas fa-ruler-combined mr-1 text-[#8DAD9D]"></i>
                {{ property.sqft }}
              </div>
            </div>

            <div class="flex space-x-2">
              <button @click="saveProperty(property.id)" 
                      class="flex-1 bg-[#8DAD9D] hover:bg-[#A2C02D] text-white px-2 py-1.5 rounded-lg transition-colors duration-300 text-xs flex items-center justify-center">
                <i class="far fa-bookmark mr-1"></i>
                Save
              </button>
              <button @click="viewProperty(property.id)" 
                      class="flex-1 bg-[#F24405] hover:bg-[#A2C02D] text-white px-2 py-1.5 rounded-lg transition-colors duration-300 text-xs flex items-center justify-center">
                <i class="far fa-eye mr-1"></i>
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollContainer = ref(null)
const scrollContent = ref(null)
const scrollInterval = ref(null)
const currentScroll = ref(0)
const scrollDirection = ref(1)

const baseProperties = [
  {
    id: 1,
    title: 'Modern Apartment with Ocean View',
    price: 450000,
    status: 'For Sale',
    image: '/images/home/hero/hero1.jpg',
    beds: 3,
    baths: 2,
    sqft: '1,200 sqft',
    location: 'Miami Beach, FL'
  },
  {
    id: 2,
    title: 'Luxury Downtown Condo',
    price: 2800,
    status: 'For Rent',
    image: '/images/home/hero/hero2.jpg',
    beds: 2,
    baths: 2,
    sqft: '1,100 sqft',
    location: 'Downtown, LA'
  },
  {
    id: 3,
    title: 'Spacious Family Home',
    price: 685000,
    status: 'For Sale',
    image: '/images/home/hero/hero3.jpg',
    beds: 4,
    baths: 3,
    sqft: '2,200 sqft',
    location: 'Brooklyn, NY'
  }
]

// Create duplicated properties with new IDs
const allProperties = computed(() => {
  const duplicated = []
  for (let i = 0; i < 3; i++) {
    baseProperties.forEach((prop, index) => {
      duplicated.push({
        ...prop,
        id: prop.id + (baseProperties.length * i)
      })
    })
  }
  return duplicated
})

const formatPrice = (price) => {
  return price >= 10000 
    ? `$${(price/1000).toFixed(0)}K` 
    : `$${price.toLocaleString()}`
}

const startAutoScroll = () => {
  if (scrollInterval.value) return
  
  scrollInterval.value = setInterval(() => {
    const container = scrollContainer.value
    if (!container) return

    currentScroll.value += 1 * scrollDirection.value
    container.scrollLeft = currentScroll.value

    // Reset scroll when reaching the end or start
    if (currentScroll.value >= container.scrollWidth - container.clientWidth) {
      currentScroll.value = 0
      container.scrollLeft = 0
    }
  }, 30)
}

const stopAutoScroll = () => {
  if (scrollInterval.value) {
    clearInterval(scrollInterval.value)
    scrollInterval.value = null
  }
}

const scroll = (direction) => {
  const container = scrollContainer.value
  if (!container) return
  
  const scrollAmount = 300
  const newScroll = direction === 'left' 
    ? container.scrollLeft - scrollAmount 
    : container.scrollLeft + scrollAmount
    
  container.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  })
}

const saveProperty = (propertyId) => {
  console.log(`Saving property ${propertyId}`)
}

const viewProperty = (propertyId) => {
  router.push(`/property/${propertyId}`)
}

onMounted(() => {
  startAutoScroll()
})

onUnmounted(() => {
  stopAutoScroll()
})
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Add smooth scroll behavior */
.scroll-container {
  scroll-behavior: smooth;
}
</style>