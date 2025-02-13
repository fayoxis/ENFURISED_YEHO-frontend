<template>
    <div class="p-4  bg-white border-[#8DAD9D]">
      <div class="relative">
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          type="text"
          placeholder="Search conversations..."
          class="w-full px-4 py-2 border-2 border-[#8DAD9D] rounded-lg focus:ring-2 focus:ring-[#005C53] focus:border-transparent"
        />
        <span class="absolute right-3 top-2.5 text-[#8DAD9D]">
          <img src="/icons/search-icon.svg" alt="" srcset="">
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['searchQuery'])
  defineEmits(['update:searchQuery'])
  </script>