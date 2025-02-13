<template>
  <div class="promotions-container w-full px-4 justify-center bg-white hover:shadow-lg overflow-hidden">
    <!-- Promotions Header -->
    <div class="bg-[#005C53] text-white p-4 rounded-t-lg">
      <h2 class="text-xl font-bold flex items-center justify-between">
        <div class="flex items-center">
          <i class="fas fa-gift mr-2"></i>
          Special Offers
        </div>
        <div class="flex gap-2">
          <button @click="scrollLeft" class="p-2 hover:bg-[#004a43] rounded-full transition-colors">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button @click="scrollRight" class="p-2 hover:bg-[#004a43] rounded-full transition-colors">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </h2>
    </div>

    <!-- Scrollable Promotions -->
    <div class="relative w-full overflow-x-auto custom-scrollbar" ref="scrollContainer">
      <div 
        class="flex transition-transform duration-[20000ms] ease-linear"
        :style="{ transform: `translateX(${-currentPosition}px)` }"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
      >
        <div 
          v-for="(promo, index) in [...promotions, ...promotions]"
          :key="`${index}-${promo.id}`"
          class="min-w-[300px] md:min-w-[350px] px-4 py-3 hover:bg-gray-50"
        >
          <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:border-[#005C53] transition-all duration-300">
            <!-- Promotion Badge -->
            <div class="flex items-center justify-between mb-2">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="promo.badgeColor"
              >
                <i :class="promo.icon + ' mr-1'"></i>
                {{ promo.badge }}
              </span>
              <span 
                class="text-sm text-gray-500 flex items-center"
                :class="{'text-red-500': isExpiringSoon(promo.validity)}"
              >
                <i class="far fa-clock mr-1"></i>
                {{ promo.validity }}
              </span>
            </div>

            <!-- Promotion Title -->
            <h3 class="text-lg font-semibold text-[#005C53] mb-2">
              {{ promo.title }}
            </h3>

            <!-- Promotion Description -->
            <p class="text-sm text-gray-600 mb-3">
              {{ promo.description }}
            </p>

            <!-- Promotion CTA -->
            <div class="flex items-center justify-between">
              <span class="text-[#F24405] font-bold flex items-center">
                <i class="fas fa-tag mr-1"></i>
                {{ promo.discount }}
              </span>
              <button 
                @click="handleClaimOffer(promo)"
                class="px-4 py-2 bg-[#005C53] text-white rounded-lg hover:bg-[#004a43] transition-all duration-200 text-sm flex items-center"
              >
                Claim Now
                <i class="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentPosition = ref(0)
const scrollInterval = ref(null)
const containerWidth = ref(0)
const scrollContainer = ref(null)
const scrollAmount = 2 // Increased scroll speed

const promotions = [
  {
    id: 1,
    badge: 'Limited Time',
    badgeColor: 'bg-red-100 text-red-800',
    icon: 'fas fa-clock',
    title: '20% Off First Listing',
    description: 'List your property today and get 20% off on your first listing fee!',
    discount: 'Save 20%',
    validity: 'Ends in 2 days',
    link: '/offers/first-listing'
  },
  {
    id: 2,
    badge: 'Premium',
    badgeColor: 'bg-purple-100 text-purple-800',
    icon: 'fas fa-crown',
    title: 'Free Photo Session',
    description: 'Professional photography session included with premium listings',
    discount: 'Worth $299',
    validity: 'This week only',
    link: '/offers/photo-session'
  },
  {
    id: 3,
    badge: 'New Users',
    badgeColor: 'bg-green-100 text-green-800',
    icon: 'fas fa-user-plus',
    title: 'Featured Placement',
    description: 'Get 30 days of featured placement for new registrations',
    discount: 'Free Upgrade',
    validity: 'New users only',
    link: '/offers/featured'
  },
  {
    id: 4,
    badge: 'Hot Deal',
    badgeColor: 'bg-orange-100 text-orange-800',
    icon: 'fas fa-fire',
    title: 'Bundle & Save',
    description: 'List 3 properties and get the 4th listing free!',
    discount: 'Save $499',
    validity: 'Limited slots',
    link: '/offers/bundle'
  }
]

const startScroll = () => {
  scrollInterval.value = setInterval(() => {
    currentPosition.value += scrollAmount
    if (currentPosition.value >= containerWidth.value * promotions.length) {
      currentPosition.value = 0
    }
  }, 30) // Decreased interval for faster scrolling
}

const pauseScroll = () => {
  if (scrollInterval.value) {
    clearInterval(scrollInterval.value)
  }
}

const resumeScroll = () => {
  startScroll()
}

const scrollLeft = () => {
  currentPosition.value = Math.max(0, currentPosition.value - 350)
}

const scrollRight = () => {
  currentPosition.value = Math.min(
    containerWidth.value * promotions.length,
    currentPosition.value + 350
  )
}

const handleClaimOffer = (promo) => {
  // You can implement your own logic here
  console.log(`Claiming offer: ${promo.title}`)
  // Example: Navigate to offer page
  if (promo.link) {
    window.location.href = promo.link
  }
}

const isExpiringSoon = (validity) => {
  return validity.includes('2 days') || validity.includes('Today')
}

onMounted(() => {
  containerWidth.value = document.querySelector('.promotions-container').offsetWidth
  startScroll()
})

onBeforeUnmount(() => {
  if (scrollInterval.value) {
    clearInterval(scrollInterval.value)
  }
})
</script>

<style scoped>
.promotions-container {
  max-width: 1200px;
  margin: 0 auto;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #005C53 #e2e8f0;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #005C53;
  border-radius: 3px;
}

@media (max-width: 640px) {
  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
</style>