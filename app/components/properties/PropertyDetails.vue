<template>
    <div class="w-full mx-auto p-5 relative bg-white">
      <div class="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-5">
        <!-- Property Statistics -->
         <div class="flex flex-col">
        <div class="flex gap-8 w-full md:w-1/4">
          <div class="property-stat">
            <div class="text-3xl font-bold text-[#2FAC66]">08</div>
            <div class="text-sm text-gray-600">PIÈCES</div>
            <div class="text-xl font-semibold text-gray-800">02</div>
            <div class="text-sm text-gray-600">PARKING</div>
          </div>
    
          <div class="property-stat">
            <div class="text-3xl font-bold text-[#2FAC66]">03</div>
            <div class="text-sm text-gray-600">CHAMBRES</div>
            <div class="text-xl font-semibold text-gray-800">200</div>
            <div class="text-sm text-gray-600">SUPERFICIE m²</div>
          </div>
        </div>
        <div class="flex space-x-2 items-center">
            <div class="bg-[#D9F9E9] px-2 py-1 rounded-2xl">
                parking
            </div>
            <div class="bg-[#D9F9E9] p-2 rounded-2xl">
                parking
            </div>
          </div>
        </div>
    
        <!-- Property Description -->
        <div class="flex flex-col w-full md:w-3/4">
          <h2 class="text-xl font-semibold mb-4 text-[#005C53]">Description de la propriété</h2>
          <p class="text-sm leading-relaxed text-gray-700">
            Charmant appartement spacieux de 3 chambres. Son emplacement stratégique vous permet de profiter des 
            commodités essentielles à proximité. Cet appartement moderne dispose d'un grand salon lumineux, 
            d'une cuisine équipée et de finitions de qualité. Le quartier est calme et sécurisé, idéal pour une 
            famille ou des professionnels. Parking disponible. À voir absolument!
          </p>
  
          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 mt-6">
            <button 
              @click="handleContact"
              class="btn-primary bg-[#005C53] text-white flex-grow md:flex-grow-0">
              Contrat de bail
            </button>
            <button 
              @click="handleContact"
              class="btn-primary bg-[#005C53] text-white flex-grow md:flex-grow-0">
              Agent de visite
            </button>
            <button 
              @click="toggleFavorite"
              class="btn-secondary border-2 border-[#005C53] text-[#005C53] flex-grow md:flex-grow-0">
              {{ isFavorite ? 'Favori' : 'Ajouter aux favoris' }}
            </button>
          </div>
        </div>
  
        <!-- Agent Information -->
        <div class="bg-white p-4 rounded-lg w-full md:w-1/4 shadow-md border border-[#D9F9E9]">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-[#D9F9E9] rounded-full mr-3"></div>
            <div class="text-sm font-bold text-[#005C53]">AGENT IMMOBILIER</div>
          </div>
          <div class="font-semibold mb-2 text-gray-800">Akure levilel</div>
          <div class="flex mb-4">
            <div class="flex text-yellow-400">
              <span v-for="star in 5" :key="star">★</span>
            </div>
          </div>
          <button 
            @click="handleShare"
            class="btn-primary bg-[#F24405] text-white w-full">
            Acquérir l'espace
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isFavorite = ref(false)
  
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
  }
  
  const handleContact = () => {
    // Implement contact functionality
    console.log('Contact initiated')
  }
  
  const handleVisit = () => {
    // Implement visit scheduling
    console.log('Visit scheduled')
  }
  
  const handleShare = () => {
    // Implement share functionality
    console.log('Share property')
  }
  </script>
  
  <style scoped>
  .property-stat {
    @apply transition-transform duration-300 ease-in-out;
  }
  
  .property-stat:hover {
    @apply transform scale-105;
  }
  
  .btn-primary {
    @apply px-4 py-2 rounded-md transition-all duration-300 
           hover:opacity-90 active:transform active:scale-95 
           text-center;
  }
  
  .btn-secondary {
    @apply px-4 py-2 rounded-md transition-all duration-300 
           hover:bg-opacity-10 active:transform active:scale-95 
           text-center;
  }
  
  /* Entrance Animation */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .property-stat, .btn-primary, .btn-secondary {
    animation: fadeInUp 0.6s ease-out;
  }
  </style>