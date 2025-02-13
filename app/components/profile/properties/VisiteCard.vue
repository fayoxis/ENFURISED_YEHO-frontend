<template>
    <div class="max-w-md w-full transition-all duration-300  px-5"
        :class="[mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']">
        <div class="p-3 shadow-black shadow-2xl rounded-lg absolute top-6 left-0 w-11 h-11 items-center hover:border-2 "
            :class="visit.status === 'visited' ? 'bg-[#8DAD9D] ' : ' bg-white'">
            <img :src="visit.status === 'visited' ? '/icons/profile/visited-icon.svg' : '/icons/home/follow-procedure-icon.svg'"
                class="w-5 h-5" style="fill: currentColor;" />
        </div>
        <div :class="[
            'p-4 rounded-xl shadow-xl border transition-all duration-300 hover:shadow-md px-6',
            visit.status === 'visited'
                ? 'bg-[#F3F3F3] shadow-xl border-gray-100'
                : 'bg-white border-green-50'
        ]">

            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                    <h3 class="text-2xl font-extrabold "
                        :class="visit.status === 'visited' ? 'text-[#8DAD9D]' : 'text-[#005C53]'">{{ visit.propertyName
                        }}</h3>
                </div>
            </div>

            <!-- Price and Location -->
            <div class="flex items-center flex-wrap gap-x-1  mb-3"
                :class="visit.status === 'visited' ? 'text-[#2FAC66] ' : ' text-[#A2C02D]'">
                <div class="space-x-1 px-1 border-b-2 border-[#8DAD9D] flex-row">
                    <span class="font-semibold">{{ formatPrice(visit.price) }} {{ visit.currency }}</span>
                    <span>/</span>
                    <span>{{ visit.period }}</span>
                </div>
                <img :src="visit.status === 'visited' ? '/icons/profile/visited-location.svg' : '/icons/location-icon.svg'"
                    alt="location-icon" class="w-4 h-4" />
                <span class="text-md font-bold "
                    :class="visit.status === 'visited' ? 'text-[#8DAD9D]' : 'text-black'">{{ visit.location.area }}, {{
                        visit.location.city }}</span>
            </div>

            <!-- Agent Info -->
            <div class="flex">
                <div class="flex w-2/3 items-center gap-7">
                    <div class="relative w-8 h-8 rounded-full overflow-hidden "
                        :class="visit.status === 'visited' ? 'bg-[#8DAD9D]' : 'bg-[#D9F9E9]'">
                        <img v-if="visit.agent.avatar" :src="visit.agent.avatar" :alt="visit.agent.name"
                            class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                            <Icon name="mdi:account" class="w-5 h-5" />
                        </div>
                    </div>
                    <span class="font-bold" 
                    :class="visit.status === 'visited' ? 'text-[#8DAD9D]' : 'text-black'">{{
                        visit.agent.name }}</span>
                </div>
                <div class="justify-end flex w-1/3">
                    <div v-if="visit.status === 'pending'"
                        class="bg-[#F24405] justify-center items-center  px-5 text-white text-sm py-1 rounded-md font-medium">
                        <p>{{ visit.timeSlot }}</p>
                    </div>
                </div>
            </div>

                        <!-- unvisited view -->

            <div v-if="visit.status !== 'visited'" class="flex items-center py-2 space-x-5 ">
                <button v-if="!showContacts" @click="toggleContacts"
                    class="bg-[#005C53] w-2/3 text-white rounded-xl py-1 mt-3">
                    Afficher les contacts
                </button>

                <!-- Contact Buttons -->
                <div v-if="showContacts" class="flex items-center gap-4 mt-4 w-full">
                    <a :href="`tel:${visit.agent.phone}`"
                        class="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                        <Icon name="mdi:phone" class="w-5 h-5" />
                        <span class="text-xs font-semibold">{{ formatPhone(visit.agent.phone) }}</span>
                    </a>
                    <a :href="`https://wa.me/${visit.agent.whatsapp}`" target="_blank" rel="noopener noreferrer"
                        class="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                        <Button @click="toggleContacts">
                            <Icon name="mdi:whatsapp" class="w-5 h-5" />
                            <span class="text-xs font-semibold">{{ formatPhone(visit.agent.whatsapp) }}</span>
                        </Button>

                    </a>
                </div>
                <div class="flex py-2 space-x-4 w-1/4  justify-end items-center ">
                    <button class="items-center justify-center">
                        <img src="/icons/profile/trash-icon.svg" />
                    </button>
                    <button class="items-center justify-center">
                        <img src="/icons/profile/calender-icon.svg" />
                    </button>
                </div>
            </div>

            <!-- visited view -->
            <div v-else class="flex items-center py-2 space-x-5 ">

                <!-- Contact Buttons -->
                <div v class="flex items-center gap-4 mt-4 w-full" >
                    <a :href="`tel:${visit.agent.phone}`"
                        class="flex items-center gap-2 text-[#8DAD9D] hover:text-green-600 transition-colors">
                        <Icon name="mdi:phone" class="w-5 h-5" />
                        <span class="text-xs font-semibold">{{ formatPhone(visit.agent.phone) }}</span>
                    </a>
                    <a :href="`https://wa.me/${visit.agent.whatsapp}`" target="_blank" rel="noopener noreferrer"
                        class="flex items-center gap-2 text-[#8DAD9D] hover:text-green-600 transition-colors">
                        <Button @click="toggleContacts">
                            <Icon name="mdi:whatsapp" class="w-5 h-5" />
                            <span class="text-xs font-semibold">{{ formatPhone(visit.agent.whatsapp) }}</span>
                        </Button>

                    </a>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    visit: {
        type: Object,
        required: true,
        default: () => ({
            status: 'pending',
            propertyName: '',
            price: 0,
            currency: 'XAF',
            period: 'Mois',
            location: {
                area: '',
                city: ''
            },
            agent: {
                name: '',
                avatar: '',
                phone: '',
                whatsapp: ''
            },
            timeSlot: ''
        })
    }
})

const showContacts = ref(false)
const mounted = ref(false)

const toggleContacts = () => {
    showContacts.value = !showContacts.value
}

const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price)
}

const formatPhone = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
}

onMounted(() => {
    mounted.value = true
})
</script>