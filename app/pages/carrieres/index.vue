<template>
    <div class="max-w-6xl mx-auto p-4 md:p-8 lg:p-10">
      <div class="bg-white rounded-2xl md:rounded-[32px] p-4 md:p-8 relative shadow-lg">
        <!-- Close Button -->
        <button @click="$emit('close')"
          class="absolute top-4 right-4 md:top-6 md:right-6 text-2xl font-bold hover:opacity-70 transition-opacity">
          ×
        </button>
  
        <!-- Header -->
        <div class="mb-6 md:mb-8">
          <h1 class="text-3xl md:text-4xl lg:text-6xl font-black tracking-wider mb-2">PLANIFIER VOTRE VISITE</h1>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h2 class="text-xl md:text-2xl font-bold">APPARTEMENT MODERNE</h2>
            <div class="flex items-center text-[#A2C02D] gap-1">
              <img src="/icons/location-icon.svg" alt="location-icon" class="h-4 md:h-5">
              <span class="text-base md:text-xl font-bold">MESSAMENDONGO, ODZA, YAOUNDÉ</span>
            </div>
          </div>
        </div>
  
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-4">
          <!-- Calendar Section -->
          <div class="w-full lg:w-1/3">
            <!-- Month and Year Header -->
            <div class="flex justify-between items-center mb-4 md:mb-6">
              <div class="relative inline-block">
                <button @click="toggleMonthSelect" class="flex items-center gap-2 text-lg md:text-xl font-bold">
                  {{ currentMonth }}
                  <i class="fas fa-chevron-down text-sm transition-transform"
                    :class="{ 'rotate-180': isMonthSelectOpen }"></i>
                </button>
                <!-- Month Dropdown -->
                <TransitionRoot appear :show="isMonthSelectOpen">
                  <div class="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 z-50 min-w-[160px]">
                    <div v-for="month in months" :key="month" @click="selectMonth(month)"
                      class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      :class="{ 'text-[#8BC34A]': month === currentMonth }">
                      {{ month }}
                    </div>
                  </div>
                </TransitionRoot>
              </div>
  
              <span class="px-4 py-1 bg-[#E8F5E9] text-green-800 rounded-full text-sm">
                {{ currentYear }}
              </span>
            </div>
  
            <!-- Calendar Grid -->
            <div class="bg-[#D9F9E9] rounded-2xl">
              <!-- Weekdays Header -->
              <div class="grid grid-cols-7 mb-2 p-2">
                <div v-for="day in weekDays" :key="day" class="text-center text-xs font-medium text-black">
                  {{ day }}
                </div>
              </div>
  
              <!-- Calendar Days -->
              <div class="grid grid-cols-7 gap-[1px] rounded-2xl bg-[#D9F9E9]">
                <button v-for="date in calendarDates" :key="`${date.day}-${date.month}`"
                  @click="selectDate(date)" :disabled="!date.isCurrentMonth"
                  class="flex items-center aspect-square rounded-lg justify-center text-sm relative transition-all duration-200"
                  :class="[
                    date.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-[#D9F9E9]/50 text-black',
                    isSelectedDate(date) ? 'selected-date' : '',
                  ]">
                  {{ date.day }}
                </button>
              </div>
            </div>
  
            <!-- Time Selection -->
            <div class="mt-6 md:mt-8 w-full flex items-center gap-3 md:gap-4">
              <div class="flex gap-2">
                <button @click="nextMonth"
                  class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100">
                  ▲
                </button>
                <button @click="previousMonth"
                  class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100">
                  ▼
                </button>
              </div>
  
              <div class="w-full">
                <div class="relative">
                  <button @click="toggleTimeSelect"
                    class="w-full flex items-center justify-between bg-white shadow-lg rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-gray-200 transition-colors">
                    <span>{{ selectedTime }}</span>
                    <i class="fas fa-chevron-down transition-transform"
                      :class="{ 'rotate-180': isTimeSelectOpen }"></i>
                  </button>
  
                  <TransitionRoot appear :show="isTimeSelectOpen">
                    <div class="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-xl py-2 z-50">
                      <div v-for="time in timeOptions" :key="time" @click="selectTime(time)"
                        class="px-4 md:px-6 py-2 hover:bg-gray-100 cursor-pointer"
                        :class="{ 'text-[#8BC34A]': time === selectedTime }">
                        {{ time }}
                      </div>
                    </div>
                  </TransitionRoot>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Details Section -->
          <div class="w-full lg:w-2/3 lg:px-10">
            <!-- Appointment Summary -->
            <div class="mb-4 md:mb-6">
              <p class="text-black font-extrabold text-lg md:text-xl mb-1">Vous prenez rendez-vous pour le</p>
              <p class="text-[#F24405] font-extrabold text-2xl md:text-3xl">
                {{ formatAppointmentDate() }}
              </p>
              <p class="text-[#F24405] font-extrabold text-2xl md:text-3xl">en {{ selectedTime }}</p>
            </div>
  
            <!-- Information Text -->
            <div class="text-xs text-[#8DAD9D] space-y-1 mb-6 md:mb-8">
              <p>• L'agent immobilier vous contactera pour fixer avec vous les détails exacts du rendez-vous.</p>
              <p>• Payez vos frais de visite exclusivement avec vos pièces YGHO afin d'éviter tout risque.</p>
              <p>• Si voulu, vous pouvez obtenir le logement directement en
                <button class="text-[#F24405] hover:underline focus:outline-none">
                  cliquant ici
                </button>
              </p>
            </div>
  
            <!-- Reminder Options -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <label v-for="reminder in reminderOptions" :key="reminder.id"
                class="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" v-model="reminder.selected" class="mt-1 aspect-square">
                <div class="flex items-center gap-2">
                  <img :src="reminder.icon" :class="[reminder.icon, 'w-5 md:w-6 h-5 md:h-6 flex items-center justify-center']" />
                  <span class="text-xs font-extrabold leading-tight group-hover:text-[#A2C02D] transition-colors">
                    {{ reminder.label }}
                  </span>
                </div>
              </label>
            </div>
  
            <!-- Action Button and Balance -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="validateAppointment"
                class="w-full bg-[#A2C02D] hover:bg-[#7CB342] text-white py-3 md:py-4 rounded-xl relative overflow-hidden group transition-colors">
                <div class="flex flex-col sm:flex-row items-center justify-center gap-1">
                  <span class="font-medium text-sm">VALIDER LE RENDEZ-VOUS</span>
                  <span class="text-xs opacity-80">PAIEMENT DES FRAIS DE VISITE</span>
                  <i class="fas fa-chevron-down ml-2 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </button>
  
              <div class="w-full sm:w-1/4 flex sm:flex-col justify-between sm:justify-start items-center sm:items-baseline">
                <div class="space-x-3">
                  <span class="text-2xl md:text-4xl font-extrabold text-[#F24405]">05</span>
                  <span class="text-sm font-extrabold text-[#F24405]">Pièces</span>
                </div>
                <div class="hidden sm:block border border-[#8DAD9D] w-1/2"></div>
                <div class="text-[#8DAD9D] text-sm">
                  Votre Solde
                  <span class="font-extrabold text-lg md:text-xl block">7 585 P.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { TransitionRoot } from '@headlessui/vue'

// Constants
const months = [
    'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
    'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'
]
const weekDays = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM']
const timeOptions = ['Matin', 'Après-midi', 'Soir']

// State
const now = new Date()
const currentMonth = ref(months[now.getMonth()])
const currentYear = ref(now.getFullYear())
const selectedDate = ref(now.getDate())
const selectedTime = ref('Après-midi')

// Dropdown States
const isMonthSelectOpen = ref(false)
const isTimeSelectOpen = ref(false)

// Reminder Options
const reminderOptions = ref([
    {
        id: 1,
        label: 'ME RAPPELER PAR WHATSAPP MESSENGER',
        icon: '/icons/socials/whatsapp-icon.svg',
        selected: false
    },
    {
        id: 2,
        label: 'RAPPEL PAR SMS',
        icon: '/icons/socials/sms-icon.svg',
        selected: false
    },
    {
        id: 3,
        label: 'ME RAPPELER PAR GOOGLE CALENDAR',
        icon: '/icons/socials/google-calendar-icon.svg',
        selected: false
    },
    {
        id: 4,
        label: 'LIEU DE RENDEZ-VOUS SUR GOOGLE MAPS',
        icon: '/icons/socials/maps-icon.svg',
        selected: false
    }
])

const previousMonth = () => {
    const currentIndex = months.indexOf(currentMonth.value)
    if (currentIndex === 0) {
        currentMonth.value = months[11]
        currentYear.value--
    } else {
        currentMonth.value = months[currentIndex - 1]
    }
}

const nextMonth = () => {
    const currentIndex = months.indexOf(currentMonth.value)
    if (currentIndex === 11) {
        currentMonth.value = months[0]
        currentYear.value++
    } else {
        currentMonth.value = months[currentIndex + 1]
    }
}

// Calendar Computed
const calendarDates = computed(() => {
    const dates = []
    const monthIndex = months.indexOf(currentMonth.value)
    const firstDay = new Date(currentYear.value, monthIndex, 1)
    const lastDay = new Date(currentYear.value, monthIndex + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay()
    // Adjust for Monday as first day of week
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    // Previous month days
    const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1
    const prevMonthDays = new Date(currentYear.value, monthIndex, 0).getDate()

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        dates.push({
            day: prevMonthDays - i,
            month: prevMonth,
            year: monthIndex === 0 ? currentYear.value - 1 : currentYear.value,
            isCurrentMonth: false
        })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        dates.push({
            day: i,
            month: monthIndex,
            year: currentYear.value,
            isCurrentMonth: true
        })
    }

    // Calculate remaining days needed
    const totalDays = 42 // 6 rows * 7 days
    const remainingDays = totalDays - dates.length
    const nextMonth = monthIndex === 11 ? 0 : monthIndex + 1

    // Next month days
    for (let i = 1; i <= remainingDays; i++) {
        dates.push({
            day: i,
            month: nextMonth,
            year: monthIndex === 11 ? currentYear.value + 1 : currentYear.value,
            isCurrentMonth: false
        })
    }

    return dates
})

// Methods
const toggleMonthSelect = () => {
    isMonthSelectOpen.value = !isMonthSelectOpen.value
    isTimeSelectOpen.value = false
}

const toggleTimeSelect = () => {
    isTimeSelectOpen.value = !isTimeSelectOpen.value
    isMonthSelectOpen.value = false
}

const selectMonth = (month) => {
    currentMonth.value = month
    isMonthSelectOpen.value = false
}

const selectTime = (time) => {
    selectedTime.value = time
    isTimeSelectOpen.value = false
}

const selectDate = (date) => {
    if (date.isCurrentMonth) {
        selectedDate.value = date.day
    }
}

const isSelectedDate = (date) => {
    return date.isCurrentMonth && date.day === selectedDate.value
}

const formatAppointmentDate = () => {
    const weekDay = new Date(
        currentYear.value,
        months.indexOf(currentMonth.value),
        selectedDate.value
    ).getDay()

    const weekDayNames = [
        'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
        'Jeudi', 'Vendredi', 'Samedi'
    ]

    return `${weekDayNames[weekDay]} ${selectedDate.value} ${currentMonth.value} ${currentYear.value}`
}

const validateAppointment = () => {
    const appointment = {
        date: selectedDate.value,
        month: currentMonth.value,
        year: currentYear.value,
        time: selectedTime.value,
        reminders: reminderOptions.value.filter(opt => opt.selected)
    }
    console.log('Appointment validated:', appointment)
    // Implement your validation logic here
}

// Click outside to close dropdowns
const closeDropdowns = (event) => {
    const isClickOutside = !event.target.closest('.calendar-section')
    if (isClickOutside) {
        isMonthSelectOpen.value = false
        isTimeSelectOpen.value = false
    }
}

// Lifecycle hooks
onMounted(() => {
    document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdowns)
})
</script>

<style scoped>
.calendar-section {
    position: relative;
}

.selected-date {
    @apply rounded-full;
    background-color: #F24405 !important;
    color: white;
    position: relative;
}

.selected-date::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background-color: #F24405;
    z-index: -1;
}

input[type="checkbox"] {
    accent-color: #8BC34A;
    width: 20px;
    height: 20px;
    border-radius: 4px;
}

/* Transitions */
.calendar-wrapper,
.time-selector {
    transition: all 0.2s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }

    .calendar-section {
        order: 1;
    }

    .appointment-details {
        order: 2;
    }
}

/* Calendar Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-content {
    animation: fadeIn 0.2s ease-out;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>