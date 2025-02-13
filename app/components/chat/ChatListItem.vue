<template>
    <div class="flex items-center justify-between px-4 py-3 ">
      <div class="flex items-center min-w-0">
        <div class="relative">
          <UserAvatar 
            :name="chat.name" 
            class="w-10 h-10 rounded-full bg-green-50"
          />
          <div 
            v-if="chat.status === 'Online'" 
            class="absolute -top-1 -right-1 bg-green-500 text-white text-[11px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
          >
          </div>
          <div 
            v-else
            class="absolute -top-1 -right-1 bg-gray-100 text-white text-[11px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
          >
          </div>
        </div>
        <div class="ml-3 min-w-0">
          <h3 class="font-medium text-[15px] text-gray-900 truncate">
            {{ chat.name }}
          </h3>
          <p class="text-[13px] text-[#8DAD9D] truncate max-w-[240px]">
            {{ chat.lastMessage }}
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center" >
        <div 
            v-if="chat.unreadCount && chat.unread" 
            class=" bg-red-500 flex text-white text-[15px] w-2/3 min-w-[10px] h-[18px] rounded-full  items-center justify-center "
          >
          {{ chat.unreadCount }}

        </div>
          <div class="text-[14px] text-[#8DAD9D] whitespace-nowrap">
        {{ formatDate(chat.lastMessageTime) }}
      </div>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { format } from 'date-fns'
  import UserAvatar from '../common/UserAvatar.vue';
  
  defineProps({
    chat: {
      type: Object,
      required: true,
      validator: (chat) => {
        return chat.name && 
               chat.lastMessage && 
               chat.lastMessageTime !== undefined
      }
    }
  })
  
  const formatDate = (date) => {
    const messageDate = new Date(date)
    const today = new Date()
    
    if (messageDate.toDateString() === today.toDateString()) {
      return format(messageDate, 'h:mm a')
    }
    return format(messageDate, 'MMM d')
  }
  </script>
  
  <style scoped>
  .user-avatar {
    position: relative;
    background: linear-gradient(to bottom right, #e6f7f4, #d1f3ed);
  }
  </style>