<template>
    <div class="animate-fadeIn">
      <h2 class="text-xl font-bold text-[#005C53] mb-6">Profile Information</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Personal Info Section -->
        <div class="bg-[#D9F9E9] rounded-lg p-6">
          <h3 class="text-lg font-semibold text-[#005C53] mb-4">Personal Information</h3>
          
          <div v-if="isEditing" class="space-y-4">
            <!-- Edit Mode -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  v-model="formData.firstName" 
                  type="text" 
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2FAC66] focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  v-model="formData.lastName" 
                  type="text" 
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2FAC66] focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                v-model="formData.phone" 
                type="tel" 
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2FAC66] focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                v-model="formData.email" 
                type="email" 
                disabled
                class="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
              <p class="text-xs text-gray-500 mt-1">Contact admin to change email</p>
            </div>
            
            <div class="flex gap-2 justify-end mt-6">
              <button 
                @click="cancelEdit" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="saveChanges" 
                class="px-4 py-2 bg-[#2FAC66] text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
          
          <div v-else class="space-y-3">
            <!-- View Mode -->
            <div class="flex justify-between items-center">
              <div class="space-y-2">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="text-sm text-gray-500">First Name</div>
                    <div class="font-medium">{{ user.firstName }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Last Name</div>
                    <div class="font-medium">{{ user.lastName }}</div>
                  </div>
                </div>
                
                <div>
                  <div class="text-sm text-gray-500">Email</div>
                  <div class="font-medium">{{ user.email }}</div>
                </div>
                
                <div>
                  <div class="text-sm text-gray-500">Phone</div>
                  <div class="font-medium">{{ user.phone }}</div>
                </div>
              </div>
              
              <div v-if="isEditable">
                <button 
                  @click="startEditing" 
                  class="p-2 text-[#2FAC66] hover:bg-[#D9F9E9] rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- About Section -->
        <div class="bg-[#D9F9E9] rounded-lg p-6">
          <h3 class="text-lg font-semibold text-[#005C53] mb-4">About</h3>
          
          <div v-if="isEditingAbout" class="space-y-4">
            <!-- Edit Mode -->
            <div>
              <textarea 
                v-model="formData.about" 
                rows="6"
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2FAC66] focus:border-transparent"
                placeholder="Write something about yourself..."
              ></textarea>
            </div>
            
            <div class="flex gap-2 justify-end">
              <button 
                @click="cancelEditAbout" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="saveAbout" 
                class="px-4 py-2 bg-[#2FAC66] text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
          
          <div v-else class="relative">
            <div class="prose max-w-none">
              <p v-if="user.about">{{ user.about }}</p>
              <p v-else class="text-gray-500 italic">No information provided yet.</p>
            </div>
            
            <div v-if="isEditable" class="absolute top-0 right-0">
              <button 
                @click="startEditingAbout" 
                class="p-2 text-[#2FAC66] hover:bg-[#D9F9E9] rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Role-Specific Info Section -->
        <div v-if="hasRoleSpecificInfo" class="bg-[#D9F9E9] rounded-lg p-6 md:col-span-2">
          <h3 class="text-lg font-semibold text-[#005C53] mb-4">
            {{ getRoleSpecificTitle() }}
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-if="user.role === 'agent'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Current Commission</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.commission }}</div>
            </div>
            
            <div v-if="user.role === 'agent'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Base Salary</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.salary }}</div>
            </div>
            
            <div v-if="user.role === 'agent'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Followers</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.followers }}</div>
            </div>
            
            <div v-if="user.role === 'owner'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Managed Properties</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.properties?.length || 0 }}</div>
            </div>
            
            <div v-if="user.role === 'owner'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Linked Agents</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.agents?.length || 0 }}</div>
            </div>
            
            <div v-if="user.role === 'client'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Saved Properties</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.savedProperties?.length || 0 }}</div>
            </div>
            
            <div v-if="user.role === 'client'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Subscriptions</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.subscriptions?.length || 0 }}</div>
            </div>
            
            <div v-if="user.role === 'agency'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Managed Agents</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.managedAgents?.length || 0 }}</div>
            </div>
            
            <div v-if="user.role === 'agency'" class="bg-white p-4 rounded-lg shadow-sm">
              <div class="text-sm text-gray-500">Affiliated Owners</div>
              <div class="text-xl font-bold text-[#2FAC66]">{{ user.managedOwners?.length || 0 }}</div>
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
  
  const emit = defineEmits(['update']);
  
  const isEditing = ref(false);
  const isEditingAbout = ref(false);
  
  // Form data for editable fields
  const formData = ref({
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    email: props.user.email,
    phone: props.user.phone,
    about: props.user.about
  });
  
  // Check if we have role-specific info to display
  const hasRoleSpecificInfo = computed(() => {
    return ['owner', 'agent', 'client', 'agency'].includes(props.user.role);
  });
  
  // Start editing personal info
  function startEditing() {
    // Reset form data to current values
    formData.value = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      phone: props.user.phone,
      about: props.user.about
    };
    isEditing.value = true;
  }
  
  // Cancel editing
  function cancelEdit() {
    isEditing.value = false;
  }
  
  // Save changes
  function saveChanges() {
    // Validate input
    if (!formData.value.firstName || !formData.value.lastName) {
      alert('Name fields cannot be empty');
      return;
    }
    
    // Emit update event with new data
    emit('update', {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      phone: formData.value.phone
    });
    
    isEditing.value = false;
  }
  
  // Start editing about section
  function startEditingAbout() {
    formData.value.about = props.user.about;
    isEditingAbout.value = true;
  }
  
  // Cancel editing about
  function cancelEditAbout() {
    isEditingAbout.value = false;
  }
  
  // Save about changes
  function saveAbout() {
    emit('update', {
      about: formData.value.about
    });
    
    isEditingAbout.value = false;
  }
  
  // Get role-specific title
  function getRoleSpecificTitle() {
    switch (props.user.role) {
      case 'owner': return 'Owner Statistics';
      case 'agent': return 'Agent Information';
      case 'client': return 'Client Statistics';
      case 'agency': return 'Agency Information';
      case 'admin': return 'Admin Information';
      default: return 'Additional Information';
    }
  }
  </script>
  
  <style scoped>
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  </style>