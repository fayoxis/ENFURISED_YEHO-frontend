<template>
  <div class="space-y-5 overflow-x-hidden w-full bg-white">
    <AppHeader />
    <div class="">
      <div class="flex">
        <!-- Sidebar Navigation -->
        <aside class="lg:block lg:w-1/4 w-1/3 hidden bg-white sticky top-0">
          <ProfileSideBar />
        </aside>
        <!-- Main Content Area -->
        <main class="w-full">
          <div class="rounded-lg shadow bg-white">
            <NuxtPage />
          </div>
        </main>
      </div>
      
      <!-- Add this temporarily to debug -->
      <div class="text-sm text-gray-500">
        Current route: {{ route.name }}
        Should show bottom: {{ shouldShowSidebarBottom }}
      </div>

      <!-- Dynamic Sidebar Bottom Content -->
      <div class="w-full mt-6" v-if="shouldShowSidebarBottom">
        <component :is="sidebarBottomComponent" v-if="sidebarBottomComponent" />
      </div>
    </div>
    <footer class="w-full bg-white shadow-md mt-6">
      <AppFooter />
    </footer>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from '~/components/layouts/AppFooter.vue';
import ProfileSideBar from '~/components/profile/ProfileSideBar.vue';
import AppHeader from '~/components/layouts/AppHeader.vue';

// Import the components directly
import PropertiesSidebarBottom from '~/components/profile/properties/PropertiesSidebarBottom.vue';
import CompletedFilesTable from '~/components/profile/dossiers/CompletedFilesTable.vue';
import Agentbottom from '~/components/profile/properties/Agentbottom.vue';
const route = useRoute();

// Map routes to actual component references (not strings)
const sidebarBottomComponents = {
  'profile-properties': Agentbottom,
  //PropertiesSidebarBottom,
  'profile-folders': CompletedFilesTable,
};


const shouldShowSidebarBottom = computed(() => {
  console.log('Current route:', route.name);
  console.log('Has component:', sidebarBottomComponents.hasOwnProperty(route.name));
  return sidebarBottomComponents.hasOwnProperty(route.name);
});

const sidebarBottomComponent = computed(() => {
  return sidebarBottomComponents[route.name] || null;
});

const currentPageTitle = computed(() => {
  return pageTitles[route.name] || 'Dashboard';
});

const pageTitles = {
  'properties': 'Propriétés',  
  folders: 'Dossiers',
  transactions: 'Transactions',
  'my-properties': 'Mes Propriétés',
  'my-contracts': 'Mes Contrats',
  chats: 'chats',
  'personal-info-form': 'personal-info-form'
};
</script>