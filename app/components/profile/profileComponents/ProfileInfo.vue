<template>
  <div class="space-y-6 animate-fadeIn">
    <div v-if="isEditing">
      <!-- Editable Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <input 
            v-model="userData.firstName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2FAC66] focus:ring-[#2FAC66] transition-all duration-200"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <input 
            v-model="userData.lastName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2FAC66] focus:ring-[#2FAC66] transition-all duration-200"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <input 
            v-model="userData.phone"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2FAC66] focus:ring-[#2FAC66] transition-all duration-200"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="userData.email"
            type="email"
            disabled
            class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">About</label>
          <textarea
            v-model="userData.about"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2FAC66] focus:ring-[#2FAC66] transition-all duration-200"
          ></textarea>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Display Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-50 p-4 rounded-lg transition-all duration-200 hover:bg-[#D9F9E9]">
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <p class="mt-1 text-gray-900 font-medium">{{ user.firstName }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg transition-all duration-200 hover:bg-[#D9F9E9]">
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <p class="mt-1 text-gray-900 font-medium">{{ user.lastName }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg transition-all duration-200 hover:bg-[#D9F9E9]">
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <p class="mt-1 text-gray-900 font-medium">{{ user.phone }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg transition-all duration-200 hover:bg-[#D9F9E9]">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-gray-900 font-medium">{{ user.email }}</p>
        </div>
        <div class="md:col-span-2 bg-gray-50 p-4 rounded-lg transition-all duration-200 hover:bg-[#D9F9E9]">
          <label class="block text-sm font-medium text-gray-700">About</label>
          <p class="mt-1 text-gray-700 leading-relaxed">{{ user.about }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const { user } = toRefs(props)
const userData = ref({ ...user.value })

// Update userData when user prop changes
watch(user, (newUser) => {
  userData.value = { ...newUser }
})
</script>
