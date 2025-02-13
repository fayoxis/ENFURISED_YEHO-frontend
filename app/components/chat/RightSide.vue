<template>
    <div class="property-list overflow-y-auto h-full max-h-screen">
      <h1 class="text-4xl font-black text-black">
        Les Proprietes que vous avez en commun (<span class="text-[#A2C02D]">
          {{ properties.length }}
        </span>)
      </h1>
      <div class="flex flex-col gap-4 p-4">
        <router-link
          v-for="property in properties"
          :key="property.id"
          :to="`/property/${property.id}`"
          class="bg-white overflow-hidden property-card"
        >
          <div class="relative h-44">
            <img :src="property.image" class="w-full h-full object-cover" :alt="property.title" />
          </div>
          <div class="p-4 bg-white">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-[#A2C02D] font-black text-lg">{{ property.price }} XAF</span>
              <span class="text-[#8DAD9D] text-sm">/{{ property.period }}</span>
            </div>
            <h3 class="text-[#005C53] font-extrabold text-xl mb-2">{{ property.title }}</h3>
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
            <div class="flex items-center gap-1.5 text-gray-500">
              <img src="~/public/icons/location-icon.svg" class="w-3 h-3 object-cover" :alt="location - icon" />
              <span class="text-[#8DAD9D] text-sm">{{ property.location }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const generateRandomProperty = (id) => {
    const titles = ['Cozy Cottage', 'Modern Apartment', 'Luxury Villa', 'Beach House'];
    const locations = ['Bamenda', 'Yaoundé', 'Douala', 'Limbe'];
    return {
      id,
      title: titles[Math.floor(Math.random() * titles.length)],
      image: '/images/home/fete.jpg',
      price: Math.floor(Math.random() * 1000000) + 50000, // Random price between 50,000 and 1,000,000
      period: 'month',
      bathrooms: Math.floor(Math.random() * 5) + 1, // Random between 1 and 5
      bedrooms: Math.floor(Math.random() * 5) + 1, // Random between 1 and 5
      area: Math.floor(Math.random() * 200) + 50, // Random area between 50 and 250 M²
      location: locations[Math.floor(Math.random() * locations.length)],
    };
  };
  
  const properties = ref([]);
  for (let i = 1; i <= 20; i++) {
    properties.value.push(generateRandomProperty(i));
  }
  </script>
  
  <style scoped>
  .property-list {
    max-height: 100vh; /* Adjust height as needed */
  }
  
  .property-card {
    transition: all 0.2s ease;
  }
  
  .property-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  </style>