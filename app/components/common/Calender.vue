<template>
  <div class="w-full max-w-[450px] bg-white rounded-xl overflow-hidden shadow-lg">
    <!-- Helper Text -->
    <div class="bg-white p-3 border-b">
      <p class="text-sm text-[#005C53] text-center">
        Select dates by choosing an availability mode below
      </p>
      
      <!-- Availability Toggle Buttons -->
      <div class="flex justify-center gap-5 mt-3">
        
        <button
          @click="setAvailabilityMode('available')"
          class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
          :class="[
            availabilityMode === 'available' 
              ? 'bg-emerald-100 ring-2 ring-[#2FAC66] ring-offset-2' 
              : 'hover:bg-[#2FAC66]/20'
          ]"
        >
          <div class="w-3 h-3 bg-[#2FAC66] rounded-full" />
          <span class="text-sm font-medium" :class="[
            availabilityMode === 'available' ? 'text-emerald-700' : 'text-black'
          ]">Available</span>
        </button>
        <button
          @click="setAvailabilityMode('unavailable')"
          class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
          :class="[
            availabilityMode === 'unavailable' 
              ? 'bg-orange-100 ring-2 ring-[#F24405] ring-offset-2' 
              : 'hover:bg-[#F24405]/20'
          ]"
        >
          <div class="w-3 h-3 bg-[#F24405] rounded-full" />
          <span class="text-sm font-medium" :class="[
            availabilityMode === 'unavailable' ? 'text-[#F24405]' : 'text-black'
          ]">Unavailable</span>
        </button>
      </div>
    </div>

    <!-- Header with Month/Year Selection -->
    <div class="p-2">
      <div class="flex items-center justify-between mb-4">
        <!-- Month Selection -->
        <select
          v-model="selectedMonth"
          class="text-xl font-black bg-transparent cursor-pointer outline-none hover:text-emerald-600 transition-colors"
        >
          <option v-for="(month, index) in monthNames" :key="index" :value="index">
            {{ month }}
          </option>
        </select>

        <!-- Year Navigation -->
        <div class="flex items-center rounded-lg bg-[#D9F9E9] gap-2">
          <button
            @click="previousYear"
            :disabled="selectedYear <= new Date().getFullYear()"
            class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          ><
            <span class="i-heroicons-chevron-left-20-solid w-4 h-4 text-gray-500" />
          </button>
          <span class="text-lg font-medium text-gray-700">{{ selectedYear }}</span>
          <button
            @click="nextYear"
            class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >>
            <span class="i-heroicons-chevron-right-20-solid w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-1">
        <!-- Weekday Headers -->
        <template v-for="day in weekDays" :key="day">
          <div class="text-center p-2 rounded-lg bg-white">
            <span class="text-md font-bold text-[#A2C02D]">{{ day }}</span>
          </div>
        </template>

        <!-- Calendar Days -->
        <template v-for="(day, index) in calendarDays" :key="index">
          <button
            @click="toggleDate(day)"
            :disabled="!day.isCurrentMonth"
            class="group relative w-full aspect-square  border-[#A2C02D]/40 border p-2  text-sm font-medium transition-all duration-200"
            :class="[
              day.isCurrentMonth ? 'hover:scale-105 rounded-lg' : 'text-gray-300 rounded-lg',
              day.isAvailable && 'bg-[#2FAC66] hover:bg-emerald-600 rounded-lg text-white shadow-lg shadow-emerald-200',
              day.isUnavailable && 'bg-[#F24405] hover:bg-orange-600 text-white shadow-lg rounded-full shadow-orange-200',
              day.isToday && !day.isAvailable && !day.isUnavailable && 'text-[#2FAC66] rounded-lg font-bold ring-2 ring-emerald-500',
              !day.isToday && !day.isAvailable && !day.isUnavailable && 'bg-white rounded-lg'

            ]"
          >
            <span class="absolute inset-0 flex items-center justify-center">
              {{ day.date }}
            </span>
            <div
              v-if="day.isCurrentMonth && !day.isAvailable && !day.isUnavailable"
              class="absolute inset-0 rounded-lg bg-gray-500 opacity-0 group-hover:opacity-10 transition-opacity"
            />
          </button>
        </template>
      </div>
    </div>

    <!-- Month Navigation -->
    <div class="p-4 w-full  border-t border-gray-100">
      <div class="flex items-center space-x-2 justify-between">
        <button
          @click="previousMonth"
          class="flex justify-center items-center w-full bg-[#005C53] gap-2 px-4 py-2 rounded-lg hover:bg-[#005C53]/40 transition-colors"
        >
          <span class="i-heroicons-chevron-left-20-solid w-5 h-5 text-gray-500" />
          <span class="text-sm font-medium text-white">Previous</span>
        </button>
        <button
          @click="nextMonth"
          class="flex bg-[#005C53] w-full items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-[#005C53]/40 hover:text-[#005C53] transition-colors"
        >
          <span class="text-sm font-medium text-white">Next</span>
          <span class="i-heroicons-chevron-right-20-solid w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  // Core imports
  const selectedMonth = ref(new Date().getMonth())
  const selectedYear = ref(new Date().getFullYear())
  const availableDates = ref(new Set())
  const unavailableDates = ref(new Set())
  const availabilityMode = ref(null)
  
  // Constants
  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
  const monthNames = [
    'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
    'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'
  ]
  
  // Computed properties
  const yearRange = computed(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)
  })
  
  const currentDate = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value, 1)
  })
  
  const calendarDays = computed(() => {
    const year = selectedYear.value
    const month = selectedMonth.value
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const days = []
    const today = new Date()
    
    // Previous month days
    for (let i = 0; i < firstDay.getDay(); i++) {
      const date = new Date(year, month, -i)
      days.unshift(createDayObject(date))
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      days.push(createDayObject(date))
    }
    
    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push(createDayObject(date))
    }
    
    return days
  })
  
  // Methods
  function createDayObject(date) {
    const dateString = date.toDateString()
    const today = new Date()
    
    return {
      date: date.getDate(),
      isCurrentMonth: date.getMonth() === selectedMonth.value,
      fullDate: date,
      isAvailable: availableDates.value.has(dateString),
      isUnavailable: unavailableDates.value.has(dateString),
      isToday: date.toDateString() === today.toDateString()
    }
  }
  
  function toggleDate(day) {
    if (!day.isCurrentMonth) return
    
    const dateString = day.fullDate.toDateString()
    
    if (availabilityMode.value === 'available') {
      unavailableDates.value.delete(dateString)
      availableDates.value.add(dateString)
    } else if (availabilityMode.value === 'unavailable') {
      availableDates.value.delete(dateString)
      unavailableDates.value.add(dateString)
    }
  }
  
  function setAvailabilityMode(mode) {
    availabilityMode.value = availabilityMode.value === mode ? null : mode
  }
  
  function nextMonth() {
    if (selectedMonth.value === 11) {
      selectedMonth.value = 0
      selectedYear.value++
    } else {
      selectedMonth.value++
    }
  }
  
  function previousMonth() {
    if (selectedMonth.value === 0) {
      selectedMonth.value = 11
      selectedYear.value--
    } else {
      selectedMonth.value--
    }
  }

  function nextYear() {
  selectedYear.value++
}

function previousYear() {
  if (selectedYear.value > new Date().getFullYear()) {
    selectedYear.value--
  }
}
  </script>

<style scoped>
/* Optional: Add these styles for smoother animations */
button {
  -webkit-tap-highlight-color: transparent;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.calendar-enter-active,
.calendar-leave-active {
  transition: all 0.3s ease;
}

.calendar-enter-from,
.calendar-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>