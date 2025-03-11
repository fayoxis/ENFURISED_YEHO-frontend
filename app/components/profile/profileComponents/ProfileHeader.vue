<template>
    <div class="bg-gradient-to-r from-[#005C53] to-[#2FAC66] text-white">
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <!-- Profile Picture -->
          <div class="relative group">
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                :src="user.profilePicture || '/api/placeholder/150/150'" 
                alt="Profile Picture" 
                class="w-full h-full object-cover"
              />
            </div>
            <div 
              v-if="isEditable" 
              class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              @click="openProfilePictureUpload"
            >
              <span class="text-white text-xs">Change Photo</span>
            </div>
            <input 
              type="file" 
              ref="profilePictureInput" 
              class="hidden" 
              accept="image/*" 
              @change="handleProfilePictureChange"
            />
          </div>
  
          <!-- User Info -->
          <div class="flex-1">
            <div class="flex flex-col md:flex-row md:items-center gap-4">
              <div>
                <h1 class="text-2xl md:text-3xl font-bold">
                  {{ user.firstName }} {{ user.lastName }}
                  <span v-if="isOnline" class="inline-block w-3 h-3 bg-green-400 rounded-full ml-2"></span>
                </h1>
                <div class="flex items-center mt-1">
                  <span class="bg-[#A2C02D] text-[#005C53] text-xs font-bold px-2 py-1 rounded uppercase">
                    {{ user.role }}
                  </span>
                  <span class="text-sm ml-2 text-[#D9F9E9]">
                    Last active: {{ formatLastActive(user.lastActive) }}
                  </span>
                </div>
              </div>
  
              <div class="flex-1"></div>
  
              <!-- Rating display -->
              <div class="flex items-center bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                <div class="flex">
                  <svg 
                    v-for="i in 5" 
                    :key="i" 
                    class="w-5 h-5" 
                    :class="i <= Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-300'"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="ml-1 text-white font-bold">{{ user.rating }}</span>
                <span class="ml-1 text-sm text-white">({{ reviewCount }})</span>
              </div>
  
              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button 
                  v-if="isEditable"
                  @click="$emit('update-profile', {})" 
                  class="bg-white text-[#005C53] px-4 py-2 rounded-lg font-medium hover:bg-[#D9F9E9] transition-colors"
                >
                  Edit Profile
                </button>
                <button 
                  v-else
                  @click="followUser" 
                  class="bg-[#F24405] text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  :class="{ 'bg-opacity-80': isFollowing }"
                >
                  {{ isFollowing ? 'Following' : 'Follow' }}
                </button>
                <button 
                  v-if="!isEditable"
                  @click="contactUser" 
                  class="bg-white text-[#005C53] px-4 py-2 rounded-lg font-medium hover:bg-[#D9F9E9] transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
  
            <!-- Role-specific summary stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div v-if="['owner', 'agent', 'agency'].includes(user.role)" class="bg-white bg-opacity-20 p-3 rounded-lg">
                <div class="text-sm">Properties</div>
                <div class="text-xl font-bold mt-1">{{ propertyCount }}</div>
              </div>
              <div v-if="['owner', 'agent', 'client'].includes(user.role)" class="bg-white bg-opacity-20 p-3 rounded-lg">
                <div class="text-sm">Transactions</div>
                <div class="text-xl font-bold mt-1">{{ transactionCount }}</div>
              </div>
              <div v-if="['agent'].includes(user.role)" class="bg-white bg-opacity-20 p-3 rounded-lg">
                <div class="text-sm">Followers</div>
                <div class="text-xl font-bold mt-1">{{ user.followers }}</div>
              </div>
              <div v-if="['agent'].includes(user.role)" class="bg-white bg-opacity-20 p-3 rounded-lg">
                <div class="text-sm">Commission</div>
                <div class="text-xl font-bold mt-1">{{ user.commission }}</div>
              </div>
              <div v-if="['client'].includes(user.role)" class="bg-white bg-opacity-20 p-3 rounded-lg">
                <div class="text-sm">Saved Properties</div>
                <div class="text-xl font-bold mt-1">{{ savedPropertyCount }}</div>
              </div>
              <div v-if="['client'].includes(user.role)" class="bg-white bg-opacity-20 p-3 rounded-lg">
                <div class="text-sm">Subscriptions</div>
                <div class="text-xl font-bold mt-1">{{ subscriptionCount }}</div>
              </div>
              <div v-if="['agency'].includes(user.role)" class="bg-white bg-opacity-20 p-3 rounded-lg">
                <div class="text-sm">Agents</div>
                <div class="text-xl font-bold mt-1">{{ agentCount }}</div>
              </div>
              <div v-if="['agency'].includes(user.role)" class="bg-white bg-opacity-20 p-3 rounded-lg">
                <div class="text-sm">Owners</div>
                <div class="text-xl font-bold mt-1">{{ ownerCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    user: {
      type: Object,
      required: true
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['update-profile']);
  
  const profilePictureInput = ref(null);
  const isFollowing = ref(false);
  const isOnline = ref(true);
  
  // Computed properties for stats
  const propertyCount = computed(() => {
    if (props.user.role === 'owner' || props.user.role === 'agent') {
      return props.user.properties?.length || 0;
    }
    return props.user.managedProperties?.length || 0;
  });
  
  const transactionCount = computed(() => {
    return props.user.transactions?.length || 0;
  });
  
  const savedPropertyCount = computed(() => {
    return props.user.savedProperties?.length || 0;
  });
  
  const subscriptionCount = computed(() => {
    return props.user.subscriptions?.length || 0;
  });
  
  const agentCount = computed(() => {
    if (props.user.role === 'owner') {
      return props.user.agents?.length || 0;
    }
    return props.user.managedAgents?.length || 0;
  });
  
  const ownerCount = computed(() => {
    return props.user.managedOwners?.length || 0;
  });
  
  const reviewCount = computed(() => {
    return Math.floor(Math.random() * 50) + 10; // Mock value
  });
  
  // Format the last active time
  function formatLastActive(dateString) {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 5) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  }
  
  // Open the file upload dialog
  function openProfilePictureUpload() {
    profilePictureInput.value.click();
  }
  
  // Handle profile picture change
  function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // In a real app, you'd upload the file to a server
    // For this demo, we'll use a placeholder
    const reader = new FileReader();
    reader.onload = (e) => {
      // Emit update event with new profile picture
      // In demo mode, we'll use a placeholder instead of the actual file
      const updatedData = { profilePicture: '/api/placeholder/150/150' };
      emitter.emit('update-profile', updatedData);
    };
    reader.readAsDataURL(file);
  }
  
  // Follow user function
  function followUser() {
    isFollowing.value = !isFollowing.value;
    // In a real app, this would call an API
  }
  
  // Contact user function
  function contactUser() {
    // In a real app, this would open a messaging interface
    alert('Contact functionality would open a messaging interface in a real app');
  }
  </script>