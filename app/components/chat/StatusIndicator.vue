<template>
    <span 
      class="flex items-center"
      :title="status"
    >
      <span 
        class="w-2 h-2 rounded-full"
        :class="{
          'bg-green-500': status === 'Online',
          'bg-yellow-500': status === 'Away',
          'bg-gray-500': status === 'Offline'
        }"
      />
    </span>
  </template>
  
  <script setup>
  defineProps({
    status: {
      type: String,
      required: true,
      validator: (value) => ['Online', 'Away', 'Offline'].includes(value)
    }
  })
  </script>