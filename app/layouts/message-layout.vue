<template>
  <div class="h-screen w-full bg-gray-50">
    <!-- Main Layout Container -->
    <div class="flex h-full relative">
      <!-- Sidebar - Full width on mobile, 1/4 on desktop -->
      <div 
        :class="[
          'transition-all duration-300 bg-white',
          showChat ? 'hidden lg:block lg:w-1/4' : 'w-full lg:w-1/4'
        ]"
      >
        <ChatSidebar @chat-selected="handleChatSelect" />
      </div>

      <!-- Main Chat Area - Hidden on mobile until chat selected -->
      <div 
        :class="[
          'flex flex-col flex-1 transition-all duration-300',
          showChat ? 'block w-full lg:w-1/2' : 'hidden lg:block lg:w-1/2'
        ]"
      >
        <div class="flex h-full flex-col p-4">
          <div class="flex items-center gap-4 mb-4">
            <!-- Back button - Only on mobile -->
            <button 
              v-if="showChat" 
              class="lg:hidden p-2 rounded-full hover:bg-gray-100"
              @click="handleBack"
            >
              <Icon name="heroicons:arrow-left" class="w-6 h-6 text-gray-600" />
            </button>
            <ChatMain />
          </div>
        </div>
      </div>

      <!-- Right Side Properties - Modal on mobile, sidebar on desktop -->
      <div 
        :class="[
          'bg-white transition-all duration-300',
          'lg:w-1/4 lg:block',
          showProperties ? 'fixed inset-0 z-50 lg:relative' : 'hidden'
        ]"
      >
        <div class="h-full flex flex-col">
          <!-- Mobile header -->
          <div class="lg:hidden flex justify-between items-center p-4 border-b">
            <h2 class="font-semibold text-lg">Properties</h2>
            <button 
              class="p-2 rounded-full hover:bg-gray-100"
              @click="toggleProperties"
            >
              <Icon name="heroicons:x-mark" class="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <!-- Properties content -->
          <div class="flex-1 overflow-hidden">
            <RightSide />
          </div>
        </div>
      </div>

      <!-- Properties toggle button - Only on mobile when chat is shown -->
      <button
        v-if="showChat"
        class="fixed right-4 bottom-4 lg:hidden z-40 bg-teal-600 text-white p-3 rounded-full shadow-lg"
        @click="toggleProperties"
      >
        <Icon name="heroicons:squares-2x2" class="w-6 h-6" />
      </button>

      <!-- Backdrop for mobile properties -->
      <div 
        v-if="showProperties"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        @click="toggleProperties"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showChat = ref(false)
const showProperties = ref(false)

const handleChatSelect = () => {
  showChat.value = true
  showProperties.value = false
}

const handleBack = () => {
  showChat.value = false
  showProperties.value = false
}

const toggleProperties = () => {
  showProperties.value = !showProperties.value
}
</script>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>