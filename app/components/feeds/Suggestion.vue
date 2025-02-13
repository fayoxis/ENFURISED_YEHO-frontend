<template>
  <div class="bg-white rounded-xl shadow-lg p-5 w-full max-w-sm">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-[#005C53]">Suggested Agents</h2>
        <p class="text-sm text-gray-500 mt-1">Top professionals in your area</p>
      </div>
      <div class="bg-[#005C53]/10 px-3 py-1 rounded-full">
        <span class="text-sm font-medium text-[#005C53]">{{ suggestions.length }} Available</span>
      </div>
    </div>

    <!-- Suggestions List -->
    <div class="space-y-4">
      <div v-for="suggestion in suggestions" 
           :key="suggestion.id"
           class="group relative bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-white hover:shadow-md">
        
        <!-- Agent Info -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <img :src="suggestion.avatar" 
                   :alt="suggestion.name"
                   class="w-12 h-12 rounded-full object-cover border-2 border-[#A2C02D] transition-transform duration-300 group-hover:scale-105" />
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 class="font-semibold text-[#005C53] group-hover:text-[#A2C02D] transition-colors duration-300">
                {{ suggestion.name }}
              </h3>
              <div class="flex items-center space-x-1 mt-0.5">
                <div class="flex">
                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                  <i class="fas fa-star text-gray-300 text-xs"></i>
                </div>
                <span class="text-xs text-gray-500">4.8</span>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="hidden group-hover:block animate-fadeIn">
            <div class="flex items-center space-x-3 text-xs text-gray-500">
              <div class="flex items-center">
                <i class="fas fa-home mr-1 text-[#8DAD9D]"></i>
                <span>24 listings</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-users mr-1 text-[#8DAD9D]"></i>
                <span>142 clients</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-2 mt-2">
          <button
            @click="followUser(suggestion.id, 'Suivre')"
            class="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#005C53] rounded-lg hover:bg-[#A2C02D] transition-all duration-300 hover:shadow-md"
          >
            <i class="fas fa-user-plus mr-2"></i>
            {{ suggestion.keep }}
          </button>
          <button
            @click="followUser(suggestion.id, 'Contact')"
            class="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-[#A2C02D] transition-all duration-300 hover:shadow-md"
          >
            <i class="fas fa-envelope mr-2"></i>
            {{ suggestion.action }}
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-6 pt-4 border-t border-gray-100">
      <button class="w-full text-center text-sm text-[#005C53] hover:text-[#A2C02D] transition-colors duration-300">
        View All Suggested Agents
        <i class="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const suggestions = [
  { 
    id: 1, 
    name: 'Nick Shelburne', 
    avatar: '/images/profile.png', 
    action: 'Contact', 
    keep: 'Suivre'
  },
  { 
    id: 2, 
    name: 'Brittni Lande', 
    avatar: '/images/profile.png', 
    action: 'Contact', 
    keep: 'Suivre'
  },
  { 
    id: 3, 
    name: 'Ivan Shevchenko', 
    avatar: '/images/profile.png', 
    action: 'Contact', 
    keep: 'Suivre'
  },
  { 
    id: 4, 
    name: 'Joyceline Akamba', 
    avatar: '/images/profile.png', 
    action: 'Contact', 
    keep: 'Suivre'
  },
  { 
    id: 5, 
    name: 'Sam Atanga', 
    avatar: '/images/profile.png', 
    action: 'Contact', 
    keep: 'Suivre'
  }
]

const followUser = (id, actionType) => {
  console.log(`Follow user with id: ${id} - Action: ${actionType}`)
  // Implement follow logic here
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>