<template>
    <div class="min-h-screen bg-[#D9F9E9]">
      <!-- Header with profile summary -->
      <header class="bg-[#005C53] text-white p-4 shadow-lg">
        <div class="container mx-auto flex flex-wrap items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <img 
                :src="user.profilePicture || '/api/placeholder/80/80'" 
                class="w-16 h-16 rounded-full border-2 border-[#A2C02D] object-cover transition-all duration-300 hover:scale-105"
                alt="Profile picture"
              />
              <div v-if="isEditing" class="absolute bottom-0 right-0 bg-[#2FAC66] rounded-full p-1 cursor-pointer">
                <span class="text-xs text-white">Edit</span>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-bold">{{ user.firstName }} {{ user.lastName }}</h1>
              <div class="flex items-center">
                <span class="bg-[#2FAC66] text-white px-2 py-0.5 rounded-full text-xs mr-2">{{ user.role }}</span>
                <span class="text-sm">Last active: {{ formatDateTime(user.lastActive) }}</span>
              </div>
            </div>
          </div>
          <div class="mt-4 md:mt-0">
            <button
              v-if="!isEditing"
              @click="toggleEdit"
              class="bg-[#F24405] hover:bg-opacity-80 text-white px-4 py-2 rounded transition-all duration-300 transform hover:scale-105"
            >
              Edit Profile
            </button>
            <div v-else class="flex space-x-2">
              <button
                @click="saveChanges"
                class="bg-[#2FAC66] hover:bg-opacity-80 text-white px-4 py-2 rounded transition-all duration-300 transform hover:scale-105"
              >
                Save
              </button>
              <button
                @click="cancelEdit"
                class="bg-gray-400 hover:bg-opacity-80 text-white px-4 py-2 rounded transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="container mx-auto py-6 px-4">
        <!-- Tabs -->
        <div class="mb-6 border-b border-[#8DAD9D]">
          <div class="flex overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-4 py-2 transition-all duration-300 whitespace-nowrap"
              :class="activeTab === tab.id ? 'border-b-2 border-[#2FAC66] text-[#005C53] font-bold' : 'text-gray-500 hover:text-[#005C53]'"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
  
        <!-- Dynamic Content Based on Active Tab -->
        <div class="transition-all duration-500 ease-in-out">
          <!-- Profile Info Tab -->
          <div v-if="activeTab === 'profile'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-1">
              <div class="bg-white rounded-lg shadow-md p-6 h-full">
                <h2 class="text-xl font-bold text-[#005C53] mb-4">Contact Information</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <div class="mt-1 flex items-center">
                      <input
                        v-if="isEditing"
                        v-model="userEdit.email"
                        type="email"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2FAC66]"
                      />
                      <p v-else>{{ user.email }}</p>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Phone</label>
                    <div class="mt-1">
                      <input
                        v-if="isEditing"
                        v-model="userEdit.phone"
                        type="text"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2FAC66]"
                      />
                      <p v-else>{{ user.phone }}</p>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Member Since</label>
                    <p class="mt-1">{{ formatDate(user.joinDate) }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="md:col-span-2">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-bold text-[#005C53] mb-4">About</h2>
                <textarea
                  v-if="isEditing"
                  v-model="userEdit.about"
                  rows="5"
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2FAC66]"
                ></textarea>
                <p v-else class="whitespace-pre-line">{{ user.about }}</p>
              </div>
  
              <!-- Role-specific information -->
              <div class="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-bold text-[#005C53] mb-4">Role Information</h2>
                <component :is="roleSpecificComponent" :user="user" :is-editing="isEditing" />
              </div>
            </div>
          </div>
  
          <!-- Properties Tab -->
          <div v-else-if="activeTab === 'properties'" class="min-h-[400px]">
            <property-list :role="user.role" :user-id="user.id" />
          </div>
  
          <!-- Transactions Tab -->
          <div v-else-if="activeTab === 'transactions'" class="min-h-[400px]">
            <transaction-history :user-id="user.id" :role="user.role" />
          </div>
  
          <!-- Reviews Tab -->
          <div v-else-if="activeTab === 'reviews'" class="min-h-[400px]">
            <reviews-section :user-id="user.id" :role="user.role" />
          </div>
  
          <!-- Settings Tab -->
          <div v-else-if="activeTab === 'settings'" class="min-h-[400px]">
            <user-settings :user="user" />
          </div>
        </div>
      </main>
  
      <!-- Toast Notification -->
      <div 
        v-if="showToast" 
        class="fixed bottom-4 right-4 bg-[#2FAC66] text-white px-4 py-2 rounded shadow-lg animate-fadeIn"
      >
        {{ toastMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import OwnerInfo from './role-specific/OwnerInfo.vue';
  import AgentInfo from './role-specific/AgentInfo.vue';
  import ClientInfo from './role-specific/ClientInfo.vue';
  import AgencyInfo from './role-specific/AgencyInfo.vue';
  import AdminInfo from './role-specific/AdminInfo.vue';
  import PropertyList from './PropertyList.vue';
  import TransactionHistory from './TransactionHistory.vue';
  import ReviewsSection from './ReviewsSection.vue';
  import UserSettings from './UserSettings.vue';
  
  // Mock user data (would normally come from API)
  const user = ref({
    id: '1234',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 123-4567',
    profilePicture: null,
    role: 'Agent', // One of: Owner, Agent, Client, Agency, Admin
    lastActive: new Date().toISOString(),
    joinDate: '2023-01-15T00:00:00Z',
    about: 'Professional real estate agent with over 5 years of experience in the metropolitan area. Specializing in luxury properties and first-time homebuyers.',
    
    // Role-specific data (normally would be fetched separately)
    commission: 2.5,
    salary: 45000,
    transactionCount: 37,
    followerCount: 128,
    linkedOwners: [
      { id: 'o1', name: 'Skyline Properties' },
      { id: 'o2', name: 'Metro Realty Group' }
    ],
    ratings: {
      average: 4.7,
      count: 43
    }
  });
  
  // Create editable copy of user data
  const userEdit = ref({ ...user.value });
  
  // UI state
  const isEditing = ref(false);
  const activeTab = ref('profile');
  const showToast = ref(false);
  const toastMessage = ref('');
  
  // Tabs configuration
  const tabs = [
    { id: 'profile', label: 'Profile Info' },
    { id: 'properties', label: 'Properties' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'settings', label: 'Settings' }
  ];
  
  // Determine which role-specific component to show
  const roleSpecificComponent = computed(() => {
    switch (user.value.role) {
      case 'Owner': return OwnerInfo;
      case 'Agent': return AgentInfo;
      case 'Client': return ClientInfo;
      case 'Agency': return AgencyInfo;
      case 'Admin': return AdminInfo;
      default: return 'div'; // Fallback
    }
  });
  
  // Format date and time helpers
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${formatDate(dateString)} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  // Toggle edit mode
  const toggleEdit = () => {
    if (!isEditing.value) {
      userEdit.value = { ...user.value };
    }
    isEditing.value = !isEditing.value;
  };
  
  // Save changes
  const saveChanges = () => {
    user.value = { ...userEdit.value };
    showToast.value = true;
    toastMessage.value = 'Profile updated successfully!';
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
    isEditing.value = false;
  };
  
  // Cancel editing
  const cancelEdit = () => {
    userEdit.value = { ...user.value };
    isEditing.value = false;
  };
  
  // Simulate WebSocket connection for real-time updates
  onMounted(() => {
    const simulateRealTimeUpdates = () => {
      // Simulate a follower count update after 5 seconds
      setTimeout(() => {
        if (user.value.role === 'Agent') {
          user.value.followerCount += 1;
          showToast.value = true;
          toastMessage.value = 'You have a new follower!';
          setTimeout(() => {
            showToast.value = false;
          }, 3000);
        }
      }, 5000);
    };
    
    simulateRealTimeUpdates();
  });
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  </style>