<template>
    <div class="max-w-[380px] bg-white rounded-3xl p-6 shadow-lg">
      <!-- Availability Section -->
      <div class="mb-6">
        <h3 class="text-[15px] text-gray-800 font-medium mb-2.5">
          Disponibilité de la propriété
        </h3>
        <div class="flex flex-wrap gap-2">
          <button 
            class="h-[32px] px-4 rounded-full text-[13px] font-medium bg-emerald-500 text-white"
          >
            Tout
          </button>
          <button 
            class="h-[32px] px-4 rounded-full text-[13px] font-medium text-gray-400"
          >
            Bientôt Disponible
          </button>
          <button 
            class="h-[32px] px-4 rounded-full text-[13px] font-medium text-gray-400"
          >
            Indisponible
          </button>
          <button 
            class="h-[32px] px-4 rounded-full text-[13px] font-medium text-gray-400"
          >
            Disponible
          </button>
        </div>
      </div>
  
      <!-- Order Section -->
      <div class="mb-6">
        <h3 class="text-[15px] text-gray-800 font-medium mb-2.5">
          Ordre de présentation
        </h3>
        <div class="flex gap-2">
          <button 
            class="h-[32px] px-6 rounded-full text-[13px] font-medium bg-emerald-500 text-white"
          >
            Visites
          </button>
          <button 
            class="h-[32px] px-6 rounded-full text-[13px] font-medium text-gray-400"
          >
            Prix
          </button>
          <button 
            class="h-[32px] px-6 rounded-full text-[13px] font-medium text-gray-400"
          >
            Intéressés
          </button>
        </div>
      </div>
  
      <!-- Agent Assignment Section -->
      <div class="mb-8">
        <h3 class="text-[15px] text-gray-800 font-medium mb-2.5">
          Propriétés suivies par un agent
        </h3>
        <div class="flex gap-2">
          <button 
            class="h-[32px] px-6 rounded-full text-[13px] font-medium bg-emerald-500 text-white"
          >
            Attribuées
          </button>
          <button 
            class="h-[32px] px-6 rounded-full text-[13px] font-medium text-gray-400"
          >
            Non Attribuées
          </button>
        </div>
      </div>
  
      <!-- Stats Section -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[14px] text-gray-600">Demandes d'agents immobiliers</span>
          <span class="text-[14px] text-gray-600 font-medium">03</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-[14px] text-gray-600">Total de visites programmées</span>
          <span class="text-[14px] text-gray-600 font-medium">03</span>
        </div>
      </div>
  
      <!-- Action Buttons -->
      <div class="space-y-3">
        <button 
          @click="addProperty"
          class="w-full h-[48px] bg-[#D9F9E9] hover:bg-emerald-100 transition-colors rounded-xl flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-text-[#005C53]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/>
          </svg>
          <span class="text-[15px] font-medium text-[#005C53]">Ajouter Une Propriété</span>
        </button>
  
        <button 
          @click="evaluateProperties"
          class="w-full h-[48px] bg-[#D9F9E9] hover:bg-emerald-100 transition-colors rounded-xl flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#005C53]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 17v2h6v-2H3M3 5v2h10V5H3m10 16v-2h8v-2h-8v-2h-2v6h2M7 9v2H3v2h4v2h2V9H7m14 4v-2H11v2h10m-6-4h2V7h4V5h-4V3h-2v6Z"/>
          </svg>
          <span class="text-[15px] font-medium text-[#005C53]">Évaluer Mes Propriétés</span>
        </button>
  
        <button 
          @click="promoteProperties"
          class="w-full h-[48px] bg-[#D9F9E9] hover:bg-emerald-100 transition-colors rounded-xl flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#005C53]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 14h10v2H7v-2m0-4h10v2H7v-2M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Z"/>
          </svg>
          <span class="text-[15px] font-medium text-[#005C53]">Promouvoir Mes Propriétés</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const availability = ref('tout')
  const presentationOrder = ref('visites')
  const agentAssignment = ref('attribuees')
  const stats = ref({
    agentRequests: '03',
    scheduledVisits: '03'
  })
  
  const setAvailability = (value) => {
    availability.value = value
  }
  
  const setPresentationOrder = (value) => {
    presentationOrder.value = value
  }
  
  const setAgentAssignment = (value) => {
    agentAssignment.value = value
  }
  
  const addProperty = () => {
    // Add property logic
    console.log('Adding property')
  }
  
  const evaluateProperties = () => {
    // Evaluate properties logic
    console.log('Evaluating properties')
  }
  
  const promoteProperties = () => {
    // Promote properties logic
    console.log('Promoting properties')
  }
  </script>
  
  <style scoped>
  
  </style>