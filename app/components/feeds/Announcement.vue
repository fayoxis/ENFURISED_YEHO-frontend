<!-- components/feeds/Announcement.vue -->
<template>
    <div class="w-full max-w-sm">
      <!-- Main Promo Card -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-4">
        <div class="relative h-32">
          <div class="absolute inset-0 bg-gradient-to-r from-[#8DAD9D] to-[#005C53]"></div>
          <div class="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000,#000_1px,transparent_1px,transparent_10px)]"></div>
          <div class="relative p-4 text-white">
            <h2 class="text-xl font-bold mb-2">Discover Premium Features</h2>
            <p class="text-sm opacity-90">Take your real estate business to the next level</p>
          </div>
        </div>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-3 gap-1 p-4 border-b">
          <div class="text-center">
            <div class="text-2xl font-bold text-[#005C53]">500+</div>
            <div class="text-xs font-bold text-[#8DAD9D]">Active Listings</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-[#005C53]">98%</div>
            <div class="text-xs font-bold text-[#8DAD9D]">Success Rate</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-[#005C53]">24/7</div>
            <div class="text-xs font-bold text-[#8DAD9D]">Support</div>
          </div>
        </div>
      </div>
  
      <!-- Feature Highlights -->
      <div class="space-y-3">
        <div v-for="(feature, index) in features" 
             :key="index"
             class="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center space-x-3">
            <div :class="`w-10 h-10 rounded-full flex items-center justify-center ${feature.bgColor}`">
              <i :class="`${feature.icon} ${feature.iconColor}`"></i>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">{{ feature.title }}</h3>
              <p class="text-sm text-gray-500">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- CTA Section -->
      <div class="mt-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
        <div class="text-center">
          <p class="text-sm font-medium text-gray-800 mb-3">
            Limited Time Offer
          </p>
          <div class="flex items-center justify-center space-x-2 mb-3">
            <span class="text-2xl font-bold text-emerald-600">30% OFF</span>
            <span class="text-sm text-gray-500">First Month</span>
          </div>
          <button class="w-full bg-emerald-600 text-white rounded-lg py-2 px-4 hover:bg-emerald-700 transition-colors duration-200">
            Upgrade Now
          </button>
        </div>
      </div>
  
      <!-- Social Proof -->
      <div class="mt-4 p-4 bg-white rounded-xl shadow-sm">
        <div class="flex items-center space-x-2 mb-2">
          <div class="flex -space-x-2">
            <!-- Replace placeholder images with avatar circles -->
            <div v-for="(color, i) in avatarColors" 
                 :key="i"
                 :class="`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs ${color}`">
              {{ avatarInitials[i] }}
            </div>
          </div>
          <span class="text-sm text-gray-600">Join 2,000+ real estate professionals</span>
        </div>
        <div class="flex items-center text-yellow-400 text-sm">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <span class="ml-2 text-gray-600">4.9/5 from 500+ reviews</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const features = [
    {
      icon: 'fas fa-chart-line',
      title: 'Advanced Analytics',
      description: 'Track your performance in real-time',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      icon: 'fas fa-bullseye',
      title: 'Premium Visibility',
      description: 'Stand out with featured listings',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: 'fas fa-tools',
      title: 'Pro Tools',
      description: 'Access exclusive marketing tools',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500'
    }
  ]
  
  // Avatar colors and initials for the social proof section
  const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500'
  ]
  
  const avatarInitials = ['JD', 'AR', 'MS']
  </script>