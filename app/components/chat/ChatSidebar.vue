<template>
    <div class="w-full bg-white flex flex-col ">
      <ChatSearch 
        :searchQuery="searchQuery"
        @update:searchQuery="(val) => searchQuery = val"
      />
      <ChatFilters 
        :filters="filters"
        :activeFilter="activeFilter"
        @setFilter="setActiveFilter"
      />
      <ChatList
        :chats="filteredChats"
        :selectedChatId="selectedChat?.id"
        @selectChat="selectChat"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useChatsStore } from '~/stores/chats'
  import ChatList from './ChatList.vue'
  import ChatFilters from './ChatFilters.vue'
  import ChatSearch from './ChatSearch.vue'
  
  const searchQuery = ref('')
  const activeFilter = ref('all')
  const chatsStore = useChatsStore()
  
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'unread', name: 'Unread' },
    { id: 'archived', name: 'Archived' },
    { id: 'favorite', name: 'Favorite' }

  ]
  
  const filteredChats = computed(() => {
    let filtered = chatsStore.chats
  
    if (searchQuery.value) {
      filtered = filtered.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        chat.messages.some(msg =>
          msg.content.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      )
    }
  
    switch (activeFilter.value) {
      case 'unread':
        filtered = filtered.filter(chat => chat.unread)
        break
      case 'archived':
        filtered = filtered.filter(chat => chat.archived)
        break
    }
  
    return filtered
  })
  
  
  const setActiveFilter = (filterId) => {
    activeFilter.value = filterId
  }
  
  const selectChat = (chat) => {
    chatsStore.setSelectedChat(chat)
    chatsStore.markAsRead(chat.id)
  }
  </script>