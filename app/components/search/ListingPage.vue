<template>
  <div class="min-h-screen bg-white">
    <div class="container md:m-0 md:p-0 lg:mx-auto lg:px-5 py-5 w-full">

      <div class="flex flex-col md:flex-row gap-4 w-full">
        <!-- Filter Sidebar -->
        <div class="lg:w-1/3 ">
          <div class="lg:sticky sm:absolute justify-center top-3 px-5 rounded-2xl ">
            <Filter v-model:filters="filters" @update:filters="handleRealTimeUpdate" />
          </div>
        </div>

        <!-- Properties Listing -->
        <div class="lg:w-3/4 md:w-1/2">
          <!-- before filtered -->
          <div v-if="!hasActiveFilters" class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div class="flex lg:flex-row flex-col justify-between items-center gap-4 w-full">
              <div class="flex-row">
                <div class="lg:flex items-center gap-5">
                  <div>
                    <span class="lg:text-7xl text-5xl lg:font-black font-bold text-[#A2C02D]">{{
                      filteredProperties.length }}+</span>
                  </div>
                  <div>
                    <span class="text-black text-5xl lg:font-black font-bold lg:text-7xl">choissi pour vous</span>
                  </div>
                </div>
                <h2 class="font-semibold text-xs  lg:font-bold">
                  Trouvez la propriété idéale qui correspond à vos besoins ! Parcourez notre sélection de propriétés
                  disponibles et affinez vos critères pour un choix parfait.
                </h2>
              </div>
            </div>
          </div>
          <!-- Results Header -->
          <div v-else class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div class="flex lg:flex-row flex-col justify-between items-center gap-4 w-full">
              <div class="flex-row">
                <div class="lg:flex items-center gap-5">
                  <div>
                    <span class="lg:text-7xl text-4xl lg:font-black font-bold text-[#A2C02D]">{{
                      filteredProperties.length }}</span>
                  </div>
                  <div>
                    <spa class="text-black text-4xl lg:font-black font-bold lg:text-7xl">RESULTATS</spa>
                  </div>
                </div>
                <h2 class="font-semibold text-lg lg:text-xl lg:font-bold">
                  CORRESPONDANTS A VOTRE RECHERCHE
                </h2>
              </div>

              <div class="flex items-center gap-3">
                <label class="text-sm text-gray-600">Trier par:</label>
                <select v-model="sortOption"
                  class="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-[#A2C02D] focus:border-transparent transition-all">
                  <option value="price-asc">Prix (croissant)</option>
                  <option value="price-desc">Prix (décroissant)</option>
                  <option value="newest">Plus récent</option>
                  <option value="oldest">Plus ancien</option>
                </select>
              </div>
            </div>

            <!-- Active Filters -->
            <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
              <div v-for="(filter, index) in activeFilterTags" :key="index"
                class="inline-flex items-center gap-1 px-3 py-1 bg-[#A2C02D]/10 text-[#A2C02D] rounded-full text-sm">
                <span>{{ filter.label }}</span>
                <button @click="removeFilter(filter.type, filter.value)" class="hover:text-[#91ab28] transition-colors">
                  <i class="fas fa-times"></i>
                </button>
              </div>

              <button @click="resetFilters" class="text-sm text-gray-500 hover:text-gray-700 underline">
                Réinitialiser tous les filtres
              </button>
            </div>
          </div>

          <!-- Properties Grid -->
          <div class="grid grid-cols-1 overflow-x-auto lg:grid-cols-3  gap-5 "
            :class="{ 'opacity-50 pointer-events-none': loading }">
            <TransitionGroup name="property-list" tag="div" class="contents">
              <template v-if="loading">
                <PropertySkeleton v-for="n in 6" :key="`skeleton-${n}`" />
              </template>

              <template v-else-if="displayedProperties.length">
                <PropertyCard v-for="property in displayedProperties" :key="property.id" :property="property"
                  class="property-item" />
              </template>

              <div v-if="!loading && !displayedProperties.length" class="col-span-full">
                <div class="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
                  <p class="text-gray-600">Essayez d'ajuster vos filtres pour voir plus de propriétés</p>
                </div>
              </div>
            </TransitionGroup>
          </div>


          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-8 flex overflow-x-auto justify-center gap-2">
            <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
              'px-4 py-2 rounded-lg transition-all',
              currentPage === page
                ? 'bg-[#A2C02D] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            ]">
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <PropertySection />
    <EventVenueSection />

  </div>
</template>

<!-- 
           <div v-if="totalPages > 1" class="mt-8 flex justify-center gap-2">
            <div v-for="page in totalPages" :key="page" @click="changePage(page)" class="items-center">
              <div v-if="page>10 && page / totalPages > 0.35 && page / totalPages < 0.75" class="text-blue-300 rounded-full">
                <i class="fas fa-circle "></i>
              </div>
              <div v-else>
                <button  @click="changePage(page)" :class="[
              'px-4 py-2 rounded-lg transition-all',
              currentPage === page
                ? 'bg-[#A2C02D] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            ]">
                {{ page }}
              </button>
              </div>
            </div>
          -->


<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { TransitionGroup } from 'vue'
import Filter from './Filter.vue'
import PropertyCard from '../properties/PropertyCard.vue'
import PropertySkeleton from './PropertySkeleton.vue'
import PropertySection from '../home/PropertySection.vue'
import EventVenueSection from '../home/EventVenueSection.vue'

// Constants
const ITEMS_PER_PAGE = 9
const DEFAULT_FILTERS = {
  type: '',
  zone: '',
  keywords: [],
  rooms: [1, 20],
  bedrooms: 1,
  bathrooms: 1,
  priceRange: [15000, 100000],
  amenities: []
}

// State
const loading = ref(false)
const properties = ref([])
const currentPage = ref(1)
const sortOption = ref('newest')
const filters = ref({ ...DEFAULT_FILTERS })
const debounceTimeout = ref(null)


// Computed Properties
const filteredProperties = computed(() => {
  return properties.value.filter(property => {
    if (filters.value.type && property.type !== filters.value.type) return false

    if (filters.value.zone && !property.location.toLowerCase().includes(filters.value.zone.toLowerCase())) return false

    if (filters.value.keywords.length && !filters.value.keywords.some(keyword =>
      property.title.toLowerCase().includes(keyword.toLowerCase()) ||
      property.location.toLowerCase().includes(keyword.toLowerCase())
    )) return false

    if (property.rooms < filters.value.rooms) return false
    if (property.bedrooms < filters.value.bedrooms) return false
    if (property.bathrooms < filters.value.bathrooms) return false

    if (property.price < filters.value.priceRange[0] || property.price > filters.value.priceRange[1]) return false

    if (filters.value.amenities.length && !filters.value.amenities.every(amenity =>
      property.amenities.includes(amenity)
    )) return false

    return true
  })
})

const sortedProperties = computed(() => {
  return [...filteredProperties.value].sort((a, b) => {
    switch (sortOption.value) {
      case 'price-asc': return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
      default: return 0
    }
  })
})

const displayedProperties = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return sortedProperties.value.slice(start, start + ITEMS_PER_PAGE)
})

const totalPages = computed(() =>
  Math.ceil(sortedProperties.value.length / ITEMS_PER_PAGE)
)

const hasActiveFilters = computed(() => {
  return filters.value.type ||
    filters.value.zone ||
    filters.value.keywords.length > 0 ||
    filters.value.rooms[0] > 1 || filters.value.rooms[1] < 20 ||
    filters.value.bedrooms > DEFAULT_FILTERS.bedrooms ||
    filters.value.bathrooms > DEFAULT_FILTERS.bathrooms ||
    filters.value.amenities.length > 0 ||
    filters.value.priceRange[0] > DEFAULT_FILTERS.priceRange[0] ||
    filters.value.priceRange[1] < DEFAULT_FILTERS.priceRange[1];
});

const activeFilterTags = computed(() => {
  const tags = [];

  if (filters.value.type) {
    tags.push({
      type: 'type',
      value: filters.value.type,
      label: `Type: ${filters.value.type.charAt(0).toUpperCase() + filters.value.type.slice(1)}`
    });
  }

  if (filters.value.zone) {
    tags.push({
      type: 'zone',
      value: filters.value.zone,
      label: `Zone: ${filters.value.zone}`
    });
  }

  filters.value.keywords.forEach(keyword => {
    tags.push({
      type: 'keyword',
      value: keyword,
      label: `Mot clé: ${keyword}`
    });
  });

  if (filters.value.rooms[0] > 1 || filters.value.rooms[1] < 20) {
    tags.push({
      type: 'rooms',
      value: filters.value.rooms,
      label: `${filters.value.rooms[0]}-${filters.value.rooms[1]} pièces min.`
    });
  }

  if (filters.value.priceRange[0] > DEFAULT_FILTERS.priceRange[0] || filters.value.priceRange[1] < DEFAULT_FILTERS.priceRange[1]) {
    tags.push({
      type: 'price',
      value: filters.value.priceRange,
      label: `${filters.value.priceRange[0]}-${filters.value.priceRange[1]} XAF min.`
    });
  }

  filters.value.amenities.forEach(amenity => {
    tags.push({
      type: 'amenity',
      value: amenity,
      label: amenity.charAt(0).toUpperCase() + amenity.slice(1)
    });
  });

  return tags;
});


// Methods
const handleRealTimeUpdate = (newFilters) => {
  if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

  debounceTimeout.value = setTimeout(() => {
    filters.value = { ...newFilters }
    currentPage.value = 1
  }, 300)
}

const removeFilter = (type, value) => {
  if (type === 'keyword') {
    filters.value.keywords = filters.value.keywords.filter(k => k !== value)
  } else if (type === 'amenity') {
    filters.value.amenities = filters.value.amenities.filter(a => a !== value)
  } else {
    filters.value[type] = DEFAULT_FILTERS[type]
  }
}

const resetFilters = () => {
  filters.value = { ...DEFAULT_FILTERS }
}

// Mock Data Generation
const generateMockProperties = () => {
  return Array.from({ length: 300 }, (_, index) => ({
    id: index + 1,
    title: `Appartement Moderne ${index + 1}`,
    price: Math.floor(Math.random() * (68000 - 15000) + 15000),
    period: 'mois',
    location: ['Tsinga', 'Bastos', 'Mvan', 'Ngousso'][Math.floor(Math.random() * 4)] + ', Yaoundé',
    bedrooms: Math.floor(Math.random() * 5) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    rooms: Math.floor(Math.random() * 8) + 1,
    area: Math.floor(Math.random() * 150) + 50,
    type: ['domestic', 'professional', 'event', 'temporary'][Math.floor(Math.random() * 4)],
    amenities: ['parking', 'residential', 'barrier', 'terrace', 'guard', 'drilling']
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 6)),
    image: `/images/home/hotels.jpg`,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
  }))
}

// Fetch properties with filter parameters
const fetchProperties = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    properties.value = generateMockProperties()
  } catch (error) {
    console.error('Error fetching properties:', error)
  } finally {
    loading.value = false
  }
}

// Watchers
watch([sortOption], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  fetchProperties()
})
</script>

<style scoped>
.property-list-enter-active,
.property-list-leave-active {
  transition: all 0.3s ease;
}

.property-list-enter-from,
.property-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.property-item {
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .property-item {
    transform: none !important;
  }
}
</style>