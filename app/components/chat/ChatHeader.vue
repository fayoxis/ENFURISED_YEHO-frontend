<!-- ChatHeader.vue -->
<template>
  <div class="p-4 border-b-2 border-[#8DAD9D] bg-white  ">
    <div class="flex items-center justify-between">
      <!-- User Info Section -->
      <div class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all"
           @click="showUserInfo = !showUserInfo">
        <div class="relative">
          <div class="w-12 h-12 rounded-full bg-[#005C53] flex items-center justify-center text-white font-semibold
                    transform transition-transform hover:scale-105">
            {{ chat.name.charAt(0) }}
          </div>
          <span 
            class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white transform transition-transform"
            :class="{
              'bg-green-500 animate-pulse': chat.status === 'Online',
              'bg-yellow-500': chat.status === 'away',
              'bg-gray-400': chat.status === 'Offline'
            }"
          ></span>
        </div>
        <div>
          <h2 class="font-semibold text-gray-900 flex items-center gap-2">
            {{ chat.name }}
          </h2>
          <p class="text-sm text-gray-500 flex items-center gap-1">
            <span class="capitalize">{{ chat.status }}</span>
            <span v-if="chat.status === 'online'" class="text-xs">- Active now</span>
          </p>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex items-center gap-1 relative">
        <button 
          v-for="action in headerActions.filter(a => a.icon !== 'fas fa-ellipsis-v')" 
          :key="action.icon"
          @click="action.handler"
          class="p-2.5 text-gray-600 hover:text-[#005C53] hover:bg-gray-100 rounded-lg transition-all duration-200
                 transform hover:scale-105 active:scale-95"
          :title="action.label"
        >
          <i :class="action.icon + ' text-lg'"></i>
        </button>

        <!-- More Options Button -->
        <div class="relative">
          <button 
            @click="toggleOptions"
            class="p-2.5 text-gray-600 hover:text-[#005C53] hover:bg-gray-100 rounded-lg transition-all duration-200
                   transform hover:scale-105 active:scale-95"
            :class="{ 'bg-gray-100 text-[#005C53]': showOptions }"
          >
            <i class="fas fa-ellipsis-v text-lg"></i>
          </button>

          <!-- Dropdown Menu -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="showOptions" 
                 class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border border-gray-100"
                 v-click-outside="closeOptions">
              <div class="py-1">
                <button
                  v-for="option in menuOptions"
                  :key="option.label"
                  @click="handleOptionClick(option)"
                  class="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors duration-150
                         flex items-center gap-3 group"
                  :class="option.label.toLowerCase().includes('delete') ? 'text-red-500 hover:text-red-600' : 'text-gray-700'"
                >
                  <i :class="option.icon + ' text-lg group-hover:scale-110 transition-transform duration-150'"></i>
                  <span>{{ option.label }}</span>
                  <span v-if="option.toggle !== undefined" class="ml-auto">
                    <div class="w-9 h-5 bg-gray-200 rounded-full relative transition-colors duration-200"
                         :class="{ 'bg-green-500': chat[option.toggle] }">
                      <div class="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transition-transform duration-200"
                           :class="{ 'transform translate-x-4': chat[option.toggle] }">
                      </div>
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- User Info Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-if="showUserInfo" 
           class="absolute top-full left-4 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border border-gray-100"
           v-click-outside="() => showUserInfo = false">
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2">Contact Info</h3>
          <div class="space-y-2">
            <p class="text-sm text-gray-600">Email: {{ chat.email }}</p>
            <p class="text-sm text-gray-600">Phone: {{ chat.phone }}</p>
            <p class="text-sm text-gray-600">Joined: {{ formatDate(chat.joinedDate) }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatsStore } from '~/stores/chats';
import { format } from 'date-fns';

const store = useChatsStore();
const showOptions = ref(false);
const showUserInfo = ref(false);

const props = defineProps({
  chat: {
    type: Object,
    required: true,
    validator(value) {
      return value.name && value.status;
    }
  }
});

const emit = defineEmits(['startCall', 'startVideoCall', 'searchConversation']);

const headerActions = [
  {
    icon: 'fas fa-phone',
    label: 'Start voice call',
    handler: () => emit('startCall')
  },
  {
    icon: 'fas fa-video',
    label: 'Start video call',
    handler: () => emit('startVideoCall')
  },
  {
    icon: 'fas fa-search',
    label: 'Search in conversation',
    handler: () => emit('searchConversation')
  },
  {
    icon: 'fas fa-ellipsis-v',
    label: 'More options',
    handler: () => toggleOptions()
  }
];

const menuOptions = [
  {
    icon: 'fas fa-star',
    label: 'Favorite Chat',
    toggle: 'favorite',
    handler: () => store.toggleFavorite(props.chat.id)
  },
  {
    icon: 'fas fa-bell',
    label: 'Mute Notifications',
    toggle: 'muted',
    handler: () => store.toggleMute(props.chat.id)
  },
  {
    icon: 'fas fa-archive',
    label: 'Archive Chat',
    handler: () => store.toggleArchive(props.chat.id)
  },
  {
    icon: 'fas fa-cog',
    label: 'Chat Settings',
    handler: () => store.openChatSettings(props.chat.id)
  },
  {
    icon: 'fas fa-user-block',
    label: 'Block User',
    handler: () => store.blockUser(props.chat.id)
  },
  {
    icon: 'fas fa-trash',
    label: 'Delete Chat',
    handler: () => {
      if (confirm('Are you sure you want to delete this chat?')) {
        store.deleteChat(props.chat.id);
      }
    }
  }
];

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const closeOptions = () => {
  // showOptions.value = false;
};

const handleOptionClick = (option) => {
  option.handler();
  if (!option.toggle) {
    showOptions.value = false;
  }
};

const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

// Directive for clicking outside
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el._clickOutside);
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside);
  }
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>