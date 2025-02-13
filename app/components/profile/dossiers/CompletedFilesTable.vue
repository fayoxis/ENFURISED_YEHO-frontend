<!-- components/CompletedFiles.vue -->
<template>
    <div class="w-full max-w-6xl mx-auto p-4">
        <div class="mb-6 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800 animate-fade-in">
                LES DOSSIERS QUE VOUS AVEZ TERMINÉS
            </h2>
            <div class="flex gap-2 animate-slide-in-right">
                <button @click="sortByDate" class="px-4 py-2 text-sm text-green-600 border border-green-600 rounded-full 
                 hover:bg-green-50 transition-all duration-300 
                 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300">
                    Organiser par date
                </button>
                <button @click="sortByAmount" class="px-4 py-2 text-sm text-green-600 border border-green-600 rounded-full 
                 hover:bg-green-50 transition-all duration-300 
                 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300">
                    Organiser par somme
                </button>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <!-- Table Header -->
            <div class="grid grid-cols-6 text-[#A2C02D] p-4 border-b bg-white text-sm font-bold sticky top-0 z-10">
                <div>DATE</div>
                <div>TYPE D'ESPACE</div>
                <div>VILLE</div>
                <div>QUARTIER</div>
                <div>SOMME</div>
                <div>AGENT IMM.</div>
            </div>

            <!-- Table Body with max height and scroll -->
            <div class="max-h-[420px] overflow-y-auto overflow-x-auto custom-scrollbar">
                <TransitionGroup name="list" tag="div" class="divide-y divide-gray-100">
                    <div v-for="file in sortedFiles" :key="file.id" class="grid grid-cols-6 p-4 hover:bg-gray-50 transition-colors duration-200 
                   transform hover:scale-[1.01] origin-top will-change-transform">
                        <div class="text-[#8DAD9D] truncate">{{ formatDate(file.date) }}</div>
                        <div class="text-[#8DAD9D] truncate">{{ file.type }}</div>
                        <div class="text-[#8DAD9D] truncate">{{ file.city }}</div>
                        <div class="text-[#8DAD9D] truncate">{{ file.district }}</div>
                        <div class="text-[#005C53] font-bold truncate">
                            {{ formatAmount(file.amount) }} XAF
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-gray-200 rounded-full overflow-hidden 
                       shadow-sm animate-pulse-slow"></div>
                            <span class="text-gray-600 truncate">{{ file.agent }}</span>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Initialize the files array
const files = ref([]);

// Function to generate random data
const generateRandomFiles = (count) => {
    const types = ['Appartement Moderne', 'Villa', 'Studio', 'Loft', 'Maison'];
    const cities = ['Yaoundé', 'Douala', 'Bafoussam', 'Sangmelima', 'Bertoua'];
    const districts = ['Tsinga', 'Akwa', 'Essos', 'Biyem-Assi', 'Mokolo'];
    const agents = ['Abaze Clovis', 'Nana Didier', 'Mouelle Jean', 'Tchouangui Marc', 'Nguefack Pierre'];

    for (let i = 0; i < count; i++) {
        const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
        const randomAmount = Math.floor(Math.random() * (300000 - 50000 + 1)) + 50000; // Amount between 50,000 and 300,000
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];

        files.value.push({
            id: i + 1,
            date: randomDate,
            type: randomType,
            city: randomCity,
            district: randomDistrict,
            amount: randomAmount,
            agent: randomAgent
        });
    }
};

// Call the function to generate random files
generateRandomFiles(10); // Generate 10 random files
const sortType = ref('date')

const sortedFiles = computed(() => {
    return [...files.value].sort((a, b) => {
        if (sortType.value === 'date') {
            return new Date(b.date) - new Date(a.date)
        }
        return b.amount - a.amount
    })
})

const sortByDate = () => {
    sortType.value = 'date'
}

const sortByAmount = () => {
    sortType.value = 'amount'
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount)
}
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #A2C02D;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #8DAD9D;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulseSlow {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

.animate-fade-in {
    animation: fadeIn 0.7s ease-out;
}

.animate-slide-in-right {
    animation: slideInRight 0.7s ease-out;
}

.animate-pulse-slow {
    animation: pulseSlow 3s infinite;
}

/* List Transition */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-move {
    transition: transform 0.5s ease;
}
</style>



