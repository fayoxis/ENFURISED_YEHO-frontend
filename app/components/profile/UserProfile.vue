<template>
  <div class="flex flex-col bg-white p-2 space-y-3">
    <!-- <div class="">
      <MyPropertiesFilter />
    </div> -->

    <div class="shadow-lg rounded-3xl lg:p-4">
      <!-- Profile Header -->
      <NuxtLink :to="`/profile/${userId}`" class="block">
        <div class="flex items-center space-x-4 mb-7">
          <div class="w-14 h-14 bg-[#D9F9E9] rounded-full flex items-center justify-center">
            <span class="text-[#005C53] font-semibold">{{ userInitials }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-gray-900">{{ userName }}</span>
            <NuxtLink :to="`/profile/${userId}/parametre`"
              class="text-sm text-[#005C53] bg-[#D9F9E9] rounded-lg px-1 hover:text-[#005C53]/80">
              Paramètres
            </NuxtLink>
          </div>
        </div>
      </NuxtLink>

      <!-- Main Navigation -->
      <nav class="flex flex-col space-y-2">
        <NuxtLink v-for="item in mainMenuItems" :key="item.path" :to="item.path"
          class="flex items-center space-x-3 w-full px-4 py-2 text-[#005C53] hover:bg-green-50 rounded-lg transition-colors">
          <component :is="item.icon" class="w-5 h-5" stroke="currentColor" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Bottom Section -->
    <div class="shadow-lg rounded-3xl p-4 bg-[#005C53]">

      <div class="mt-auto">
        <div class="bg-[#005C53] rounded-lg overflow-hidden">
          <NuxtLink v-for="item in bottomMenuItems" :key="item.path" :to="item.path"
            class="flex items-center space-x-3 w-full px-4 py-2 text-[#A2C02D] hover:bg-emerald-700 transition-colors"
            :class="{ 'border-t border-[#005C53]': item.hasBorder }">
            <component :is="item.icon" class="w-5 h-5" stroke="currentColor" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </div>
      </div>

    </div>

    <button @click="handleLogout"
      class="flex items-center space-x-3 w-full px-4 py-2 mt-2 bg-red-600 text-white hover:bg-red-700 rounded-xl transition-colors">
      <LogOutIcon class="w-5 h-5" stroke="currentColor" aria-hidden="true" />
      <span>Se Déconnecter</span>
    </button>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Building as BuildingIcon,
  Folder as FolderIcon,
  Wallet as WalletIcon,
  LogOut as LogOutIcon,
  NewspaperIcon
} from 'lucide-vue-next';
import MyPropertiesFilter from './my-properties/MyPropertiesFilter.vue';

const router = useRouter();
const userId = ref('123');
const userName = ref('Abaze Clovis');
const userInitials = ref('AC');

const mainMenuItems = [
  {
    path: 'properties',
    label: 'Propriétés',
    icon: BuildingIcon
  },
  {
    path: 'folders',
    label: 'Dossiers',
    icon: FolderIcon
  },
  {
    path: 'transactions',
    label: 'Transactions',
    icon: WalletIcon
  },
  {
    path: 'annonces',
    label: 'annonces',
    icon: NewspaperIcon,
    hasBorder: true
  }
];

const bottomMenuItems = [
  {
    path: 'my-properties',
    label: 'Mes Propriétés',
    icon: BuildingIcon,
    hasBorder: false
  },
  {
    path: 'my-contracts',
    label: 'Mes Contrats',
    icon: FolderIcon,
    hasBorder: true
  }
];


const handleLogout = async () => {
  try {
    router.push('auth/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>