<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Background patterns -->
    <div class="fixed top-0 right-0 -z-10 opacity-5">
      <svg width="400" height="400" viewBox="0 0 100 100">
        <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="#2FAC66" />
        <circle cx="50" cy="50" r="30" fill="#005C53" />
      </svg>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Profile Header -->
      <div
        class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
        <div class="flex flex-col md:flex-row md:items-start gap-6">
          <div class="relative mx-auto md:mx-0 group">
            <div
              class="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-[#2FAC66]/20 transition-all duration-300 group-hover:ring-[#2FAC66]/40">
              <img :src="user.profilePicture || getAvatarUrl(user.firstName, user.lastName)"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                :alt="`${user.firstName} ${user.lastName}`" />
            </div>
            <div @click="openImageUpload"
              class="absolute bottom-2 right-2 bg-[#2FAC66] text-white p-3 rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-[#1e8a4f]">
              <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" class="hidden" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 group">
                  {{ user.firstName }} {{ user.lastName }}
                  <span v-if="user.verified" class="inline-flex ml-2 items-center text-blue-500"
                    title="Verified Account">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </h2>
                <div class="flex items-center justify-center md:justify-start mt-1 text-gray-500">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    :class="getRoleBadgeClass()">
                    <svg v-if="user.role === 'Property Owner'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <svg v-else-if="user.role === 'Agent'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <svg v-else-if="user.role === 'Agency'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ user.role }}
                  </span>
                  <span v-if="user.location" class="ml-3 flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ user.location }}
                  </span>
                </div>
              </div>
              <div class="flex justify-center md:justify-end space-x-3">
                <button v-if="canEdit" @click="toggleEditMode"
                  class="flex items-center bg-[#2FAC66] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#1e8a4f] transition-all duration-300 transform hover:scale-105">
                  <svg v-if="!isEditing" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ isEditing ? 'Save Changes' : 'Edit Profile' }}
                </button>

                <button v-if="!isCurrentUser" @click="toggleFollow"
                  class="flex items-center px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                  :class="user.isFollowing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-[#F24405]/20 text-white hover:bg-[#F24405]/60'">
                  <svg v-if="!user.isFollowing" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ user.isFollowing ? 'Following' : 'Follow' }}
                </button>

                <button v-if="!isCurrentUser" @click="showContactModal = true"
                  class="flex items-center bg-[#D9F9E9] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact
                </button>
              </div>
            </div>
            <div class="mt-4">
              <div v-if="isEditing" class="bg-gray-50 p-3 rounded-lg">
                <label class="block text-sm font-medium text-gray-700 mb-1">About</label>
                <textarea v-model="user.about"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2FAC66] focus:border-[#2FAC66] transition-colors"
                  rows="3" placeholder="Tell people about yourself..."></textarea>
              </div>
              <p v-else class="text-gray-600 mt-2 leading-relaxed">
                {{ user.about || 'No description provided' }}
              </p>
            </div>
            <div class="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
              <div class="stat-card">
                <span class="stat-value">{{ user.followers }}</span>
                <span class="stat-label">Followers</span>
              </div>
              <div class="stat-card">
                <span class="stat-value">{{ user.properties }}</span>
                <span class="stat-label">{{ user.role === 'Agent' ? 'Listings' : 'Properties' }}</span>
              </div>
              <div class="stat-card">
                <div class="flex items-center">
                  <span class="stat-value">{{ user.rating }}</span>
                  <span class="text-[#F24405] ml-1">★</span>
                </div>
                <span class="stat-label">Rating</span>
              </div>
              <div v-if="user.role === 'Agent' || user.role === 'Agency'" class="stat-card">
                <span class="stat-value">{{ user.sales || 0 }}</span>
                <span class="stat-label">Sales</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-8">
        <div class="relative">
          <div class="overflow-x-auto hide-scrollbar">
            <!-- condition rendering -->
            <div v-if="isCurrentUser" class="space-y-6" key="profile">
            <nav class="flex space-x-1 md:space-x-4 p-1 md:p-2 bg-white rounded-xl shadow-md">
              <button v-for="tab in getFilteredTabs()" :key="tab.id" @click="setActiveTab(tab.id)" class="tab-button"
                :class="activeTab === tab.id ? 'active-tab' : 'inactive-tab'">
                <span v-html="tab.icon"></span>
                {{ tab.name }}
              </button>
            </nav>
            </div>
            <div v-else class="space-y-6" key="public">
            <nav class="flex space-x-5 md:space-x-4 p-1 md:p-2 bg-white rounded-xl shadow-md">
              <button v-for="tab in getFilteredTabs()" :key="tab.id" @click="setActiveTab(tab.id)" class="tab-button"
                :class="activeTab === tab.id ? 'active-tab' : 'inactive-tab'">
                <div v-if="tab.accessType ==='public'" class="tab-button" key="public">
                <span v-html="tab.icon"></span>
                {{ tab.name }}
                </div>
              </button>
            </nav>
            </div>
          </div>
          <!-- Active Tab Indicator -->
          <div class="tab-indicator" :style="indicatorStyle"></div>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="relative bg-white rounded-2xl shadow-xl p-6 min-h-[400px] transition-all duration-500">
        <transition name="tab-transition" mode="out-in">
          <div>
          <!-- Profile Info -->
          <div v-if="activeTab === 'profile'" class="space-y-6" key="profile">
            <h3 class="text-xl font-bold text-gray-800 border-b pb-2">Personal Information</h3>
            <transition name="fade" mode="out-in">
              <div>
                <div v-if="isEditing" key="edit-profile">
                  <!-- Editable Fields -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="form-group">
                      <label>First Name</label>
                      <input v-model="user.firstName" type="text" class="form-input" />
                    </div>
                    <div class="form-group">
                      <label>Last Name</label>
                      <input v-model="user.lastName" type="text" class="form-input" />
                    </div>
                    <div class="form-group">
                      <label>Phone</label>
                      <input v-model="user.phone" type="text" class="form-input" />
                    </div>
                    <div class="form-group">
                      <label>Email</label>
                      <input v-model="user.email" type="email" disabled
                        class="form-input bg-gray-100 cursor-not-allowed" />
                    </div>

                    <div v-if="user.role === 'Agent' || user.role === 'Agency'" class="form-group">
                      <label>License Number</label>
                      <input v-model="user.licenseNumber" type="text" class="form-input" />
                    </div>

                    <div class="form-group">
                      <label>Location</label>
                      <input v-model="user.location" type="text" class="form-input" placeholder="City, State" />
                    </div>

                    <div v-if="user.role === 'Agency'" class="form-group md:col-span-2">
                      <label>Agency Website</label>
                      <input v-model="user.website" type="url" class="form-input" placeholder="https://example.com" />
                    </div>
                  </div>

                  <div class="mt-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Social Media</label>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div class="flex items-center border rounded-lg p-2">
                        <span class="text-[#8DAD9D] mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                              d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                        </span>
                        <input v-model="user.social.facebook" type="text" class="flex-1 border-0 focus:ring-0"
                          placeholder="Facebook username" />
                      </div>
                      <div class="flex items-center border rounded-lg p-2">
                        <span class="text-[#8DAD9D] mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </span>
                        <input v-model="user.social.twitter" type="text" class="flex-1 border-0 focus:ring-0"
                          placeholder="Twitter username" />
                      </div>
                      <div class="flex items-center border rounded-lg p-2">
                        <span class="text-[#8DAD9D] mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </span>
                        <input v-model="user.social.linkedin" type="text" class="flex-1 border-0 focus:ring-0"
                          placeholder="LinkedIn username" />
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else key="view-profile">
                  <!-- Display Fields -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div class="info-group">
                      <span class="info-label">First Name</span>
                      <p class="info-value">{{ user.firstName }}</p>
                    </div>
                    <div class="info-group">
                      <span class="info-label">Last Name</span>
                      <p class="info-value">{{ user.lastName }}</p>
                    </div>
                    <div class="info-group">
                      <span class="info-label">Phone</span>
                      <p class="info-value">{{ user.phone }}</p>
                    </div>
                    <div class="info-group">
                      <span class="info-label">Email</span>
                      <p class="info-value">{{ user.email }}</p>
                    </div>

                    <div v-if="user.role === 'Agent' || user.role === 'Agency'" class="info-group">
                      <span class="info-label">License Number</span>
                      <p class="info-value">{{ user.licenseNumber || 'Not provided' }}</p>
                    </div>

                    <div class="info-group">
                      <span class="info-label">Location</span>
                      <p class="info-value">{{ user.location || 'Not provided' }}</p>
                    </div>

                    <div v-if="user.role === 'Agency'" class="info-group md:col-span-2">
                      <span class="info-label">Agency Website</span>
                      <p class="info-value">
                        <a v-if="user.website" :href="user.website" target="_blank"
                          class="text-blue-600 hover:underline">
                          {{ user.website }}
                        </a>
                        <span v-else>Not provided</span>
                      </p>
                    </div>
                  </div>

                  <div v-if="hasSocialLinks" class="mt-8">
                    <h4 class="text-lg font-medium text-gray-800 mb-3">Social Media</h4>
                    <div class="flex space-x-4">
                      <a v-if="user.social.facebook" :href="`https://facebook.com/${user.social.facebook}`"
                        target="_blank" class="social-link facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                          fill="currentColor">
                          <path
                            d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      <a v-if="user.social.twitter" :href="`https://twitter.com/${user.social.twitter}`" target="_blank"
                        class="social-link twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                          fill="currentColor">
                          <path
                            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                      <a v-if="user.social.linkedin" :href="`https://linkedin.com/in/${user.social.linkedin}`"
                        target="_blank" class="social-link linkedin">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                          fill="currentColor">
                          <path
                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Properties/Listings -->
          <div v-if="activeTab === 'properties'" key="properties" class="space-y-6">
            <div class="flex flex-col md:flex-row justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-gray-800">
                {{ user.role === 'Agent' ? 'Listings' : 'Properties' }}
              </h3>
              <div class="mt-3 md:mt-0 flex space-x-2">
                <div class="relative">
                  <input v-model="propertyFilters.search" type="text" placeholder="Search..."
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2FAC66] focus:border-[#2FAC66]" />
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select v-model="propertyFilters.sort"
                  class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#2FAC66] focus:border-[#2FAC66]">
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                </select>
              </div>
            </div>

            <transition-group name="property-list" tag="div"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-if="filteredProperties.length === 0" class="col-span-3 text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p class="mt-4 text-gray-600">No properties found</p>
                <button v-if="canEdit" @click="addNewProperty"
                  class="mt-4 inline-flex items-center px-4 py-2 bg-[#2FAC66] text-white rounded-lg hover:bg-[#1e8a4f] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Property
                </button>
              </div>

              <div v-for="property in filteredProperties" :key="property.id" class="property-card group">
                <div class="relative overflow-hidden rounded-t-lg h-48">
                  <img :src="property.image" :alt="property.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
                  <div class="absolute top-2 right-2 flex space-x-2">
                    <span class="status-badge" :class="getStatusClass(property.status)">
                      {{ property.status }}
                    </span>
                    <button v-if="canEdit" @click="editProperty(property)"
                      class="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#2FAC66] transition-colors">
                    {{ property.title }}
                  </h3>
                  <p class="text-[#2FAC66] font-bold mt-1">${{ formatPrice(property.price) }}</p>
                  <div class="flex items-center mt-2 text-gray-600 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ property.location }}
                  </div>
                  <div class="mt-3 flex items-center justify-between border-t pt-3">
                    <div class="flex space-x-3 text-sm text-gray-600">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {{ property.bedrooms }} bd
                      </div>
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        {{ property.bathrooms }} ba
                      </div>
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        {{ property.size }} sqft
                      </div>
                    </div>
                    <div>
                      <span v-if="property.featured"
                        class="inline-flex items-center bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Featured
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>

            <div v-if="filteredProperties.length > 0 && canEdit" class="flex justify-center mt-8">
              <button @click="addNewProperty"
                class="inline-flex items-center px-4 py-2 bg-[#2FAC66] text-white rounded-lg hover:bg-[#1e8a4f] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New Property
              </button>
            </div>
          </div>

          <!-- Transactions -->
          <div v-if="activeTab === 'transactions'" key="transactions" class="space-y-6">
            <div class="flex flex-col md:flex-row justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-gray-800">Transaction History</h3>
              <div class="mt-3 md:mt-0 flex space-x-2">
                <select v-model="transactionFilters.status"
                  class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#2FAC66] focus:border-[#2FAC66]">
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select v-model="transactionFilters.type"
                  class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#2FAC66] focus:border-[#2FAC66]">
                  <option value="all">All Types</option>
                  <option value="sale">Sale</option>
                  <option value="purchase">Purchase</option>
                  <option value="rental">Rental</option>
                </select>
              </div>
            </div>

            <transition-group name="transaction-list" tag="div" class="space-y-4">
              <div v-if="filteredTransactions.length === 0" class="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p class="mt-4 text-gray-600">No transactions found</p>
              </div>

              <div v-for="transaction in filteredTransactions" :key="transaction.id"
                class="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div class="flex flex-col md:flex-row justify-between">
                  <div class="flex flex-col md:flex-row md:items-center gap-3">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center"
                        :class="getTransactionIconClass(transaction.type)">
                        <svg v-if="transaction.type === 'Sale'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else-if="transaction.type === 'Purchase'" xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">{{ transaction.propertyName }}</h3>
                      <p class="text-gray-500 text-sm">{{ formatDate(transaction.date) }}</p>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mt-4 md:mt-0">
                    <span class="transaction-status-badge mr-4" :class="getTransactionStatusClass(transaction.status)">
                      {{ transaction.status }}
                    </span>
                    <div class="text-right">
                      <p class="text-lg font-bold" :class="getTransactionAmountClass(transaction.type)">
                        {{ transaction.type === 'Purchase' ? '-' : '+' }}${{ formatPrice(transaction.amount) }}
                      </p>
                      <p class="text-sm text-gray-600">{{ transaction.type }}</p>
                    </div>
                  </div>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  <span class="transaction-detail-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    ID: #{{ transaction.id }}
                  </span>
                  <span class="transaction-detail-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {{ transaction.reference || 'No reference' }}
                  </span>
                  <span v-if="transaction.agent" class="transaction-detail-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Agent: {{ transaction.agent }}
                  </span>
                </div>
              </div>
            </transition-group>

            <div v-if="filteredTransactions.length > 0" class="flex justify-center mt-4">
              <button class="text-[#2FAC66] hover:text-[#1e8a4f] flex items-center font-medium">
                Load More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Reviews -->
          <div v-if="activeTab === 'reviews'" key="reviews" class="space-y-6">
            <div class="flex flex-col md:flex-row justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-gray-800">Reviews & Ratings</h3>
              <div class="mt-3 md:mt-0">
                <select v-model="reviewFilters.rating"
                  class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#2FAC66] focus:border-[#2FAC66]">
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-6 mb-6">
              <div class="flex flex-col md:flex-row items-center">
                <div class="flex-shrink-0 text-center md:text-left md:pr-8 md:border-r md:border-gray-300">
                  <div class="text-5xl font-bold text-[#2FAC66]">{{ user.rating }}</div>
                  <div class="flex justify-center md:justify-start mt-2">
                    <div class="flex">
                      <template v-for="star in 5" :key="star">
                        <svg xmlns="http://www.w3.org/2000/svg"
                          :class="star <= Math.round(user.rating) ? 'text-[#F24405]' : 'text-gray-300'" class="h-6 w-6"
                          viewBox="0 0 20 20" fill="currentColor">
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </template>
                    </div>
                  </div>
                  <div class="text-gray-500 mt-1">Based on {{ reviews.length }} reviews</div>
                </div>

                <div class="flex-1 mt-6 md:mt-0 md:pl-8 w-full">
                  <div class="space-y-2">
                    <div v-for="star in 5" :key="star" class="flex items-center">
                      <div class="flex items-center w-16">
                        <span class="text-sm text-gray-600">{{ 6 - star }} stars</span>
                      </div>
                      <div class="flex-1 h-4 mx-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-[#2FAC66]" :style="{ width: `${getStarPercentage(6 - star)}%` }"></div>
                      </div>
                      <div class="w-16 text-sm text-gray-600">
                        {{ getStarCount(6 - star) }} ({{ getStarPercentage(6 - star) }}%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!isCurrentUser" class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h4 class="text-lg font-semibold mb-3">Write a Review</h4>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div class="flex">
                  <template v-for="star in 5" :key="star">
                    <button @click="newReview.rating = star" class="focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        :class="star <= newReview.rating ? 'text-[#F24405]' : 'text-gray-300 hover:text-gray-400'"
                        class="h-8 w-8 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  </template>
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea v-model="newReview.comment" rows="3"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2FAC66] focus:border-[#2FAC66]"
                  placeholder="Share your experience..."></textarea>
              </div>
              <button @click="submitReview"
                class="bg-[#2FAC66] text-white px-4 py-2 rounded-lg hover:bg-[#1e8a4f] transition-colors"
                :disabled="!newReview.rating || !newReview.comment"
                :class="{ 'opacity-50 cursor-not-allowed': !newReview.rating || !newReview.comment }">
                Submit Review
              </button>
            </div>

            <transition-group name="review-list" tag="div" class="space-y-6">
              <div v-if="filteredReviews.length === 0" class="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p class="mt-4 text-gray-600">No reviews found</p>
              </div>

              <div v-for="review in filteredReviews" :key="review.id"
                class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div class="flex items-start space-x-4">
                  <img
                    :src="review.userImage || getAvatarUrl(review.userName.split(' ')[0], review.userName.split(' ')[1])"
                    class="w-12 h-12 rounded-full object-cover" />
                  <div class="flex-1 min-w-0">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 class="font-semibold text-gray-900 truncate">{{ review.userName }}</h3>
                      <div class="flex items-center mt-1 sm:mt-0">
                        <div class="flex">
                          <template v-for="star in 5" :key="star">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              :class="star <= review.rating ? 'text-[#F24405]' : 'text-gray-300'" class="h-5 w-5"
                              viewBox="0 0 20 20" fill="currentColor">
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </template>
                          <span class="ml-1 text-gray-500 text-sm">{{ review.rating }}/5</span>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 text-gray-600">{{ review.comment }}</p>
                    <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <p class="text-sm text-gray-500">{{ formatDate(review.date) }}</p>
                      <div v-if="review.propertyName" class="text-sm">
                        <span class="text-gray-500">Property: </span>
                        <span class="text-[#2FAC66]">{{ review.propertyName }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>

            <div v-if="filteredReviews.length > 0" class="flex justify-center mt-4">
              <button class="text-[#2FAC66] hover:text-[#1e8a4f] flex items-center font-medium">
                Load More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Settings -->
          <div v-if="activeTab === 'settings'" key="settings" class="space-y-8">
            <section>
              <h3 class="text-xl font-bold text-gray-800 mb-4">Account Settings</h3>
              <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="p-6 space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <input type="email" v-model="settings.email" class="form-input" disabled />
                        <button
                          class="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8DAD9D] hover:bg-[#8DAD9D]/20 hover:text-[#005C53] focus:outline-none">
                          Change
                        </button>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <input type="password" value="************" class="form-input" disabled />
                        <button
                          class="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8DAD9D] hover:bg-[#8DAD9D]/20 hover:text-[#005C53] focus:outline-none">
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 pt-6">
                    <h4 class="text-lg font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-gray-500">Add an extra layer of security to your account</p>
                        <p class="text-sm text-gray-400 mt-1">We'll send a verification code to your phone when you sign
                          in</p>
                      </div>
                      <label class="switch">
                        <input type="checkbox" v-model="settings.twoFactorAuth">
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 pt-6">
                    <h4 class="text-lg font-medium text-gray-900 mb-3">Sessions</h4>
                    <div class="space-y-4">
                      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mr-3" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p class="font-medium">Current session</p>
                            <p class="text-sm text-gray-500">Windows • Chrome • IP 192.168.1.1</p>
                          </div>
                        </div>
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                      </div>
                    </div>
                    <button class="mt-4 text-red-600 hover:text-red-800 text-sm font-medium">Sign out of all
                      sessions</button>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-xl font-bold text-gray-800 mb-4">Notification Settings</h3>
              <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="p-6 space-y-6">
                  <div class="border-b border-gray-200 pb-6">
                    <h4 class="text-lg font-medium text-gray-900 mb-3">Email Notifications</h4>
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium">New messages</p>
                          <p class="text-sm text-gray-500">Get notified when you receive new messages</p>
                        </div>
                        <label class="switch">
                          <input type="checkbox" v-model="settings.emailNotifications.messages">
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium">Property updates</p>
                          <p class="text-sm text-gray-500">Get notified about your property listings</p>
                        </div>
                        <label class="switch">
                          <input type="checkbox" v-model="settings.emailNotifications.properties">
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium">Transaction updates</p>
                          <p class="text-sm text-gray-500">Get notified about transaction status changes</p>
                        </div>
                        <label class="switch">
                          <input type="checkbox" v-model="settings.emailNotifications.transactions">
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="border-b border-gray-200 pb-6">
                    <h4 class="text-lg font-medium text-gray-900 mb-3">SMS Notifications</h4>
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium">Enable SMS notifications</p>
                          <p class="text-sm text-gray-500">Get important updates via text message</p>
                        </div>
                        <label class="switch">
                          <input type="checkbox" v-model="settings.smsNotifications.enabled">
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <div v-if="settings.smsNotifications.enabled">
                        <div class="flex items-center justify-between mt-4">
                          <div>
                            <p class="font-medium">Security alerts</p>
                            <p class="text-sm text-gray-500">Get notified about suspicious account activity</p>
                          </div>
                          <label class="switch">
                            <input type="checkbox" v-model="settings.smsNotifications.security">
                            <span class="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 class="text-lg font-medium text-gray-900 mb-3">In-App Notifications</h4>
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium">Push notifications</p>
                          <p class="text-sm text-gray-500">Receive push notifications on your device</p>
                        </div>
                        <label class="switch">
                          <input type="checkbox" v-model="settings.pushNotifications">
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium">Activity feed</p>
                          <p class="text-sm text-gray-500">Show updates in your activity feed</p>
                        </div>
                        <label class="switch">
                          <input type="checkbox" v-model="settings.activityFeed">
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 class="text-xl font-bold text-gray-800 mb-4">Privacy Settings</h3>
              <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="p-6 space-y-6">
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium">Profile Visibility</p>
                        <p class="text-sm text-gray-500">Make your profile visible to others</p>
                      </div>
                      <label class="switch">
                        <input type="checkbox" v-model="settings.privacy.profileVisibility">
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium">Show Email</p>
                        <p class="text-sm text-gray-500">Display your email address on your profile</p>
                      </div>
                      <label class="switch">
                        <input type="checkbox" v-model="settings.privacy.showEmail">
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium">Show Phone Number</p>
                        <p class="text-sm text-gray-500">Display your phone number on your profile</p>
                      </div>
                      <label class="switch">
                        <input type="checkbox" v-model="settings.privacy.showPhone">
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium">Show Transaction History</p>
                        <p class="text-sm text-gray-500">Allow others to see your transaction history</p>
                      </div>
                      <label class="switch">
                        <input type="checkbox" v-model="settings.privacy.showTransactions">
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 pt-6">
                    <h4 class="text-lg font-medium text-gray-900 mb-3">Data Management</h4>
                    <p class="text-gray-500 mb-4">Manage your account data and preferences</p>
                    <div class="flex flex-wrap gap-3">
                      <button
                        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export Data
                      </button>
                      <button
                        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div class="flex justify-end space-x-4 pt-4">
              <button
                class="px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                Cancel
              </button>
              <button @click="saveSettings"
                class="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#2FAC66] hover:bg-[#1e8a4f] focus:outline-none">
                Save Settings
              </button>
            </div>
          </div>
        </div>
        </transition>

        <!-- Loading Overlay -->
        <div v-if="loading"
          class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-2xl z-10">
          <div class="loader"></div>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    <transition name="modal">
      <div v-if="showContactModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="showContactModal = false"></div>

          <div class="relative bg-white rounded-lg max-w-md w-full shadow-xl transform transition-all">
            <div class="absolute top-3 right-3">
              <button @click="showContactModal = false" class="text-gray-400 hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Contact {{ user.firstName }}</h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input v-model="contactForm.subject" type="text" class="form-input"
                    placeholder="What is this regarding?" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea v-model="contactForm.message" rows="4" class="form-input"
                    placeholder="Type your message here..."></textarea>
                </div>

                <div class="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                  <div class="flex items-center">
                    <input id="saveInfo" type="checkbox"
                      class="h-4 w-4 text-[#2FAC66] focus:ring-[#2FAC66] border-gray-300 rounded">
                    <label for="saveInfo" class="ml-2 block text-sm text-gray-900">
                      Save my info for future contacts
                    </label>
                  </div>
                </div>

                <div class="flex justify-end space-x-3 pt-2">
                  <button @click="showContactModal = false"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    Cancel
                  </button>
                  <button @click="sendMessage"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2FAC66] hover:bg-[#1e8a4f] focus:outline-none"
                    :disabled="!contactForm.subject || !contactForm.message"
                    :class="{ 'opacity-50 cursor-not-allowed': !contactForm.subject || !contactForm.message }">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Toast Notifications -->
    <div class="fixed bottom-4 right-4 z-50">
      <transition-group name="toast">
        <div v-for="toast in toasts" :key="toast.id" class="mb-2 p-4 rounded-lg shadow-lg max-w-md flex items-center"
          :class="getToastClass(toast.type)">
          <div v-if="toast.type === 'success'" class="flex-shrink-0 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div v-else-if="toast.type === 'error'" class="flex-shrink-0 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div v-else class="flex-shrink-0 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex-1 mr-2">{{ toast.message }}</div>
          <button @click="removeToast(toast.id)" class="flex-shrink-0 text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted, nextTick } from 'vue'

// State
const isEditing = ref(false)
const loading = ref(false)
const activeTab = ref('profile')
const showContactModal = ref(false)
const activeTabElement = ref(null)
const isCurrentUser = ref(true) // Toggle this for testing different views
const canEdit = computed(() => isCurrentUser.value)

// Toast notifications
const toasts = ref([])
const toastIdCounter = ref(0)

// Contact form data
const contactForm = reactive({
  subject: '',
  message: ''
})

definePageMeta({
  layout: 'profile-layout'
});

// New review form
const newReview = reactive({
  rating: 0,
  comment: ''
})

// Filter states
const propertyFilters = reactive({
  search: '',
  sort: 'price-desc'
})

const transactionFilters = reactive({
  status: 'all',
  type: 'all'
})

const reviewFilters = reactive({
  rating: 'all'
})

// User data with role-based fields
const user = reactive({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  role: 'Agent', // Can be: 'Property Owner', 'Agent', 'Agency', 'User'
  about: 'Experienced property owner with over 10 years in real estate investment. Specializing in residential properties in urban areas. Passionate about sustainable housing and community development.',
  profilePicture: '', // Will use placeholders and generate avatars
  location: 'San Francisco, CA',
  verified: true,
  isFollowing: false,
  followers: 245,
  properties: 12,
  rating: 4.8,
  sales: 32, // For Agent/Agency roles
  licenseNumber: 'RE-123456', // For Agent/Agency roles
  website: 'https://johndoerealty.com', // For Agency role
  social: {
    facebook: 'johndoe',
    twitter: 'johndoe',
    linkedin: 'johndoe'
  }
})

// Computed property to check if there are any social links
const hasSocialLinks = computed(() => {
  return user.social.facebook || user.social.twitter || user.social.linkedin
})

// Mock properties with more details
const properties = ref([
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    price: 450000,
    location: 'Downtown, San Francisco',
    image: 'https://via.placeholder.com/600x400/2FAC66/FFFFFF?text=Modern+Apartment',
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    status: 'For Sale',
    featured: true,
    date: '2023-12-01'
  },
  {
    id: 2,
    title: 'Suburban Family Home',
    price: 650000,
    location: 'Oakland Hills, CA',
    image: 'https://via.placeholder.com/600x400/005C53/FFFFFF?text=Family+Home',
    bedrooms: 4,
    bathrooms: 3,
    size: 2400,
    status: 'For Sale',
    featured: false,
    date: '2023-11-15'
  },
  {
    id: 3,
    title: 'Luxury Penthouse',
    price: 1200000,
    location: 'Financial District, SF',
    image: 'https://via.placeholder.com/600x400/F24405/FFFFFF?text=Luxury+Penthouse',
    bedrooms: 3,
    bathrooms: 3.5,
    size: 3000,
    status: 'For Sale',
    featured: true,
    date: '2023-10-20'
  },
  {
    id: 4,
    title: 'Beachfront Condo',
    price: 850000,
    location: 'Ocean Beach, San Francisco',
    image: 'https://via.placeholder.com/600x400/8DAD9D/FFFFFF?text=Beachfront+Condo',
    bedrooms: 2,
    bathrooms: 2,
    size: 1500,
    status: 'Pending',
    featured: false,
    date: '2023-12-10'
  },
  {
    id: 5,
    title: 'Charming Victorian',
    price: 1100000,
    location: 'Pacific Heights, SF',
    image: 'https://via.placeholder.com/600x400/FF6B35/FFFFFF?text=Victorian+Home',
    bedrooms: 4,
    bathrooms: 2.5,
    size: 2800,
    status: 'Sold',
    featured: false,
    date: '2023-09-05'
  }
])

// Mock transactions with more details
const transactions = ref([
  {
    id: 101,
    propertyName: 'Modern Downtown Apartment',
    date: '2023-12-01',
    status: 'Completed',
    amount: 450000,
    type: 'Sale',
    reference: 'TX-2023-1201',
    agent: 'Sarah Johnson'
  },
  {
    id: 102,
    propertyName: 'Suburban Family Home',
    date: '2023-11-15',
    status: 'Pending',
    amount: 650000,
    type: 'Purchase',
    reference: 'TX-2023-1115',
    agent: 'Michael Rodriguez'
  },
  {
    id: 103,
    propertyName: 'Beach View Condo',
    date: '2023-10-22',
    status: 'Completed',
    amount: 12000,
    type: 'Rental',
    reference: 'TX-2023-1022',
    agent: null
  },
  {
    id: 104,
    propertyName: 'Mountain Retreat',
    date: '2023-09-05',
    status: 'Cancelled',
    amount: 850000,
    type: 'Purchase',
    reference: 'TX-2023-0905',
    agent: 'Lisa Chang'
  }
])

// Mock reviews with more details
const reviews = ref([
  {
    id: 1,
    userName: 'Jane Smith',
    userImage: 'https://via.placeholder.com/150/8DAD9D/FFFFFF?text=JS',
    rating: 5,
    comment: 'Excellent property owner! Very professional and responsive. The property was exactly as described and the whole process was smooth from beginning to end.',
    date: '2023-12-01',
    propertyName: 'Modern Downtown Apartment'
  },
  {
    id: 2,
    userName: 'Mike Johnson',
    userImage: 'https://via.placeholder.com/150/005C53/FFFFFF?text=MJ',
    rating: 4,
    comment: 'Good experience overall. John was helpful and communicative throughout the process. The only issue was a slight delay in the paperwork, but everything else was great.',
    date: '2023-11-15',
    propertyName: 'Suburban Family Home'
  },
  {
    id: 3,
    userName: 'Sarah Wilson',
    userImage: 'https://via.placeholder.com/150/F24405/FFFFFF?text=SW',
    rating: 5,
    comment: 'John is a fantastic property owner. He was very accommodating with our schedule and made sure everything was perfect for our move-in date.',
    date: '2023-10-20',
    propertyName: 'Luxury Penthouse'
  },
  {
    id: 4,
    userName: 'David Lee',
    userImage: 'https://via.placeholder.com/150/2FAC66/FFFFFF?text=DL',
    rating: 3,
    comment: 'The property was nice but there were some maintenance issues that took longer than expected to resolve. John was responsive but the process could have been smoother.',
    date: '2023-09-05',
    propertyName: 'Beachfront Condo'
  }
])

// Settings data
const settings = reactive({
  email: 'john.doe@example.com',
  twoFactorAuth: true,
  emailNotifications: {
    messages: true,
    properties: true,
    transactions: false
  },
  smsNotifications: {
    enabled: false,
    security: true
  },
  pushNotifications: true,
  activityFeed: true,
  privacy: {
    profileVisibility: true,
    showEmail: false,
    showPhone: true,
    showTransactions: false
  }
})

// Computed properties for filtered data
const filteredProperties = computed(() => {
  let result = [...properties.value]

  // Filter by search term
  if (propertyFilters.search) {
    const searchTerm = propertyFilters.search.toLowerCase()
    result = result.filter(property =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm)
    )
  }

  // Sort results
  if (propertyFilters.sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (propertyFilters.sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (propertyFilters.sort === 'date-desc') {
    result.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (propertyFilters.sort === 'date-asc') {
    result.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  return result
})

const filteredTransactions = computed(() => {
  let result = [...transactions.value]

  // Filter by status
  if (transactionFilters.status !== 'all') {
    const statusFilter = transactionFilters.status.charAt(0).toUpperCase() + transactionFilters.status.slice(1)
    result = result.filter(transaction => transaction.status === statusFilter)
  }

  // Filter by type
  if (transactionFilters.type !== 'all') {
    const typeFilter = transactionFilters.type.charAt(0).toUpperCase() + transactionFilters.type.slice(1)
    result = result.filter(transaction => transaction.type === typeFilter)
  }

  // Sort by date, newest first
  result.sort((a, b) => new Date(b.date) - new Date(a.date))

  return result
})

const filteredReviews = computed(() => {
  let result = [...reviews.value]

  // Filter by rating
  if (reviewFilters.rating !== 'all') {
    result = result.filter(review => review.rating === parseInt(reviewFilters.rating))
  }

  // Sort by date, newest first
  result.sort((a, b) => new Date(b.date) - new Date(a.date))

  return result
})

// Tab indicator positioning
const indicatorStyle = computed(() => {
  if (!activeTabElement.value) return { display: 'none' }

  const el = activeTabElement.value
  const rect = el.getBoundingClientRect()
  const parentRect = el.parentElement.getBoundingClientRect()

  return {
    left: `${rect.left - parentRect.left}px`,
    width: `${rect.width}px`
  }
})

// Methods
const toggleEditMode = () => {
  if (isEditing.value) {
    // Save changes
    showToast('Changes saved successfully', 'success')
  }
  isEditing.value = !isEditing.value
}

const setActiveTab = async (tabId) => {
  loading.value = true
  activeTab.value = tabId

  // Simulate data loading
  await new Promise(resolve => setTimeout(resolve, 300))
  loading.value = false

  // Update the active tab element reference for indicator positioning
  await nextTick()
  activeTabElement.value = document.querySelector(`.tab-button.active-tab`)
}

const openImageUpload = () => {
  document.querySelector('input[type="file"]').click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // In a real implementation, you would upload this file to a server
  // Here we'll use FileReader to show a preview
  const reader = new FileReader()
  reader.onload = (e) => {
    user.profilePicture = e.target.result
    showToast('Profile picture updated', 'success')
  }
  reader.readAsDataURL(file)
}

const toggleFollow = () => {
  user.isFollowing = !user.isFollowing
  if (user.isFollowing) {
    user.followers++
    showToast(`You're now following ${user.firstName}`, 'success')
  } else {
    user.followers--
    showToast(`You've unfollowed ${user.firstName}`, 'info')
  }
}

const sendMessage = () => {
  showToast(`Message sent to ${user.firstName}`, 'success')
  showContactModal.value = false
  contactForm.subject = ''
  contactForm.message = ''
}

const saveSettings = () => {
  loading.value = true

  // Simulate API call
  setTimeout(() => {
    loading.value = false
    showToast('Settings saved successfully', 'success')
  }, 800)
}

const submitReview = () => {
  // Add the new review to the reviews array
  const newId = reviews.value.length > 0 ? Math.max(...reviews.value.map(r => r.id)) + 1 : 1

  reviews.value.unshift({
    id: newId,
    userName: 'You', // In a real app, this would be the current user's name
    userImage: 'https://via.placeholder.com/150/2FAC66/FFFFFF?text=You',
    rating: newReview.rating,
    comment: newReview.comment,
    date: new Date().toISOString().split('T')[0],
    propertyName: null
  })

  // Update the user's average rating
  const totalRatings = reviews.value.reduce((sum, review) => sum + review.rating, 0)
  user.rating = (totalRatings / reviews.value.length).toFixed(1)

  // Reset the form
  newReview.rating = 0
  newReview.comment = ''

  showToast('Review submitted successfully', 'success')
}

const addNewProperty = () => {
  // This would open a property creation form in a real app
  showToast('Property creation feature coming soon', 'info')
}

const editProperty = (property) => {
  // This would open a property editing form in a real app
  showToast(`Editing ${property.title}`, 'info')
}

const showToast = (message, type = 'info') => {
  const id = ++toastIdCounter.value
  toasts.value.push({ id, message, type })

  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

const removeToast = (id) => {
  toasts.value = toasts.value.filter(toast => toast.id !== id)
}

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Helper functions for dynamic classes and styles
const getRoleBadgeClass = () => {
  switch (user.role) {
    case 'Property Owner':
      return 'bg-green-100 text-green-800'
    case 'Agent':
      return 'bg-blue-100 text-blue-800'
    case 'Agency':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getFilteredTabs = () => {
  const allTabs = [
    {
      id: 'profile',
      name: 'Profile',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      accessType: 'public'
    },
    {
      id: 'properties',
      name: user.role === 'Agent' ? 'Listings' : 'Properties',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
      accessType: 'public'
    },
    {
      id: 'transactions',
      name: 'Transactions',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
      accessType: 'private'

    },
    {
      id: 'reviews',
      name: 'Reviews',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>',
      accessType:'public'

    },
    {
      id: 'settings',
      name: 'Settings',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
      accessType:'private'

    }
  ]

  // If the user role is simple User, transactions tab might not be needed
  if (user.role === 'User') {
    return allTabs.filter(tab => tab.id !== 'transactions')
  }

  return allTabs
}

const getStatusClass = (status) => {
  switch (status) {
    case 'For Sale':
      return 'bg-green-500 text-white'
    case 'Pending':
      return 'bg-yellow-500 text-white'
    case 'Sold':
      return 'bg-blue-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const getTransactionStatusClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getTransactionIconClass = (type) => {
  switch (type) {
    case 'Sale':
      return 'bg-green-100 text-green-600'
    case 'Purchase':
      return 'bg-blue-100 text-blue-600'
    case 'Rental':
      return 'bg-purple-100 text-purple-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const getTransactionAmountClass = (type) => {
  switch (type) {
    case 'Sale':
      return 'text-green-600'
    case 'Purchase':
      return 'text-red-600'
    case 'Rental':
      return 'text-purple-600'
    default:
      return 'text-gray-800'
  }
}

const getToastClass = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 text-green-800 border border-green-200'
    case 'error':
      return 'bg-red-50 text-red-800 border border-red-200'
    case 'warning':
      return 'bg-yellow-50 text-yellow-800 border border-yellow-200'
    default:
      return 'bg-blue-50 text-blue-800 border border-blue-200'
  }
}

// Generate avatar URLs based on initials
const getAvatarUrl = (firstName, lastName) => {
  const initials = `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`
  return `https://via.placeholder.com/150/2FAC66/FFFFFF?text=${initials}`
}

// Review stats methods
const getStarCount = (rating) => {
  return reviews.value.filter(review => review.rating === rating).length
}

const getStarPercentage = (rating) => {
  const count = getStarCount(rating)
  return reviews.value.length > 0 ? Math.round((count / reviews.value.length) * 100) : 0
}

// Lifecycle hooks
onMounted(async () => {
  // Set the initial active tab element
  await nextTick()
  activeTabElement.value = document.querySelector('.tab-button.active-tab')

  // Show welcome toast for demo purposes
  setTimeout(() => {
    showToast(`Welcome to ${user.firstName}'s profile`, 'info')
  }, 1000)
})

// Watch for tab changes to update the indicator position
watch(activeTab, async () => {
  await nextTick()
  activeTabElement.value = document.querySelector('.tab-button.active-tab')
})
</script>

<style scoped>
/* Custom scrollbar hiding */
.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* Tab indicator */
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 3px;
  background-color: #2FAC66;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* Tab buttons */
.tab-button {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.active-tab {
  color: #2FAC66;
  background-color: rgba(47, 172, 102, 0.1);
}

.inactive-tab {
  color: #6B7280;
}

.inactive-tab:hover {
  color: #374151;
  background-color: rgba(47, 172, 102, 0.05);
}

/* Stats cards */
.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: rgba(47, 172, 102, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background-color: rgba(47, 172, 102, 0.1);
  transform: translateY(-2px);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #005C53;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
}

/* Form elements */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #2FAC66;
  box-shadow: 0 0 0 3px rgba(47, 172, 102, 0.2);
}

/* Information display */
.info-group {
  margin-bottom: 1rem;
}

.info-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 0.95rem;
  color: #1F2937;
}

/* Property card */
.property-card {
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

/* Transaction styles */
.transaction-status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.transaction-detail-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  color: #6B7280;
  background-color: #F3F4F6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

/* Social media links */
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.social-link.facebook {
  background-color: #1877F2;
  color: white;
}

.social-link.twitter {
  background-color: #1DA1F2;
  color: white;
}

.social-link.linkedin {
  background-color: #0A66C2;
  color: white;
}

.social-link:hover {
  transform: scale(1.1);
}

/* Toggle switch */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #2FAC66;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2FAC66;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

/* Loading indicator */
.loader {
  border: 4px solid rgba(47, 172, 102, 0.1);
  border-radius: 50%;
  border-top: 4px solid #2FAC66;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tab-transition-enter-active,
.tab-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tab-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.tab-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.property-list-enter-active,
.property-list-leave-active,
.transaction-list-enter-active,
.transaction-list-leave-active,
.review-list-enter-active,
.review-list-leave-active {
  transition: all 0.5s ease;
}

.property-list-enter-from,
.transaction-list-enter-from,
.review-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.property-list-leave-to,
.transaction-list-leave-to,
.review-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
</style>