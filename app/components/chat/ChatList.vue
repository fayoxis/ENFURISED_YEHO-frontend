<template>
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="chat in chats"
        :key="chat.id"
        @click="$emit('selectChat', chat)"
        :class="[
          'p-2 cursor-pointer transition-colors',
          selectedChatId === chat.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
        ]"
      >
        <ChatListItem :chat="chat" />
      </div>
    </div>
  </template>
  
  <script setup>
  import ChatListItem from './ChatListItem.vue';
  defineProps(['chats', 'selectedChatId'])
  defineEmits(['selectChat'])

  const handleChatSelect = (chat) => {
  chatsStore.setSelectedChat(chat)
  showChat.value = true  // Show the chat view on mobile
  emit('chat-selected', chat)
}
  </script>