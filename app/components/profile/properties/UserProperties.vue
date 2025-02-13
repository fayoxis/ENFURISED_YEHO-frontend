<template>
  <div class="w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <UserPropertyCard v-for="property in properties" :key="property.id" :property="property" />
    </div>
  </div>
</template>

<script setup>
import UserPropertyCard from './UserPropertyCard.vue'; 

const properties = [
  {
    id: 1,
    title: "Spacious Apartment",
    image: "/images/home/fete.jpg",
    price: 50000,
    period: "month",
    bathrooms: 2,
    bedrooms: 3,
    area: 120,
    location: "Downtown",
    status: "disponible"
  },
  {
    id: 2,
    title: "Cozy Cottage",
    image: "/images/home/fete.jpg",
    price: 30000,
    period: "month",
    bathrooms: 1,
    bedrooms: 2,
    area: 80,
    location: "Suburb",
    status: "indisponible"
  },
  {
    id: 3,
    title: "Luxury Villa",
    image: "/images/home/fete.jpg",
    price: 150000,
    period: "month",
    bathrooms: 4,
    bedrooms: 5,
    area: 300,
    location: "Beachfront",
    status: "disponible"
  },
  {
    id: 6,
    title: "Spacious Apartment",
    image: "/images/home/fete.jpg",
    price: 50000,
    period: "month",
    bathrooms: 2,
    bedrooms: 3,
    area: 120,
    location: "Downtown",
    status: "indisponible"
  },
  {
    id: 7,
    title: "Cozy Cottage",
    image: "/images/home/fete.jpg",
    price: 30000,
    period: "month",
    bathrooms: 1,
    bedrooms: 2,
    area: 80,
    location: "Suburb",
    status: "indisponible"
  },
  {
    id: 6,
    title: "Luxury Villa",
    image: "/images/home/fete.jpg",
    price: 150000,
    period: "month",
    bathrooms: 4,
    bedrooms: 5,
    area: 300,
    location: "Beachfront",
    status: "disponible"
  },
];
</script>

<style scoped>

</style>