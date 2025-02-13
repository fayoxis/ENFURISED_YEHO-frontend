<template>
  <div class="relative shadow-lg rounded-2xl justify-center w-full">
    <!-- Mobile Filter Trigger -->
    <button @click="toggleFilter" class="lg:hidden md:hidden fixed top
      -0 right-1 z-50 bg-[#A2C02D] text-white rounded-lg p-2 shadow-lg" aria-label="Toggle Filters">Filter
      <i class="fas fa-sliders-h"></i>
    </button>

    <!-- Filter Panel -->
    <div :class="[
      'filter-panel transition-all duration-300 ease-in-out',
      'fixed md:relative rounded-2xl max-h-screen md:h-auto',
      ' w-full md:w-[350px] z-40',
      'transform',
      isMobileFilterOpen ? 'left-0 overflow-y-auto relative absolute' : 'translate-x-full md:translate-x-0'
    ]">
      <!-- Mobile Header -->
      <div class="md:hidden lg:hidden flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-semibold">Filtres</h2>
        <button @click="toggleFilter" class="text-gray-500">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Filter Content -->
      <div class="p-6 sm:overflow-y-auto md:overflow-y-hidden space-y-2 w-full justify-center max-h-screen">
        <!-- Property Type -->
        <section>
          <h3 class="text-md font-semibold text-gray-700 md:mb-1">Type d'Espace Désiré</h3>
          <div class="flex flex-wrap gap-2">
            <button v-for="type in propertyTypes" :key="type.id" @click="updateFilter('type', type.id)" :class="[
              'px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              filters.type === type.id
                ? 'bg-[#2FAC66] text-white'
                : 'bg-white text-[#8DAD9D] hover:bg-gray-200'
            ]">
              {{ type.name }}
            </button>
          </div>
        </section>

        <!-- Zone -->
        <section>
          <h3 class="text-xs font-semibold text-black">Zone Désirée</h3>
          <div class="relative">
            <img src="/icons/location-icon.svg" alt="location-icon" class="absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" v-model="filters.zone" placeholder="Sous-préfecture, Tsinga"
            class="w-full text-[#8DAD9D] pl-9 pr-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-[#A2C02D] focus:border-[#A2C02D] placeholder:text-[#8DAD9D] font-semibold placeholder:text-xs placeholder:text-right">            
            <div class="border border-black"></div>
          </div>
        </section>

        <!-- Keywords -->
        <section>
          <h3 class="text-xs font-semibold text-black ">Ajouter un mot Clé</h3>
          <div class="relative">
            <img src="/icons/search/Search.svg" alt="search-icon" class="absolute left-3 top-1/2 -translate-y-1/2">
            <input type="text" v-model="keyword" @keydown.enter="addKeyword" placeholder="Ajouter un mot clé"
            class="w-full text-[#8DAD9D] pl-9 pr-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-[#A2C02D] focus:border-[#A2C02D] placeholder:text-[#8DAD9D] font-semibold placeholder:text-xs placeholder:text-right">            
            <div class="border border-black"></div>

          </div>
          <div v-if="filters.keywords.length" class="flex flex-wrap gap-2">
            <span v-for="(word, index) in filters.keywords" :key="index"
              class="bg-gray-100 px-2 py-1 rounded-full text-xs flex items-center">
              {{ word }}
              <button @click="removeKeyword(index)" class="ml-1.5 text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
              </button>
            </span>
          </div>
        </section>

        <!-- Rooms -->
        <section class="">
          <h3 class="text-xs font-semibold text-black">Nombre de pièces</h3>
          <div class="relative px-2">
            <div class="relative mb-1 pt-5">
                  <!-- Base line -->
      <div class="absolute w-full rounded-full h-[2px] bg-[#8DAD9D] top-4"></div>
              <!-- Range line -->
              <div class="absolute rounded-3xl h-[6px] bg-[#A2C02D]" :style="{
                left: `${calculatePosition(filters.rooms[0], 1, 20)}%`,
                width: `${calculateRangeWidth(filters.rooms[0], filters.rooms[1], 1, 20)}%`,
                top: '1rem'
              }">
              </div>


              <input @input="handleRangeInput" type="range" v-model.number="filters.rooms[0]" min="1" max="20" step="1"
                class="room-range absolute w-full top-2">
              <input @input="handleRangeInput" type="range" v-model.number="filters.rooms[1]" :min="1" :max="20"
                step="1" class=" room-range absolute w-full top-2">
            </div>

            <div class="flex justify-between text-xs text-gray-500">
              <span class="component border-b-2 border-[#8DAD9D] text-[#8DAD9D]   w-10">{{ filters.rooms[0] }}</span>
              <span class="component border-b-2 border-[#8DAD9D] text-[#8DAD9D]  w-10 text-end ">{{ filters.rooms[1] }}</span>
            </div>
          </div>
        </section>

        <!-- Bedrooms & Bathrooms -->
        <section class=" w-full space-y-3 justify-center">
          <div class="flex space-x-5 items-center">
            <h3 class="text-md font-semibold text-black ">Chambres</h3>
            <div class="flex items-center gap-4 w-full justify-end">
              <button @click="updateCount('bedrooms', -1)" :disabled="filters.bedrooms <= 0" class="counter-button"><img
                  src="/icons/search/minus-icon.svg" alt="minus-icon" /></button>


              <span class="text-sm w-8 text-center text-[#8DAD9D] component border-b-2 border-[#8DAD9D] font-semibold border-b-[#8DAD9D]">{{ filters.bedrooms
                }}</span>
              <button @click="updateCount('bedrooms', 1)" :disabled="filters.bedrooms >= 10" class="counter-button"><img
                  src="/icons/search/plus-icon.svg" alt="plus-icon" /></button>
            </div>
          </div>

          <div class="flex space-x-5 items-center">
            <h3 class="text-md font-semibold text-black ">Douches</h3>
            <div class="flex items-center gap-4  justify-end w-full">
              <button @click="updateCount('bathrooms', -1)" :disabled="filters.bathrooms <= 0"
                class="counter-button"><img src="/icons/search/minus-icon.svg" alt="minus-icon" /></button>
              <span class="text-sm component border-b-2 border-[#8DAD9D] w-8 text-center text-[#8DAD9D] font-semibold border-b-[#8DAD9D]">{{ filters.bathrooms
                }}</span>
              <button @click="updateCount('bathrooms', 1)" :disabled="filters.bathrooms >= 10"
                class="counter-button"><img src="/icons/search/plus-icon.svg" alt="plus-icon" /></button>
            </div>
          </div>
        </section>

        <!-- Price Range -->
        <section class="">
          <h3 class="text-xs font-medium text-gray-700">Gamme de prix</h3>
          <div class="relative px-2">
            <div class="relative mb-1 pt-5">
              <!-- baseline -->
              <div class="absolute w-full rounded-full h-[2px] bg-[#8DAD9D] top-4"></div>

              <!-- Range line -->
              <div class="absolute h-[6px] rounded-full bg-[#A2C02D]" :style="{
                left: `${calculatePosition(filters.priceRange[0], 15000, 100000)}%`,
                width: `${calculateRangeWidth(filters.priceRange[0], filters.priceRange[1], 15000, 100000)}%`,
                top: '1rem'
              }">
              </div>
              <input @input="handlePriceRangeInput" type="range" v-model.number="filters.priceRange[0]" :min="15000"
                :max="100000" step="1000" class="price-range absolute w-full top-2">
              <input @input="handlePriceRangeInput" type="range" v-model.number="filters.priceRange[1]" :min="15000"
                :max="100000" step="1000" class="price-range absolute w-full top-2">
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span class="component border-b-2 border-[#8DAD9D] text-[#8DAD9D] ">{{ formatPrice(filters.priceRange[0]) }}</span>
              <span class="component border-b-2 border-[#8DAD9D] text-[#8DAD9D] ">{{ formatPrice(filters.priceRange[1]) }}</span>
            </div>
          </div>

        </section>

        <!-- Amenities -->
        <section>
          <div class="flex flex-wrap gap-1 mt-3">
            <button v-for="amenity in amenities" :key="amenity.id" @click="toggleAmenity(amenity.id)" :class="[
              'px-2 py-1.5 rounded-full text-xs transition-colors',
              filters.amenities.includes(amenity.id)
                ? 'bg-[#A2C02D] text-black font-semibold border border-black'
                : 'bg-white text-[#8DAD9D] font-semibold hover:bg-gray-200 border border-[#8DAD9D]'
            ]">
              <i :class="getAmenityIcon(amenity.id)" class="mr-1.5"></i>
              {{ amenity.name }}
            </button>
          </div>
        </section>

        <!-- Apply Filters Button -->
        <button @click="applyFilters"
          class="w-full bg-[#D9F9E9] text-[#005C53] py-2.5 rounded-lg text-sm font-medium hover:bg-[#D9F9E9]/60 hover:shadow-xl hover:border border-[#005C53]  transition-colors">
          Filtrer Ma Recherche
        </button>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div v-if="isMobileFilterOpen" class="lg:hidden fixed inset-0 bg-white  z-30" @click="toggleFilter"></div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

// State
const isMobileFilterOpen = ref(false)
const keyword = ref('')
const filters = reactive({
  type: 'domestic',
  zone: '',
  keywords: [],
  rooms: [1, 20],
  bedrooms: 0,
  bathrooms: 0,
  priceRange: [15000, 100000],
  amenities: []
})

//

const handleRangeInput = (event) => {
  const value = parseInt(event.target.value)
  const index = event.target === event.target.parentElement.children[0] ? 0 : 1

  // Prevent thumbs from crossing
  if (index === 0 && value >= rooms.value[1]) {
    rooms.value[0] = rooms.value[1] - 1
  } else if (index === 1 && value <= rooms.value[0]) {
    rooms.value[1] = rooms.value[0] + 1
  } else {
    rooms.value[index] = value
  }
}

const handlePriceRangeInput = (event, index) => {
  const value = parseInt(event.target.value)
  const newRange = [...filters.priceRange]

  // Prevent overlapping of thumbs
  if (index === 0 && value < newRange[1]) {
    newRange[0] = value
  } else if (index === 1 && value > newRange[0]) {
    // Allow range to expand if at max
    if (value >= Math.max(100000, newRange[1])) {
      newRange[1] = value + 1000
    } else {
      newRange[1] = value
    }
  }
}

const updateRangeSliderAppearance = (type) => {
  const range = type === 'room' ? filters.rooms : filters.priceRange
  const min = type === 'room' ? 1 : 15000
  const max = type === 'room' ? Math.max(20, range[1]) : Math.max(100000, range[1])

  const percentStart = ((range[0] - min) / (max - min)) * 100
  const percentEnd = ((range[1] - min) / (max - min)) * 100

  const sliders = document.querySelectorAll(`.${type}-range-track`)
  sliders.forEach(slider => {
    slider.style.background = `linear-gradient(to right, 
      #E5E7EB 0%, 
      #E5E7EB ${percentStart}%, 
      #A2C02D ${percentStart}%, 
      #A2C02D ${percentEnd}%, 
      #E5E7EB ${percentEnd}%, 
      #E5E7EB 100%)`
  })
}

onMounted(() => {
  updateRangeSliderAppearance('room')
  updateRangeSliderAppearance('price')
})

const calculatePosition = (value, min, max) => {
  return ((value - min) / (max - min)) * 100
}

const calculateRangeWidth = (start, end, min, max) => {
  return ((end - start) / (max - min)) * 100
}
//

// Constants
const propertyTypes = [
  { id: 'domestic', name: 'Domestique' },
  { id: 'professional', name: 'Professionel' },
  { id: 'event', name: 'Evenementiel' },
  { id: 'temporary', name: 'Temporaire' }
]

const amenities = [
  { id: 'parking', name: 'Parking' },
  { id: 'residential', name: 'Residentiel' },
  { id: 'barrier', name: 'Barrière' },
  { id: 'terrace', name: 'Terrasse' },
  { id: 'guard', name: 'Gardien' },
  { id: 'drilling', name: 'Forage' }
]

// Methods
const toggleFilter = () => {
  isMobileFilterOpen.value = !isMobileFilterOpen.value
  if (isMobileFilterOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const updateFilter = (key, value) => {
  filters[key] = value
}

const addKeyword = () => {
  const trimmedKeyword = keyword.value.trim()
  if (trimmedKeyword && !filters.keywords.includes(trimmedKeyword)) {
    filters.keywords.push(trimmedKeyword)
    keyword.value = ''
  }
}

const removeKeyword = (index) => {
  filters.keywords.splice(index, 1)
}

const updateCount = (type, change) => {
  const newValue = filters[type] + change
  if (newValue >= 0 && newValue <= 10) {
    filters[type] = newValue
  }
}

const toggleAmenity = (amenityId) => {
  const index = filters.amenities.indexOf(amenityId)
  if (index === -1) {
    filters.amenities.push(amenityId)
  } else {
    filters.amenities.splice(index, 1)
  }
}

const getAmenityIcon = (id) => {
  const icons = {
    parking: 'fas fa-parking',
    residential: 'fas fa-home',
    barrier: 'fas fa-door-closed',
    terrace: 'fas fa-umbrella-beach',
    guard: 'fas fa-user-shield',
    drilling: 'fas fa-tint'
  }
  return icons[id] || 'fas fa-check'
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' XAF'
}

const applyFilters = () => {
  emit('update:filters', { ...filters })
  if (isMobileFilterOpen.value) {
    toggleFilter()
  }
}

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['update:filters'])

// Cleanup
watch(isMobileFilterOpen, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : ''
})
</script>

<style scoped>
.filter-panel {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.filter-panel {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  -webkit-overflow-scrolling: touch;
  /* For smooth scrolling on iOS */
}

@media (max-width: 768px) {
  .filter-panel {
    height: 70vh;
    top: 5;
    position: fixed;
    background: white;
  }
}

/* // */

.room-range {
  @apply appearance-none bg-transparent;
  pointer-events: none;
}

.room-range::-webkit-slider-thumb {
  @apply appearance-none w-5 h-5 rounded-full bg-[#D9F9E9] cursor-pointer;
  border: 1.5px solid #005C53;
  pointer-events: auto;

}

.price-range::-moz-range-thumb,
.room-range::-moz-range-thumb {
  @apply w-5 h-5 rounded-full bg-white cursor-pointer;
  border: 1.5px solid #005C53;
  pointer-events: auto;

}

/* Hide default track */
.room-range::-webkit-slider-runnable-track {
  @apply appearance-none bg-transparent border-none h-1;
}

.room-range::-moz-range-track {
  @apply bg-transparent border-none h-1;
}

/* Remove focus styles */
.room-range:focus {
  @apply appearance-none bg-transparent;
  pointer-events: none;
}


.price-range {
  @apply appearance-none bg-transparent border-none h-1;
}


.price-range::-webkit-slider-thumb {
  @apply appearance-none w-5 h-5 rounded-full bg-[#D9F9E9] cursor-pointer;
  border: 1.5px solid #005C53;
  pointer-events: auto;

}

.price-range::-moz-range-thumb {
  @apply w-5 h-5 rounded-full bg-[#D9F9E9] cursor-pointer;
  border: 1.5px solid #005C53;
  pointer-events: auto;

}

/* Hide default track */

.price-range::-webkit-slider-runnable-track {
  @apply appearance-none bg-transparent border-none h-1;
}

.price-range::-moz-range-track {
  @apply bg-transparent border-none h-1;
}


/* Remove focus styles */
.price-range:focus {
  @apply appearance-none bg-transparent;
  pointer-events: none;
}

/*  */
</style>