<template>
    <NuxtLink 
      v-if="property.status"
      :to="`/property/${property.id}`" 
      class="bg-white  overflow-hidden rounded-lg border-2 p-2 shadow-sm hover:shadow-md transition-shadow duration-200 property-card "
      :class="property.status === 'disponible' ? 'border-[#2FAC66]' : 'border-[#F24405]'"
    >
      <!-- Property Image with Availability Badge -->
      <div class="relative border-[#] rounded-lg h-40">
        <img 
          :src="property.image" 
          class="w-full h-full rounded-lg object-cover" 
          :alt="property.title"
        >
        <div 
          class="absolute top-4 right-4 px-3 py-1 rounded-md text-sm font-semibold"
          :class="property.status === 'disponible' ? 'bg-[#2FAC66] text-white' : 'bg-[#F24405] text-white'"
        >
          {{ property.status.charAt(0).toUpperCase() + property.status.slice(1) }}
        </div>
      </div>
  
      <!-- Property Details -->
      <div class="p-2 bg-white">
        <!-- Price -->
        <div class="flex items-center gap-2 ">
          <span class="text-[#A2C02D] font-black text-lg">{{ property.price }} XAF</span>
          <span class="text-[#8DAD9D] text-sm">/{{ property.period }}</span>
        </div>
  
        <!-- Title -->
        <h3 class="text-[#005C53] font-extrabold text-xl mb-1">{{ property.title }}</h3>
  
        <!-- Features -->
        <div class="flex gap-3 text-xs text-[#005C53] font-semibold mb-1">
          <div class="flex bg-[#D9F9E9] justify-center px-4 py-1 rounded-md items-center">
            <span>{{ property.bathrooms }} Douches</span>
          </div>
          <div class="flex bg-[#D9F9E9] justify-center px-4 py-1 rounded-md items-center">
            <span>{{ property.bedrooms }} Chambres</span>
          </div>
          <div class="flex bg-[#D9F9E9] justify-center px-4 py-1 rounded-md items-center">
            <span>{{ property.area }} M²</span>
          </div>
        </div>
  
        <!-- Location -->
        <div class="flex items-center gap-1.5 text-gray-500">
          <img 
            src="/icons/location-icon.svg" 
            class="w-3 h-3 object-cover" 
            alt="location-icon"
          >
          <span class="text-[#8DAD9D] text-sm">{{ property.location }}</span>
        </div>
      </div>
    </NuxtLink>
  </template>
  
  <script setup>
  defineProps({
      property: {
          type: Object,
          required: true
      }
  })
  </script>
  
  <style scoped>
  .property-card {
    transition: all 0.2s ease;
  }
  
  .property-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  </style>