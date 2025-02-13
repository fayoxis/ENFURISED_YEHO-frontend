<template>
    <div class="flex-1 border-2 p-2 border-[#8DAD9D]  h-full  rounded-2xl flex flex-col w-full bg-white mb-5">
      <template v-if="selectedChat">
        <ChatHeader :chat="selectedChat" />
        <ChatMessages 
          :messages="selectedChat.messages"
          @scrollToBottom="scrollToBottom"
        />
        <ChatInput @sendMessage="sendMessage" />
      </template>
      <ChatEmptyState v-else />
    </div>
  </template>
  
  <script setup>
  import { useChatsStore } from '~/stores/chats'
  import { ref, computed } from 'vue'
  import ChatHeader from './ChatHeader.vue'
  import ChatMessages from './ChatMessages.vue'
  import ChatEmptyState from './ChatEmptyState.vue'
  import ChatInput from './ChatInput.vue'
  
  const chatsStore = useChatsStore()
  const selectedChat = computed(() => chatsStore.selectedChat)
  
  const sendMessage = async (content) => {
    if (!content.trim()) return
    await chatsStore.sendMessage({
      chatId: selectedChat.value.id,
      content,
      sender: 'user',
      timestamp: new Date()
    })
  }
  
  const scrollToBottom = () => {
    const container = document.querySelector('.messages-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }
  </script>