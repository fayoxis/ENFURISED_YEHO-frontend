<template>
  <router-link :to="`/property/${property.id}`" class="bg-white overflow-hidden property-card">
    <!-- Property Image -->
    <div class="relative h-44">
      <img :src="property.image" class="w-full h-full object-cover" :alt="property.title">
    </div>

    <!-- Property Details -->
    <div class="p-4 bg-white">
      <!-- Price -->
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[#A2C02D] font-black text-lg">{{ property.price }} XAF</span>
        <span class="text-[#8DAD9D] text-sm">/{{ property.period }}</span>
      </div>

      <!-- Title -->
      <h3 class="text-[#005C53] font-extrabold text-xl mb-2">{{ property.title }}</h3>

      <!-- Features -->
      <div class="flex gap-3 text-xs text-[#005C53] font-semibold mb-2">
        <div class="flex bg-[#D9F9E9] justify-center px-4 items-center">
          <span>{{ property.bathrooms }} Douches</span>
        </div>
        <div class="flex bg-[#D9F9E9] justify-center px-4 items-center">
          <span>{{ property.bedrooms }} Chambres</span>
        </div>
        <div class="flex bg-[#D9F9E9] justify-center px-4 items-center">
          <span>{{ property.area }} M²</span>
        </div>
      </div>

      <!-- Location -->
      <div class="flex items-center gap-1.5 text-gray-500">
        <img src="~/public/icons/location-icon.svg" class="w-3 h-3 object-cover" :alt="location - icon">
        <span class="text-[#8DAD9D] text-sm">{{ property.location }}</span>
      </div>
    </div>
  </router-link>
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