<template>
  <div class="max-w-7xl mx-auto p-3 md:p-6 bg-white">
    <!-- Header -->
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 space-y-4 md:space-y-0">
      <div class="flex-col items-center">
        <h1 class="text-3xl md:text-5xl font-bold leading-tight animate-fade-in">
          <span class="text-black">ESPACE </span>
          <span class="text-[#A2C02D]">DOMESTIQUE</span>
        </h1>
        <p class="text-base md:text-lg ml-0 md:ml-2 font-bold text-black">Ajouter une Propriété</p>
      </div>

      <div class="flex flex-col gap-2 w-full md:w-auto">
        <h1 class="text-start md:text-end font-bold text-lg md:text-xl">Changer le type de propriété</h1>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="type in propertyTypes" 
            :key="type"
            :class="[
              'px-3 md:px-4 py-1.5 text-sm rounded transition-all duration-300 transform hover:scale-105',
              selectedType === type 
                ? 'bg-[#005C53] text-white shadow-lg' 
                : 'bg-white border-[#005C53] border text-[#005C53] hover:bg-[#005C53] hover:text-white'
            ]" 
            @click="selectedType = type"
          >
            {{ type }}
          </button>
        </div>
      </div>
    </header>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="w-full px-2 md:px-10 lg:px-20 space-y-6">
        <!-- First Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <!-- Housing Type Dropdown -->
          <div class="space-y-2 relative" v-click-outside="closeDropdowns">
            <label class="text-sm font-medium text-black">Type de logement (Résidentiel)</label>
            <button 
              type="button"
              @click="toggleDropdown('housingType')"
              class="w-full flex justify-between items-center shadow-xl rounded-xl p-2.5 border focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
              {{ formData.housingType || 'Sélectionner' }}
            <img src="/icons/drop-down-icon.svg" alt="drop-down-icon" srcset="">
            </button>
            <TransitionGroup>
              <div 
                v-if="activeDropdown === 'housingType'"
                class="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto animate-dropdown"
              >
                <button
                  v-for="type in housingTypes"
                  :key="type"
                  @click="selectOption('housingType', type)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  {{ type }}
                </button>
              </div>
            </TransitionGroup>
          </div>

          <!-- Condition Dropdown -->
          <div class="space-y-2 relative" v-click-outside="closeDropdowns">
            <label class="text-sm font-medium text-black">État du logement</label>
            <button 
              type="button"
              @click="toggleDropdown('condition')"
              class="w-full flex justify-between items-center shadow-xl rounded-xl p-2.5 border focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
              {{ formData.condition || 'Sélectionner' }}
              <img src="/icons/drop-down-icon.svg" alt="drop-down-icon" srcset="">
            </button>
            <TransitionGroup>
              <div 
                v-if="activeDropdown === 'condition'"
                class="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto animate-dropdown"
              >
                <button
                  v-for="condition in conditions"
                  :key="condition"
                  @click="selectOption('condition', condition)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  {{ condition }}
                </button>
              </div>
            </TransitionGroup>
          </div>

          <!-- Rooms Input -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-black">Pièces</label>
            <input 
              v-model="formData.rooms"
              type="number"
              min="1"
              class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
          </div>

          <!-- Bathrooms Input -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-black">Douches</label>
            <input 
              v-model="formData.bathrooms"
              type="number"
              min="0"
              class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
          </div>
        </div>

        <!-- Second Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <!-- Payment Frequency Dropdown -->
          <div class="space-y-2 relative" v-click-outside="closeDropdowns">
            <label class="text-sm font-medium text-black">Périodicité de paiement</label>
            <button 
              type="button"
              @click="toggleDropdown('paymentFrequency')"
              class="w-full flex justify-between items-center shadow-xl rounded-xl p-2.5 border focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
              {{ formData.paymentFrequency || 'Sélectionner' }}
              <img src="/icons/drop-down-icon.svg" alt="drop-down-icon" srcset="">
            </button>
            <TransitionGroup>
              <div 
                v-if="activeDropdown === 'paymentFrequency'"
                class="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto animate-dropdown"
              >
                <button
                  v-for="freq in paymentFrequencies"
                  :key="freq"
                  @click="selectOption('paymentFrequency', freq)"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  {{ freq }}
                </button>
              </div>
            </TransitionGroup>
          </div>

          <!-- Other inputs for second row -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-black">Charge de logement</label>
            <input 
              v-model="formData.housingCharge"
              type="number"
              min="0"
              class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-black">Surface (M²)</label>
            <input 
              v-model="formData.surface"
              type="number"
              min="0"
              class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-black">Garderie</label>
            <input 
              v-model="formData.daycare"
              type="text"
              class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
          </div>
        </div>

        <!-- Description and Advantages Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-2 lg:h-5/6">
            <label class="text-sm font-medium text-black">Description de la propriété</label>
            <textarea
              v-model="formData.description"
              rows="4"
              class="w-full lg:h-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all resize-none"
            ></textarea>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-black">Avance exigée</label>
                <input 
                  v-model="formData.advance"
                  type="number"
                  min="0"
                  class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
                >
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-black">Caution</label>
                <input 
                  v-model="formData.deposit"
                  type="number"
                  min="0"
                  class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
                >
              </div>
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-medium text-black">Avantages de la propriété</h3>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="advantage in advantages" 
                  :key="advantage"
                  type="button"
                  @click="toggleAdvantage(advantage)"
                  :class="[
                    'px-4 py-1.5 rounded-full text-sm transition-all duration-300 transform hover:scale-105',
                    selectedAdvantages.includes(advantage)
                      ? 'bg-[#8DAD9D] text-white'
                      : 'bg-white text-[#8DAD9D] font-semibold border border-[#8DAD9D] hover:bg-gray-50'
                  ]"
                >
                  {{ advantage }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Location Information -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-black">Adresse de la propriété</label>
            <input 
              v-model="formData.address"
              type="text"
              class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-black">Quartier</label>
            <input 
              v-model="formData.neighborhood"
              type="text"
              class="w-full shadow-xl rounded-xl p-2.5 focus:ring-2 focus:ring-[#A2C02D] focus:border-[#A2C02D] transition-all"
            >
          </div>

          <div class="col-span-1 sm:col-span-2 flex gap-4 items-end justify-center">
            <button 
              type="button" 
              class="flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg w-1/2 hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              <img src="/icons/map-icon.svg" alt="map-icon">
              <span class="text-sm">Google Maps</span>
            </button>
            <button 
              type="button"
              class="bg-[#8DAD9D] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#8DAD9D]/80 transition-all transform hover:scale-105"
            >
              <img src="/icons/pdf-icon.svg" alt="pdf-icon">
              <span class="text-sm">DÉPOSER UN BAIL</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Image Upload Section -->
      <div class="mt-8">
        <p class="text-sm font-bold text-black mb-4">
          Ajouter des photos de la propriété (glissez-déposez ou cliquez pour ajouter)
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          <div 
            v-for="(image, index) in images" 
            :key="index"
            class="relative group aspect-square"
            @click="triggerFileInput"
            @dragover.prevent 
            @drop.prevent="handleDrop"
          >
            <div 
              class="border-2 border-dashed h-full border-[#8DAD9D] rounded-xl p-4 md:p-8 flex items-center justify-center
                     transition-all duration-300 group-hover:border-[#A2C02D] cursor-pointer"
            >
              <img 
                src="/icons/upload-icon.svg" 
                alt="upload-icon" 
                class="w-8 h-8 md:w-12 md:h-12 transition-transform group-hover:scale-110"
              >
            </div>
            <TransitionGroup>
              <img 
                v-if="image" 
                :src="image" 
                class="absolute inset-0 w-full h-full object-cover rounded-lg animate-fade-in"
              >
            </TransitionGroup>
          </div>
        </div>
        <input 
          type="file" 
          ref="fileInput" 
          class="hidden" 
          multiple 
          @change="handleFileSelect"
          accept="image/*"
        >
      </div>

      <!-- Footer -->
      <div class="flex flex-col md:flex-row items-center justify-center mt-8 pt-4 border-t space-y-4 md:space-y-0 md:space-x-4">
        <button 
          type="submit" 
          :disabled="!isFormValid"
          :class="[
            'w-full md:w-auto py-4 md:py-8 px-6 md:px-12 rounded-lg transition-all transform hover:scale-105',
            isFormValid 
              ? 'bg-[#A2C02D] text-white hover:bg-[#A2C02D]/90'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          ]"
        >
          PUBLIER LA PROPRIÉTÉ
        </button>
        <div class="flex flex-col w-full md:w-auto space-y-2">
          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="terms" 
              v-model="formData.terms"
              class="rounded text-[#A2C02D] focus:ring-[#A2C02D]"
            >
            <label for="terms" class="text-xs text-black">
              J'ai lu et j'accepte les termes et conditions de ce site
            </label>
          </div>
          <button 
            type="button" 
            :disabled="!isFormValid"
            :class="[
              'w-full text-white text-xs font-bold px-4 md:px-8 py-3 rounded-lg transition-all transform hover:scale-105',
              isFormValid 
                ? 'bg-[#005C53] hover:bg-[#005C53]/90'
                : 'bg-gray-300 cursor-not-allowed'
            ]"
          >
            PUBLIER LA PROPRIÉTÉ<br> ET CHOISIR UN AGENT IMMOBILIER
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Form data
const formData = reactive({
  housingType: '',
  condition: '',
  rooms: '',
  bathrooms: '',
  paymentFrequency: '',
  housingCharge: '',
  surface: '',
  daycare: '',
  description: '',
  advance: '',
  deposit: '',
  address: '',
  neighborhood: '',
  terms: false
})

// Dynamic data
const propertyTypes = ['PROFESSIONNELLE', 'ENTREPRENENTIES', 'TEMPORAIRE']
const selectedType = ref('PROFESSIONNELLE')
const housingTypes = ['Appartement', 'Maison', 'Studio', 'Loft']
const conditions = ['Neuf', 'Bon état', 'À rénover']
const paymentFrequencies = ['Mensuel', 'Trimestriel', 'Annuel']
const advantages = ['Parking', 'Buanderie', 'Ascenseur', 'Terrasse', 'Concierge', 'Jardin', 'Gardien', 'Forage', 'Goudron', 'Toilettes', 'Commerces']
const selectedAdvantages = ref([])
const images = ref(Array(12).fill(null))
const fileInput = ref(null)
const activeDropdown = ref(null)

// Form validation
const isFormValid = computed(() => {
  return formData.housingType &&
         formData.condition &&
         formData.rooms &&
         formData.paymentFrequency &&
         formData.housingCharge &&
         formData.surface &&
         formData.address &&
         formData.terms
})

// Methods
const toggleDropdown = (dropdownName) => {
  activeDropdown.value = activeDropdown.value === dropdownName ? null : dropdownName
}

const closeDropdowns = () => {
  activeDropdown.value = null
}

const selectOption = (field, value) => {
  formData[field] = value
  activeDropdown.value = null
}

const toggleAdvantage = (advantage) => {
  const index = selectedAdvantages.value.indexOf(advantage)
  if (index === -1) {
    selectedAdvantages.value.push(advantage)
  } else {
    selectedAdvantages.value.splice(index, 1)
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  files.forEach((file, index) => {
    if (index < 12 && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        images.value[index] = e.target.result
      }
      reader.readAsDataURL(file)
    }
  })
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  files.forEach((file, index) => {
    if (index < 12 && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        images.value[index] = e.target.result
      }
      reader.readAsDataURL(file)
    }
  })
}

const submitForm = () => {
  if (!isFormValid.value) return

  // Form submission logic here
  const formSubmissionData = {
    ...formData,
    propertyType: selectedType.value,
    advantages: selectedAdvantages.value,
    images: images.value.filter(img => img !== null)
  }

  console.log('Submitting form:', formSubmissionData)
  // Add API call or other submission logic here
}


</script>

<style>
.animate-dropdown {
  animation: dropdown 0.2s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes dropdown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Ensure smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Mobile-first media queries */
@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }
}

@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
  }
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 2.5rem;
  }
}

/* Custom scrollbar for dropdowns */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #A2C02D #ffffff;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #ffffff;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #A2C02D;
  border-radius: 3px;
}
</style>