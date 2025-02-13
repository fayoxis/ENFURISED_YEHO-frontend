<template>
    <div class="container mx-auto px-4 py-8 bg-white min-h-screen">
      <!-- Header Section -->
      <div class="mb-8 text-start justify-start">
        <h1 class="text-5xl justify-start iterm-center  font-bold text-[#005C53] mb-2 animate-fade-in">
          Dossiers de Clients
        </h1>
        <p class="text-[#8DAD9D] text-start justify-start max-w-xl ">
          Explorez et filtrez les propriétés selon vos préférences
        </p>
      </div>
  
      <!-- Advanced Filter Section -->
      <div class="bg-white shadow-lg rounded-xl p-6 border-2 border-[#2FAC66]">
        <div class="grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0">
          <!-- Rooms Filter -->
          <div class="relative">
            <label class="block text-sm font-medium text-[#005C53] mb-2">
              Nombre de Chambres
            </label>
            <select 
              v-model="filters.rooms" 
              class="w-full px-4 py-2 border-2 border-[#2FAC66] rounded-md 
                     focus:ring-2 focus:ring-[#A2C02D] transition duration-300 
                     hover:border-[#A2C02D] cursor-pointer"
            >
              <option value="">Toutes les Chambres</option>
              <option 
                v-for="n in 5" 
                :key="`room-${n}`" 
                :value="n"
                class="hover:bg-[#D9F9E9]"
              >
                {{ n }} {{ n === 1 ? 'Chambre' : 'Chambres' }}
              </option>
            </select>
          </div>
  
          <!-- Price Range Filter -->
          <div class="relative">
            <label class="block text-sm font-medium text-[#005C53] mb-2">
              Gamme de Prix (XAF)
            </label>
            <select 
              v-model="filters.priceRange" 
              class="w-full px-4 py-2 border-2 border-[#2FAC66] rounded-md 
                     focus:ring-2 focus:ring-[#A2C02D] transition duration-300 
                     hover:border-[#A2C02D] cursor-pointer"
            >
              <option value="">Tous les Prix</option>
              <option value="0-50000">Moins de 50,000</option>
              <option value="50000-100000">50,000 - 100,000</option>
              <option value="100000+">Plus de 100,000</option>
            </select>
          </div>
  
          <!-- Features Filter -->
          <div class="relative">
            <label class="block text-sm font-medium text-[#005C53] mb-2">
              Caractéristiques
            </label>
            <select 
              v-model="filters.feature" 
              class="w-full px-4 py-2 border-2 border-[#2FAC66] rounded-md 
                     focus:ring-2 focus:ring-[#A2C02D] transition duration-300 
                     hover:border-[#A2C02D] cursor-pointer"
            >
              <option value="">Toutes les Caractéristiques</option>
              <option 
                v-for="feature in allFeatures" 
                :key="feature" 
                :value="feature"
                class="hover:bg-[#D9F9E9]"
              >
                {{ feature }}
              </option>
            </select>
          </div>
        </div>
  
        <!-- Applied Filters Display -->
        <div class="mt-4 flex flex-wrap gap-2" v-if="hasActiveFilters">
          <div 
            v-for="(value, key) in activeFilters" 
            :key="key"
            class="bg-[#2FAC66] text-white px-3 py-1 rounded-full text-sm flex items-center"
          >
            {{ formatFilterLabel(key, value) }}
            <button 
              @click="clearFilter(key)" 
              class="ml-2 text-white hover:text-[#F24405]"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
  
      <!-- Studios Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
        <DossierCard 
          v-for="studio in filteredStudios" 
          :key="studio.id" 
          :studioData="studio" 
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import DossierCard from './DossierCard.vue';
  
  const allFeatures = [
    'Parking', 'Veranda', 'Forage', 'Eau Chaude', 
    'Balcon', 'Jardin', 'Climatisation'
  ];
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomFeatures() {
    const numFeatures = getRandomInt(1, 4);
    const shuffled = allFeatures.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numFeatures);
  }
  
  // Use reactive object for filters
  const filters = ref({
    rooms: '',
    priceRange: '',
    feature: ''
  });
  
  // Computed property to check if any filters are active
  const hasActiveFilters = computed(() => {
    return Object.values(filters.value).some(filter => filter !== '');
  });
  
  // Computed property to get active filters
  const activeFilters = computed(() => {
    return Object.fromEntries(
      Object.entries(filters.value).filter(([_, value]) => value !== '')
    );
  });
  
  // Format filter label for display
  function formatFilterLabel(key, value) {
    const labels = {
      rooms: 'Chambres',
      priceRange: 'Prix',
      feature: 'Caractéristique'
    };
    return `${labels[key]}: ${value}`;
  }
  
  // Clear a specific filter
  function clearFilter(key) {
    filters.value[key] = '';
  }
  
  // Generate studio data
  function generateStudios(numStudios) {
    return Array.from({ length: numStudios }, (_, i) => {
      const openingDay = getRandomInt(1, 28);
      const openingMonth = getRandomInt(1, 12);
      const openingDate = new Date(2024, openingMonth - 1, openingDay);
  
      const deadlineDay = getRandomInt(openingDay + 1, openingDay + 10);
      const deadlineDate = new Date(2024, openingMonth - 1, deadlineDay);
  
      return {
        id: i + 1,
        title: `Studio ${i + 1}`,
        openingDate: `${(openingMonth).toString().padStart(2, '0')}-${openingDay.toString().padStart(2, '0')}-2024`,
        deadline: `${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}-${deadlineDate.getDate().toString().padStart(2, '0')}-2024`,
        rooms: getRandomInt(1, 20),
        bedrooms: getRandomInt(1, 12),
        bathrooms: getRandomInt(1, 5),
        budget: {
          min: getRandomInt(50000, 60000),
          max: getRandomInt(70000, 150000),
          currency: 'XAF'
        },
        location: 'Tsinga',
        features: getRandomFeatures()
      };
    });
  }
  
  const studios = ref(generateStudios(12));
  
  // Improved filtering logic
  const filteredStudios = computed(() => {
    return studios.value.filter(studio => {
      // Check rooms filter
      const roomsMatch = !filters.value.rooms || 
        studio.rooms === Number(filters.value.rooms);
      
      // Check price range filter
      const priceMatch = !filters.value.priceRange || (() => {
        const [min, max] = filters.value.priceRange.split('-').map(val => 
          val === '' ? Infinity : Number(val)
        );
        const studioPrice = studio.budget.min;
        
        return max === Infinity 
          ? studioPrice >= min 
          : studioPrice >= min && studioPrice <= max;
      })();
      
      // Check features filter
      const featureMatch = !filters.value.feature || 
        studio.features.includes(filters.value.feature);
  
      // Return true only if all active filters match
      return roomsMatch && priceMatch && featureMatch;
    });
  });
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  </style>