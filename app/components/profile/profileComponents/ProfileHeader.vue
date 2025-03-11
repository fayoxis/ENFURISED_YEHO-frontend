<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl">
    <div class="flex flex-col md:flex-row md:items-start gap-6">
      <div class="relative mx-auto md:mx-0 group">
        <img 
          :src="user.profilePicture || 'https://via.placeholder.com/120'" 
          class="w-32 h-32 rounded-full border-4 border-[#D9F9E9] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button 
          @click="$emit('upload-image')"
          class="absolute bottom-0 right-0 bg-[#2FAC66] text-white p-2 rounded-full hover:bg-[#239057] transition-all duration-200 shadow-lg transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      <div class="flex-1">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="text-center md:text-left">
            <h2 class="text-3xl font-bold text-[#005C53] transition-all duration-300 hover:text-[#00423C]">
              {{ user.firstName }} {{ user.lastName }}
            </h2>
            <p class="text-[#8DAD9D] font-medium">{{ user.role }}</p>
          </div>
          <button 
            @click="$emit('toggle-edit')"
            class="mt-4 sm:mt-0 bg-[#2FAC66] text-white px-6 py-2.5 rounded-lg hover:bg-[#239057] transition-all duration-200 font-medium transform hover:scale-105 shadow-md"
          >
            {{ isEditing ? 'Save Changes' : 'Edit Profile' }}
          </button>
        </div>
        <div class="mt-4">
          <p class="text-gray-600 leading-relaxed">{{ user.about || 'No description provided' }}</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
          <div class="text-center group cursor-pointer transform transition-all duration-200 hover:scale-105">
            <span class="block text-2xl font-bold text-[#005C53] group-hover:text-[#A2C02D]">{{ user.followers }}</span>
            <span class="text-gray-600">Followers</span>
          </div>
          <div class="text-center group cursor-pointer transform transition-all duration-200 hover:scale-105">
            <span class="block text-2xl font-bold text-[#005C53] group-hover:text-[#A2C02D]">{{ user.following }}</span>
            <span class="text-gray-600">Following</span>
          </div>
          <div class="text-center group cursor-pointer transform transition-all duration-200 hover:scale-105">
            <span class="block text-2xl font-bold text-[#005C53] group-hover:text-[#A2C02D]">{{ user.properties }}</span>
            <span class="text-gray-600">Properties</span>
          </div>
          <div class="text-center group cursor-pointer transform transition-all duration-200 hover:scale-105">
            <span class="flex items-center justify-center">
              <span class="text-2xl font-bold text-[#005C53] group-hover:text-[#A2C02D]">{{ user.rating }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span class="text-gray-600">Rating</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-edit', 'upload-image'])
</script>