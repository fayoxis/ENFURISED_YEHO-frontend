<template>
    <div class="mb-8">
      <div class="border-b border-gray-200">
        <nav class="flex flex-wrap gap-2 sm:gap-0 overflow-x-auto pb-1">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="$emit('update:tab', tab.id)"
            :class="[
              'py-3 px-4 border-b-2 font-medium transition-all duration-200 flex items-center',
              activeTab === tab.id
                ? 'border-[#2FAC66] text-[#2FAC66]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <svg-icon :name="tab.icon" class="mr-2 h-4 w-4" v-if="tab.icon" />
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  })
  
  defineEmits(['update:tab'])
  </script>
  
  