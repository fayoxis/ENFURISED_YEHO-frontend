<template>
  <div class="min-h-screen bg-[#D9F9E9]">
    <!-- Header with profile summary -->
    <ProfileHeader :user="userData" @update-profile="handleProfileUpdate" />

    <!-- Main content with tabs -->
    <div class="container mx-auto px-4 py-6">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Tabs navigation -->
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button 
              v-for="tab in availableTabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 px-6 border-b-2 font-medium text-sm transition-all duration-300"
              :class="[
                activeTab === tab.id 
                  ? 'border-[#2FAC66] text-[#2FAC66]' 
                  : 'border-transparent text-gray-500 hover:text-[#005C53] hover:border-[#8DAD9D]'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab content -->
        <div class="p-6">
          <!-- Profile Info Tab -->
          <div v-if="activeTab === 'profile'" class="animate-fadeIn">
            <ProfileInfo 
              :user="userData" 
              :isEditable="isCurrentUser" 
              @update="handleProfileUpdate" 
            />
          </div>

          <!-- Properties Tab -->
          <div v-if="activeTab === 'properties'" class="animate-fadeIn">
            <PropertiesPanel :user="userData" :role="userData.role" />
          </div>

          <!-- Transactions Tab -->
          <div v-if="activeTab === 'transactions'" class="animate-fadeIn">
            <TransactionsPanel :user="userData" :role="userData.role" />
          </div>

          <!-- Reviews Tab -->
          <div v-if="activeTab === 'reviews'" class="animate-fadeIn">
            <ReviewsPanel :user="userData" />
          </div>

          <!-- Settings Tab (only for current user) -->
          <div v-if="activeTab === 'settings' && isCurrentUser" class="animate-fadeIn">
            <SettingsPanel :user="userData" @update="handleProfileUpdate" />
          </div>

          <!-- Role Specific Tab -->
          <div v-if="activeTab === 'role-specific'" class="animate-fadeIn">
            <RoleSpecificPanel :user="userData" :role="userData.role" />
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notifications -->
    <div class="fixed bottom-4 right-4 z-50">
      <TransitionGroup name="toast">
        <div 
          v-for="(toast, index) in toasts" 
          :key="toast.id"
          class="mb-2 p-4 rounded-lg shadow-lg text-white transform transition-all duration-300"
          :class="toast.type === 'success' ? 'bg-[#2FAC66]' : 'bg-[#F24405]'"
        >
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProfileHeader from '~/components/profile/ProfileHeader.vue';
import ProfileInfo from '~/components/profile/ProfileInfo.vue';
import PropertiesPanel from '~/components/profile/PropertiesPanel.vue';
import TransactionsPanel from '~/components/profile/TransactionsPanel.vue';
import ReviewsPanel from '~/components/profile/ReviewsPanel.vue';
import SettingsPanel from '~/components/profile/SettingsPanel.vue';
import RoleSpecificPanel from '~/components/profile/RoleSpecificPanel.vue';

// Mock user data - in a real app, this would come from an API
const userData = ref({
  id: '1',
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 123-4567',
  profilePicture: '/api/placeholder/150/150',
  role: 'owner', // owner, agent, client, agency, admin
  lastActive: new Date().toISOString(),
  about: 'Real estate professional with over 10 years of experience in the market.',
  // Role-specific data
  properties: [],
  agents: [],
  transactions: [],
  followers: 128,
  rating: 4.7,
  commission: '3%',
  salary: '$75,000',
  savedProperties: [],
  subscriptions: [],
  managedAgents: [],
  managedOwners: []
});

// Get query parameter for user role to demo different roles
onMounted(() => {
  // In a real app, you'd fetch the user data from your API
  loadMockData();
  
  // Set up WebSocket connection mockup for real-time updates
  setupMockRealTimeUpdates();
});

// In a real app, this would be determined by auth state
const isCurrentUser = ref(true);

// Active tab state
const activeTab = ref('profile');

// Toast notifications
const toasts = ref([]);

// Available tabs based on user role
const availableTabs = computed(() => {
  const tabs = [
    { id: 'profile', label: 'Profile Info' },
    { id: 'properties', label: 'Properties' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'reviews', label: 'Reviews' }
  ];

  if (isCurrentUser.value) {
    tabs.push({ id: 'settings', label: 'Settings' });
  }

  if (userData.value.role) {
    tabs.push({ id: 'role-specific', label: getRoleSpecificTabLabel() });
  }

  return tabs;
});

// Get role-specific tab label
function getRoleSpecificTabLabel() {
  switch (userData.value.role) {
    case 'owner': return 'My Agents';
    case 'agent': return 'Performance';
    case 'client': return 'Subscriptions';
    case 'agency': return 'Team Management';
    case 'admin': return 'System Controls';
    default: return 'Additional Info';
  }
}

// Handle profile updates
function handleProfileUpdate(updatedData) {
  // In a real app, this would be an API call
  Object.assign(userData.value, updatedData);
  
  // Show success toast
  showToast('Profile updated successfully!', 'success');
}

// Show toast notification
function showToast(message, type = 'success') {
  const id = Date.now();
  toasts.value.push({ id, message, type });
  
  // Auto-remove toast after 3 seconds
  setTimeout(() => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  }, 3000);
}

// Load mock data based on role
function loadMockData() {
  // In URL: ?role=agent to demo different roles
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');
  
  if (roleParam && ['owner', 'agent', 'client', 'agency', 'admin'].includes(roleParam)) {
    userData.value.role = roleParam;
    
    // Reset data
    userData.value.properties = [];
    userData.value.agents = [];
    userData.value.transactions = [];
    userData.value.savedProperties = [];
    userData.value.subscriptions = [];
    userData.value.managedAgents = [];
    userData.value.managedOwners = [];
    
    // Load role-specific mock data
    if (roleParam === 'owner') {
      userData.value.properties = generateMockProperties(5);
      userData.value.agents = generateMockAgents(3);
      userData.value.transactions = generateMockTransactions(8);
    } else if (roleParam === 'agent') {
      userData.value.properties = generateMockProperties(8);
      userData.value.transactions = generateMockTransactions(12);
      userData.value.followers = 247;
    } else if (roleParam === 'client') {
      userData.value.savedProperties = generateMockProperties(4);
      userData.value.subscriptions = generateMockAgents(2);
      userData.value.transactions = generateMockTransactions(3);
    } else if (roleParam === 'agency') {
      userData.value.managedAgents = generateMockAgents(12);
      userData.value.managedOwners = generateMockOwners(8);
    } else if (roleParam === 'admin') {
      // Admin-specific data
    }
  }
}

// Generate mock properties for demo
function generateMockProperties(count) {
  const properties = [];
  const types = ['Apartment', 'House', 'Condo', 'Villa', 'Office'];
  const statuses = ['For Sale', 'For Rent', 'Sold', 'Pending'];
  
  for (let i = 0; i < count; i++) {
    properties.push({
      id: `prop-${i}`,
      title: `${types[Math.floor(Math.random() * types.length)]} in Downtown`,
      address: `${100 + i} Main Street, City`,
      price: `$${(300000 + Math.random() * 700000).toFixed(0)}`,
      bedrooms: Math.floor(Math.random() * 5) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      area: `${(1000 + Math.random() * 2000).toFixed(0)} sq ft`,
      image: `/api/placeholder/300/200`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100)
    });
  }
  
  return properties;
}

// Generate mock agents for demo
function generateMockAgents(count) {
  const agents = [];
  const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    agents.push({
      id: `agent-${i}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 (555) ${100 + Math.floor(Math.random() * 899)}-${1000 + Math.floor(Math.random() * 9000)}`,
      avatar: `/api/placeholder/50/50`,
      rating: (3 + Math.random() * 2).toFixed(1),
      properties: Math.floor(Math.random() * 20) + 5,
      commission: `${(2 + Math.random() * 3).toFixed(1)}%`
    });
  }
  
  return agents;
}

// Generate mock owners for demo
function generateMockOwners(count) {
  const owners = [];
  const firstNames = ['Robert', 'Patricia', 'James', 'Jennifer', 'Thomas'];
  const lastNames = ['Miller', 'Davis', 'Wilson', 'Taylor', 'Anderson'];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    owners.push({
      id: `owner-${i}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 (555) ${100 + Math.floor(Math.random() * 899)}-${1000 + Math.floor(Math.random() * 9000)}`,
      avatar: `/api/placeholder/50/50`,
      properties: Math.floor(Math.random() * 10) + 1
    });
  }
  
  return owners;
}

// Generate mock transactions for demo
function generateMockTransactions(count) {
  const transactions = [];
  const types = ['Sale', 'Rental', 'Commission', 'Fee'];
  const statuses = ['Completed', 'Pending', 'Cancelled'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = type === 'Sale' 
      ? (300000 + Math.random() * 700000).toFixed(0)
      : type === 'Rental' 
        ? (1000 + Math.random() * 5000).toFixed(0)
        : (500 + Math.random() * 10000).toFixed(0);
        
    transactions.push({
      id: `trans-${i}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type,
      description: `${type} transaction for property`,
      amount: `$${amount}`,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  // Sort by date, newest first
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return transactions;
}

// Mock real-time updates with WebSockets
function setupMockRealTimeUpdates() {
  // Simulate real-time updates every 15 seconds
  setInterval(() => {
    if (Math.random() > 0.7) {
      // Update property views randomly
      if (userData.value.properties && userData.value.properties.length > 0) {
        const randomIndex = Math.floor(Math.random() * userData.value.properties.length);
        userData.value.properties[randomIndex].views += 1;
        
        showToast(`New view on your property: ${userData.value.properties[randomIndex].title}`, 'success');
      }
      
      // Update followers for agents
      if (userData.value.role === 'agent' && Math.random() > 0.8) {
        userData.value.followers += 1;
        showToast('You have a new follower!', 'success');
      }
    }
  }, 15000);
}
</script>

<style>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>