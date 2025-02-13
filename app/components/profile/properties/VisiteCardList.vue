<template>
    <div class="container mx-auto ">
        <!-- Date Selector Component -->
        <div class="flex justify-center items-center mb-6">
            <div class="flex items-center space-x-4">
                <button @click="changeDate(-1)" class="text-gray-600 hover:text-gray-800">
                    <Icon name="mdi:chevron-left" class="w-6 h-6" />
                </button>

                <div class="flex items-center justify-center lg:px-10  w-full bg-white rounded-lg">
                    <span class="text-[#F24405] font-bold text-4xl lg:text-7xl">
                        {{ formatDate(selectedDate) }}
                    </span>
                </div>

                <button @click="changeDate(1)" class="text-gray-600 hover:text-gray-800">
                    <Icon name="mdi:chevron-right" class="w-6 h-6" />
                </button>
            </div>
        </div>

        <!-- Visits List -->
        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <VisitCard v-for="visit in filteredAndPaginatedVisits" :key="visit.id" :visit="visit" />
            </div>
        </div>


        <!-- Pagination Controls -->
        <div class="flex justify-center items-center space-x-4 mt-6">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300">
                Previous
            </button>

            <div class="flex items-center space-x-2">
                <span class="text-gray-700">Page</span>
                <select v-model="currentPage" class="border rounded px-2 py-1">
                    <option v-for="page in totalPages" :key="page" :value="page">
                        {{ page }}
                    </option>
                </select>
                <span class="text-gray-700">of {{ totalPages }}</span>
            </div>

            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300">
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, addDays } from 'date-fns'
import VisitCard from './VisiteCard.vue'

interface Visit {

    id: string;

    propertyName: string;

    price: number;

    currency: string;

    period: string;

    location: {

        area: string;

        city: string;

    };

    agent: {

        id: string;

        name: string;

        avatar?: string;

        phone: string;

        whatsapp: string;

    };

    status: 'pending' | 'visited';

    timeSlot: 'MATIN' | 'SOIR';

    createdAt: string;

    updatedAt: string;

}
// Function to generate random phone number

const generatePhone = (): string => {

    return `237${Math.floor(600000000 + Math.random() * 900000000)}`

}



// Function to generate random visit data with date
const generateVisitData = (count: number): Visit[] => {
    const areas = ['Akwa', 'Bonanjo', 'Bonapriso', 'Makepe', 'Ndogbong']
    const cities = ['Douala', 'Douala', 'Douala', 'Douala', 'Douala']
    const propertyNames = [
        'Luxury Apartment', 'Spacious Duplex', 'Modern Condo',
        'Cozy Studio', 'Family Home', 'Beachfront Villa'
    ]
    const agentNames = [
        'Jean Dupont', 'Marie Lefebvre', 'Pierre Martin',
        'Sophie Dubois', 'Luc Rousseau'
    ]

    const baseDate = new Date() // Current date

    return Array.from({ length: count }, (_, index) => {
        // Randomly distribute visits within ±7 days of the current date
        const visitDate = addDays(baseDate, Math.floor(Math.random() * 15) - 7)

        return {
            id: `visit_${index + 1}`,
            propertyName: propertyNames[Math.floor(Math.random() * propertyNames.length)],
            price: Math.floor(50000 + Math.random() * 500000),
            currency: 'XAF',
            period: 'month',
            location: {
                area: areas[Math.floor(Math.random() * areas.length)],
                city: cities[Math.floor(Math.random() * cities.length)]
            },
            agent: {
                id: `agent_${index + 1}`,
                name: agentNames[Math.floor(Math.random() * agentNames.length)],
                avatar: Math.random() > 0.5 ? undefined : `https://i.pravatar.cc/150?u=${index}`,
                phone: generatePhone(),
                whatsapp: generatePhone()
            },
            status: Math.random() > 0.5 ? 'pending' : 'visited',
            timeSlot: Math.random() > 0.5 ? 'MATIN' : 'SOIR',
            createdAt: visitDate.toISOString(),
            updatedAt: visitDate.toISOString()
        }
    })
}

// Generate visits
const visits = ref<Visit[]>(generateVisitData(300))

// Date selection
const selectedDate = ref(new Date())

// Format date for display
const formatDate = (date: Date): string => {
    return format(date, 'dd MMM yyyy')
}

// Change date method
const changeDate = (direction: number) => {
    selectedDate.value = addDays(selectedDate.value, direction)
    // Reset to first page when changing date
    currentPage.value = 1
}

// Pagination
const currentPage = ref(1)
const visitsPerPage = 4

// Filter visits by selected date
const filteredVisits = computed(() => {
    return visits.value.filter(visit => {
        const visitDate = new Date(visit.createdAt)
        return format(visitDate, 'dd MMM yyyy') === format(selectedDate.value, 'dd MMM yyyy')
    })
})

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(filteredVisits.value.length / visitsPerPage))

const filteredAndPaginatedVisits = computed(() => {
    const start = (currentPage.value - 1) * visitsPerPage
    const end = start + visitsPerPage
    return filteredVisits.value.slice(start, end)
})

// Pagination methods
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