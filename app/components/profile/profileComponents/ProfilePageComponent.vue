<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <ProfileHeader 
        :user="user" 
        :isEditing="isEditing" 
        @toggle-edit="isEditing = !isEditing"
        @upload-image="handleImageUpload"
      />

      <!-- Tabs -->
      <TabNavigation 
        :tabs="tabs" 
        :activeTab="activeTab" 
        @update:tab="activeTab = $event"
      />

      <!-- Tab Content -->
      <div class="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out">
        <ProfileInfo 
          v-if="activeTab === 'profile'" 
          :user="user" 
          :isEditing="isEditing" 
        />
        
        <PropertyList 
          v-if="activeTab === 'properties'" 
          :properties="properties" 
        />
        
        <ReviewList 
          v-if="activeTab === 'reviews'" 
          :reviews="reviews" 
        />
        
        <FollowerList 
          v-if="activeTab === 'followers'" 
          :followers="followers" 
        />
        
        <FollowingList 
          v-if="activeTab === 'following'" 
          :following="following" 
        />
        
        <ProfileSettings 
          v-if="activeTab === 'settings'" 
          :settings="settings" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProfileHeader from './ProfileHeader.vue'
import TabNavigation from './TabNavigation.vue'
import ProfileInfo from './ProfileInfo.vue'
import PropertyList from './PropertyList.vue'
import ReviewList from './ReviewList.vue'
import FollowerList from './FollowerList.vue'
import FollowingList from './FollowingList.vue'
import ProfileSettings from './ProfileSettings.vue'

const isEditing = ref(false)
const activeTab = ref('profile')

const tabs = [
  { id: 'profile', name: 'Profile Info', icon: 'user' },
  { id: 'properties', name: 'Properties', icon: 'home' },
  { id: 'followers', name: 'Followers', icon: 'users' },
  { id: 'following', name: 'Following', icon: 'user-plus' },
  { id: 'reviews', name: 'Reviews', icon: 'star' },
  { id: 'settings', name: 'Settings', icon: 'settings' }
]

// Mock data
const user = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  role: 'Property Owner',
  about: 'Experienced property owner with over 10 years in real estate investment. Specializing in residential properties with a focus on sustainable living spaces.',
  profilePicture: 'https://via.placeholder.com/150',
  followers: 245,
  following: 112,
  properties: 12,
  rating: 4.8
})

const properties = ref([
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    price: '450,000',
    period: 'month',
    location: 'Downtown, City',
    image: 'https://via.placeholder.com/300x200',
    bedrooms: 2,
    bathrooms: 1,
    area: 85
  },
  {
    id: 2,
    title: 'Suburban Family Home',
    price: '650,000',
    period: 'month',
    location: 'Suburb, City',
    image: 'https://via.placeholder.com/300x200',
    bedrooms: 4,
    bathrooms: 2,
    area: 180
  },
  {
    id: 3,
    title: 'Luxury Penthouse',
    price: '1,200,000',
    period: 'month',
    location: 'Central, City',
    image: 'https://via.placeholder.com/300x200',
    bedrooms: 3,
    bathrooms: 3,
    area: 210
  }
])

const reviews = ref([
  {
    id: 1,
    userName: 'Jane Smith',
    userImage: 'https://via.placeholder.com/40',
    rating: 5,
    comment: 'Excellent property owner! Very professional and responsive. The property was in immaculate condition.',
    date: '2023-12-01'
  },
  {
    id: 2,
    userName: 'Mike Johnson',
    userImage: 'https://via.placeholder.com/40',
    rating: 4,
    comment: 'Good experience overall. Would recommend. The location was perfect and everything was as described.',
    date: '2023-11-15'
  }
])

const followers = ref([
  {
    id: 1,
    name: 'Emma Thompson',
    image: 'https://via.placeholder.com/50',
    role: 'Home Buyer',
    joinedDate: '2 months ago'
  },
  {
    id: 2,
    name: 'Daniel Brown',
    image: 'https://via.placeholder.com/50',
    role: 'Property Manager',
    joinedDate: '5 months ago'
  },
  {
    id: 3,
    name: 'Olivia Wilson',
    image: 'https://via.placeholder.com/50',
    role: 'Investor',
    joinedDate: '1 year ago'
  }
])

const following = ref([
  {
    id: 1,
    name: 'Robert Davis',
    image: 'https://via.placeholder.com/50',
    role: 'Property Developer',
    joinedDate: '8 months ago'
  },
  {
    id: 2,
    name: 'Sophia Martinez',
    image: 'https://via.placeholder.com/50',
    role: 'Real Estate Agent',
    joinedDate: '3 months ago'
  }
])

const settings = ref({
  emailNotifications: true,
  smsNotifications: false,
  profileVisibility: true,
  showEmail: false,
  darkMode: false,
  twoFactorAuth: true
})

const handleImageUpload = () => {
  // Implementation for image upload
  console.log('Image upload clicked')
}

onMounted(() => {
  // Animation or data loading could happen here
})
</script>