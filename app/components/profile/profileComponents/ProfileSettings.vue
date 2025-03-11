<template>
    <div class="space-y-8 animate-fadeIn">
      <div class="bg-white rounded-lg">
        <h3 class="text-lg font-medium text-[#005C53] mb-4">Notification Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-[#D9F9E9] transition-colors duration-200">
            <div>
              <span class="font-medium text-gray-900">Email Notifications</span>
              <p class="text-sm text-gray-500 mt-1">Receive updates about your properties and account</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settingsData.emailNotifications">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-[#D9F9E9] transition-colors duration-200">
            <div>
              <span class="font-medium text-gray-900">SMS Notifications</span>
              <p class="text-sm text-gray-500 mt-1">Get text messages for important updates</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settingsData.smsNotifications">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg">
        <h3 class="text-lg font-medium text-[#005C53] mb-4">Privacy Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-[#D9F9E9] transition-colors duration-200">
            <div>
              <span class="font-medium text-gray-900">Profile Visibility</span>
              <p class="text-sm text-gray-500 mt-1">Control who can see your profile information</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settingsData.profileVisibility">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-[#D9F9E9] transition-colors duration-200">
            <div>
              <span class="font-medium text-gray-900">Search Engine Indexing</span>
              <p class="text-sm text-gray-500 mt-1">Allow search engines to index your profile</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="settingsData.searchEngineIndexing">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        settingsData: {
          emailNotifications: false,
          smsNotifications: false,
          profileVisibility: false,
          searchEngineIndexing: false,
        },
      };
    },
  };
  </script>
  
  <style scoped>
  .switch {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 20px;
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
    border-radius: 20px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:checked + .slider:before {
    transform: translateX(14px);
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>