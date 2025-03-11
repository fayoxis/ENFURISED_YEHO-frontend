<template>
    <div class="animate-fadeIn">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard 
          v-for="property in properties" 
          :key="property.id" 
          :property="property" 
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import PropertyCard from '../../properties/PropertyCard.vue'
  
  defineProps({
    properties: {
      type: Array,
      required: true
    }
  })
  </script>