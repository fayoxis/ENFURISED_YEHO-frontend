<template>
    <div class="flex gap-2 px-4 py-2 overflow-auto">
      <button
        v-for="filter in filters"
        :key="filter.id"
        @click="$emit('setFilter', filter.id)"
        :class="[
          'px-3 py-1 rounded-full text-sm transition-colors',
          activeFilter === filter.id
            ? 'bg-[#005C53] text-white'
            : 'bg-[#8DAD9D] text-white hover:bg-gray-300'
        ]"
      >
        {{ filter.name }}
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps(['filters', 'activeFilter'])
  defineEmits(['setFilter'])
  </script>