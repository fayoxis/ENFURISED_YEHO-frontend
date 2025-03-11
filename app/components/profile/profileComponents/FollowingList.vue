<template>
    <div class="space-y-6 animate-fadeIn">
      <h3 class="text-lg font-semibold text-[#005C53] mb-4">People You Follow</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="followedUser in following" 
          :key="followedUser.id"
          class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:border-[#D9F9E9] hover:shadow-md flex items-center gap-4"
        >
          <img :src="followedUser.image" class="w-12 h-12 rounded-full border-2 border-[#D9F9E9]" />
          <div>
            <h4 class="font-semibold text-[#005C53]">{{ followedUser.name }}</h4>
            <p class="text-sm text-[#8DAD9D]">{{ followedUser.role }}</p>
            <p class="text-xs text-gray-500 mt-1">Following since {{ followedUser.joinedDate }}</p>
          </div>
          <button class="ml-auto bg-[#2FAC66] text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:bg-[#239057]">
            Unfollow
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    following: {
      type: Array,
      required: true
    }
  })
  </script>
  