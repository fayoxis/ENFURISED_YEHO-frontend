<template>
  <div class="messages-container p-4">
    <!-- Messages Section -->
    <div class="flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <h3 class="text-base font-medium text-gray-800">Messages</h3>
          <span 
            v-if="totalUnreadCount" 
            class="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce"
          >
            {{ totalUnreadCount }}
          </span>
        </div>
        <span 
          v-if="hasNewMessages" 
          class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full text-center animate-pulse"
        >
          New
        </span>
      </div>

      <div class="messages-list space-y-1">
        <div 
          v-for="(groupedMessages, sender) in groupedMessagesBySender" 
          :key="sender"
          class="message-group"
        >
          <NuxtLink 
            v-for="message in groupedMessages" 
            :key="message.id" 
            :to="`/messages/${message.id}`"
            class="message-item flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50"
            @click="markMessageAsRead(message.id)"
          >
            <div class="relative">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 transition-transform duration-200 hover:scale-105" />
              <span 
                v-if="getUnreadCountBySender(sender)"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
              >
                {{ getUnreadCountBySender(sender) }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center">
                <p class="text-sm font-medium text-gray-800">{{ sender }}</p>
                <span class="text-xs text-gray-400">{{ formatMessageTime(message.timestamp) }}</span>
              </div>
              <p class="text-xs text-gray-500 truncate mt-0.5">{{ message.preview }}</p>
            </div>
            <span 
              v-if="message.unread" 
              class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 animate-pulse"
            />
          </NuxtLink>
        </div>
      </div>

      <NuxtLink 
        to="/messages" 
        class="view-all mt-4 text-sm text-green-700 hover:text-green-800 transition-colors duration-200 text-center py-2 rounded-lg hover:bg-green-50"
      >
        Toutes les conversations
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import { useMessageStore } from '../../stores/messages';

// const messageStore = useMessageStore();

// Simulated messages data with timestamps
const messages = ref([
  {
    id: 1,
    sender: 'Xavier Moretz',
    preview: 'Merci pour votre diligence et aide',
    timestamp: new Date('2024-12-26T08:15:00'),
    unread: true
  },
  {
    id: 2,
    sender: 'Xavier Moretz',
    preview: 'Merci pour votre diligence et aide',
    timestamp: new Date('2024-12-26T08:34:00'),
    unread: true
  },
  {
    id: 3,
    sender: 'Xavier Moretz',
    preview: 'Merci pour votre diligence et aide',
    timestamp: new Date('2024-12-26T08:51:00'),
    unread: true
  },
  {
    id: 4,
    sender: 'Xavier Moretz',
    preview: 'Merci pour votre diligence et aide',
    timestamp: new Date('2024-12-26T09:12:00'),
    unread: true
  }
]);

// Computed properties
const groupedMessagesBySender = computed(() => {
  return messages.value.reduce((acc, message) => {
    if (!acc[message.sender]) {
      acc[message.sender] = [];
    }
    acc[message.sender].push(message);
    return acc;
  }, {});
});

const totalUnreadCount = computed(() => {
  return messages.value.filter(message => message.unread).length;
});

const hasNewMessages = computed(() => {
  return messages.value.some(message => message.unread);
});

// Methods
const getUnreadCountBySender = (sender) => {
  return messages.value.filter(m => m.sender === sender && m.unread).length;
};

const formatMessageTime = (timestamp) => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
};

const markMessageAsRead = (messageId) => {
  const message = messages.value.find(m => m.id === messageId);
  if (message) {
    message.unread = false;
  }
};
</script>

<style scoped>
.messages-container {
  background-color: white;
  border-radius: 12px;
}

.message-group {
  animation: fadeIn 0.5s ease-out forwards;
}

.message-item {
  animation: slideIn 0.3s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
  position: relative;
}

.message-item::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to right, transparent, transparent);
  transition: background 0.3s ease;
}

.message-item:hover::before {
  background: linear-gradient(to right, rgba(0, 128, 0, 0.05), transparent);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.message-item:active {
  transform: scale(0.98);
}

.view-all {
  position: relative;
  overflow: hidden;
}

.view-all::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.view-all:hover::after {
  width: 80%;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>