<!-- App.vue -->
<template>
    <div class="h-screen w-full bg-white relative py-10 lg:px-2">
      <!-- Mobile View -->
      <div class="lg:hidden w-full h-full">
        <transition name="slide">
          <ChatSidebar v-if="!selectedChat" class="w-full h-full" />
          <div v-else class="w-full h-full flex flex-col">
            <div class="flex items-center p-4 bg-white border-b">
              <button @click="closeChat" class="mr-4">
                <i class="fas fa-arrow-left text-[#005C53]"></i>
              </button>
              <h2 class="text-lg font-semibold text-[#005C53]">{{ selectedChat.name }}</h2>
              <button @click="toggleRightPanel" class="ml-auto">
                <i class="fas fa-info-circle text-[#005C53]"></i>
              </button>
            </div>
            <ChatMain class="flex-1" />
          </div>
        </transition>
      </div>
  
      <!-- Desktop View -->
      <div class="hidden lg:flex w-full h-full space-x-2 ">
        <div class="w-1/4">
          <ChatSidebar />
        </div>
        <div class="w-full">
          <ChatMain />
        </div>
        <div class="w-1/4">
          <RightSide />
        </div>
      </div>
  
      <!-- Mobile Right Panel Overlay -->
      <transition name="fade">
        <div v-if="showRightPanel && selectedChat" 
             class="lg:hidden fixed inset-0 bg-black bg-opacity-50"
             @click="toggleRightPanel">
          <div class="absolute right-0 top-0 h-full w-3/4 bg-white"
               @click.stop>
            <div class="p-4">
              <button @click="toggleRightPanel" class="float-right">
                <i class="fas fa-times text-[#005C53]"></i>
              </button>
              <RightSide />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useChatsStore } from '~/stores/chats';
  import ChatSidebar from '~/components/chat/ChatSidebar.vue';
  import ChatMain from '~/components/chat/ChatMain.vue';
  import RightSide from '~/components/chat/RightSide.vue';
  
  const chatsStore = useChatsStore();
  const showRightPanel = ref(false);
  const selectedChat = computed(() => chatsStore.selectedChat);
  
  const toggleRightPanel = () => {
    showRightPanel.value = !showRightPanel.value;
  };
  
  const closeChat = () => {
    chatsStore.setSelectedChat(null);
    showRightPanel.value = false;
  };
  </script>
  
  <style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>