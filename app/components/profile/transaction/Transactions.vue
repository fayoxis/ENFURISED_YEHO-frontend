<template>
    <div class=" w-full space-y-5 p-8 bg-white">
      <!-- Balance Section -->
       <div>
        <h2 class="text-3xl font-black mb-4 text-black">VOTRE SOLDE ET OPTIONS DE RETRAIT</h2>

      <div class=" flex space-x-5 mb-8 w-full">
        <div class="w-1/2">
        <div class="mb-4">
          <p class="text-sm text-vlack font-bold mb-2">Votre solde actuel</p>
          <h1 class="text-5xl font-bold text-black">{{ balance }} <span class="text-[#A2C02D]">P.</span></h1>
        </div>
      </div>
        <div class="flex flex-col space-y-3">
          <button 
            class="bg-[#F24405] text-white  px-4 py-2 rounded-md text-sm font-medium"
          >
            Acheter des pièces
          </button>
          <button 
            class="border border-[#A2C02D] text-[#A2C02D] px-4 py-2 rounded-md text-sm font-medium"
          >
            Convertir en fcfa
          </button>
        </div>
      </div>
  
      <!-- Withdrawal Options -->
      <div class="mb-8">
        <p class="text-sm text-black font-semibold mb-4">
          Où et comment voudriez-vous retirer votre argent?
        </p>
        <div class="grid grid-cols-3 gap-4 w-2/3 mb-4">
          <div 
            v-for="(method, index) in withdrawalMethods" 
            :key="index"
            class="rounded-md p-3 flex flex-col items-center space-y-2 cursor-pointer hover:border-[#6B8E23]"
          >
          <div class="flex space-x-3 w-full">
           <img :src="method.icon" :alt="method.name" class="w-7 h-7" />
            <span class="text-md font-semibold">{{ method.name }}</span>
          </div>
            <div class="shadow-2xl rounded-2xl h-15 p-8 w-full"></div>
          </div>
        </div>
        <button 
          class="w-full bg-[#A2C02D] lg:w-1/2 text-white py-7 rounded-2xl text-sm font-semibold"
        >
          RETIRER DE L'ARGENT
        </button>
      </div>

    </div>
  
      <!-- Transaction History -->
      <div class="w-full">
        
        <!-- Filters -->
        <div class="flex flex-row justify-between items-center mb-4">
          <h2 class="text-base font-bold mb-4 text-black">VOTRE HISTORIQUE DE TRANSACTIONS</h2>

          <div class="flex px-3 w-full space-x-3">
            <button 
              class="border border-[#A2C02D] text-[#A2C02D] text-[9px] px-3 py-2 rounded-md "
            >
              Organiser par date
            </button>
            <button 
              class="border border-[#A2C02D] text-[#A2C02D] px-3 py-2 rounded-md text-[9px]"
            >
              Organiser par somme
            </button>

            <div class="relative ">
            <input 
              type="text" 
              placeholder="Faire une recherche" 
              class="rounded-md shadow-lg px-3 py-2 pr-10 text-sm w-64"
              v-model="searchQuery"
            />
            <img 
              src="/icons/search-icon.svg" 
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          </div>
          
        </div>
  
        <!-- Transaction Table -->
        <div class="overflow-x-auto w-full">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-white">
                <th class="text-left p-3 text-sm font-bold text-[#A2C02D]">DATE</th>
                <th class="text-left p-3 text-sm font-bold text-[#A2C02D]">DESCRIPTION</th>
                <th class="text-left p-3 text-sm font-bold text-[#A2C02D]">SOMME</th>
                <th class="text-left p-3 text-sm font-bold text-[#A2C02D]">AGENT IMM.</th>
                <th class="text-left p-3 text-sm font-bold text-[#A2C02D]">ÉTAT</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="transaction in paginatedTransactions" 
                :key="transaction.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="p-3 text-md text-[#8DAD9D]">{{ transaction.date }}</td>
                <td class="p-3 text-md text-[#8DAD9D]">{{ transaction.description }}</td>
                <td class="p-3 text-md text-[#8DAD9D]">{{ transaction.amount }} XAF</td>
                <td class="p-3 text-md text-[#8DAD9D]">{{ transaction.agent }}</td>
                <td class="p-3">
                  <span 
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="getStatusClass(transaction.status)"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
          <span class="text-sm text-gray-600">
            Page {{ currentPage }} sur {{ totalPages }}
          </span>
          <div class="flex space-x-2">
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-2 bg-[#A2C02D] text-white rounded-md text-sm disabled:opacity-50"
            >
              Précédent
            </button>
            <button 
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 bg-[#A2C02D] text-white rounded-md text-sm disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  
  
  definePageMeta({
  layout: 'profile-layout' 
  })
  
  const balance = ref('128 672')
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 5
  
  const withdrawalMethods = [
    { name: 'Orange Money', icon: '/icons/profile/orange-money.svg' },
    { name: 'MTN Mobile Money', icon: '/icons/profile/mtn.svg' },
    { name: 'Carte Bancaire', icon: '/icons/profile/card.svg' }
  ]
  
  // Initialize the transactions array
  const transactions = ref([]);
  
  // Function to generate random transactions
  const generateRandomTransactions = (count) => {
    const descriptions = [
      'Visite immobilière',
      'Signature de contrat',
      'Évaluation de propriété',
      'Consultation avec l’agent',
      'Négociation de prix'
    ];
    const agents = ['Mbarga Annick', 'Nana Didier', 'Mouelle Jean', 'Tchouangui Marc', 'Nguefack Pierre'];
    const statuses = ['Complété', 'En attente', 'Annulé'];
  
    for (let i = 0; i < count; i++) {
      const randomDate = new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString('fr-FR');
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
      const randomAmount = (Math.random() * (10000 - 1000) + 1000).toFixed(2).replace('.', ','); // Amount between 1,000 and 10,000
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
      transactions.value.push({
        id: i + 1,
        date: randomDate,
        description: randomDescription,
        amount: randomAmount,
        agent: randomAgent,
        status: randomStatus
      });
    }
  };
  
  // Call the function to generate random transactions
  generateRandomTransactions(10); // Generate 10 random transactions
  
  const filteredTransactions = computed(() => {
    return transactions.value.filter(transaction => {
      const searchTerm = searchQuery.value.toLowerCase()
      return (
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.agent.toLowerCase().includes(searchTerm) ||
        transaction.date.includes(searchTerm)
      )
    })
  })
  
  const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredTransactions.value.slice(start, end)
  })
  
  const totalPages = computed(() => 
    Math.ceil(filteredTransactions.value.length / itemsPerPage)
  )
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'Complété':
        return 'bg-green-100 text-green-700'
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700'
      case 'Annulé':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  </script>