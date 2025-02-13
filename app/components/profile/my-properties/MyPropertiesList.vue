<template>
  <div class="min-h-screen bg-white w-full">
    <div class="mx-auto max-w-7xl">
      <header class="py-4 text-center">
        <h1 class="text-7xl text-start text-black font-black"> <span class="text-[#A2C02D]">{{ totalImages }}</span> Propriétés</h1>
        <p class="text-3xl text-start text-black font-bold">Que vous avez publiées</p>
      </header>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MyPropertiesCard
          v-for="property in properties"
          :key="property.id"
          :property="property"
          @update:status="handleStatusUpdate"
        />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import MyPropertiesCard from './MyPropertiesCard.vue'
  
  const handleStatusUpdate = (newStatus) => {
  // Update property status in your data
  property.value.status = newStatus
}

  const properties = ref([
    {
      id: 1,
      imageUrl: '/images/home/fete.jpg',
      status: 'indisponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 5
      }
    },
    {
      id: 2,
      imageUrl: '/images/home/fete.jpg',
      status: 'disponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    },
    {
      id: 3,
      imageUrl: '/images/home/fete.jpg',
      status: 'indisponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    },
    {
      id: 4,
      imageUrl: '/images/home/fete.jpg',
      status: 'indisponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    },
    {
      id: 5,
      imageUrl: '/images/home/fete.jpg',
      status: 'disponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    },
    {
      id: 6,
      imageUrl: '/images/home/fete.jpg',
      status: 'indisponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    },
    {
      id: 7,
      imageUrl: '/images/home/fete.jpg',
      status: 'indisponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    },
    {
      id: 8,
      imageUrl: '/images/home/fete.jpg',
      status: 'indisponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    },
    {
      id: 9,
      imageUrl: '/images/home/fete.jpg',
      status: 'disponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    },
    {
      id: 10,
      imageUrl: '/images/home/fete.jpg',
      status: 'indisponible',
      title: 'Appartement Moderne',
      photos: 12,
      visits: 11,
      interests: 18,
      bathrooms: 2,
      bedrooms: 2,
      area: 200,
      location: 'Messamendongo, Odza, Yaoundé IV',
      price: 130000,
      agent: {
        name: 'Abaze Jovial',
        rating: 4
      }
    }
  ])

  const totalImages = computed(() => {
  return properties.value.length;
});
  </script>