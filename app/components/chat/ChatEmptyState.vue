<template>
    <div class="flex-1 flex flex-col items-center justify-center bg-white p-8 text-center">
      <div class="w-16 h-16 mb-4 text-gray-400">
        <Icon name="uil:comments-alt" size="64" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No conversation selected
      </h3>
      <p class="text-gray-500 max-w-sm">
        Choose a conversation from the sidebar or start a new one to begin messaging
      </p>
      <button
        @click="$emit('startNewChat')"
        class="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
      >
        Start New Chat
      </button>
    </div>
  </template>
  
  <script setup>
  defineEmits(['startNewChat'])
  </script>