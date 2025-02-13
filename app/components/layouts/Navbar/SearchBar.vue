<template>
  <div class="flex relative w-full justify-end">
    <!-- Desktop Search Bar -->
    <div v-if="!isMobile" class="relative w-full max-w-[450px]">
      <div class="relative  flex items-center">
        <input v-model="searchQuery" @focus="openSearch" @input="performSearch" type="text"
          class="w-full h-[46px] border shadow-lg border-[#E5E7EB] rounded-xl pl-12 pr-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#34D399] focus:border-transparent placeholder-[#9CA3AF]"
          placeholder="Que recherchez-vous ?" />
        <div v-if="!isSearchOpen" class="absolute right-4 top-1/2 transform -translate-y-1/2">
          <a href="search">

            <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1395_3834)">
                <path
                  d="M25.027 16.6638L19.4357 13.2169C19.7826 12.2038 19.9705 11.1162 19.9705 9.98477C19.9705 4.47093 15.4996 0 9.98477 0C4.46993 0 0 4.47093 0 9.98477C0 15.4986 4.47093 19.9705 9.98477 19.9705C13.1205 19.9705 15.9182 18.525 17.7485 16.2642L23.2007 19.6256C23.485 19.8005 23.8002 19.885 24.1124 19.885C24.696 19.885 25.2657 19.5908 25.5947 19.0579C26.0988 18.2396 25.8443 17.1679 25.027 16.6638ZM17.5546 12.5727C17.2504 13.4605 16.796 14.2817 16.2035 15.0125C14.6754 16.8994 12.4096 17.9811 9.98477 17.9811C5.57549 17.9811 1.9884 14.3931 1.9884 9.98378C1.9884 5.57449 5.57549 1.9884 9.98477 1.9884C14.3941 1.9884 17.9821 5.57549 17.9821 9.98477C17.9821 10.8736 17.838 11.7445 17.5546 12.5727Z"
                  fill="#8DAD9D" />
                <path
                  d="M11.0593 9.53129C12.42 9.53129 13.523 8.42828 13.523 7.06765C13.523 5.70702 12.42 4.60402 11.0593 4.60402C9.69871 4.60402 8.5957 5.70702 8.5957 7.06765C8.5957 8.42828 9.69871 9.53129 11.0593 9.53129Z"
                  fill="#8DAD9D" />
              </g>
              <defs>
                <clipPath id="clip0_1395_3834">
                  <rect width="25.8532" height="19.9705" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
        <button v-else
          class="absolute right-4 top-1/2 transform -translate-y-1/2 ml-4 text-gray-600 hover:text-gray-800"
          @click="closeSearch">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div v-if="isSearchOpen"
        class="absolute top-full left-0 w-full bg-white shadow-lg mt-2 z-50 rounded-lg p-4 border border-[#E5E7EB]">
        <div v-if="loading" class="text-center text-gray-500 py-4">
          <span class="loader"></span>
          <span class="ml-2">Recherche en cours...</span>
        </div>
        <div v-else-if="results.length > 0">
          <div v-for="result in results" :key="result.id"
            class="py-3 hover:bg-gray-50 rounded-md px-2 transition-colors">
            <a :href="result.url" class="text-gray-700 hover:text-[#34D399]">
              {{ result.title }}
            </a>
          </div>
        </div>
        <div v-else class="text-gray-500">
          <p class="mb-3">Aucun résultat.<br> Essayez les liens rapides :</p>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.title" class="hover:bg-gray-50 rounded-md transition-colors">
              <a :href="link.url" class="block px-2 py-2 text-gray-700 hover:text-[#34D399]">
                {{ link.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Mobile Search Icon -->
    <div v-else class=" flex  items-center w-full justify-end h-10 rounded-full  transition-colors" aria-label="Search">
      <a href="/search">
        <button @click="openSearch" class="h-10 w-10 rounded-full bg-white shadow-xl justify-center items-center flex">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1395_3834)">
              <path
                d="M25.027 16.6638L19.4357 13.2169C19.7826 12.2038 19.9705 11.1162 19.9705 9.98477C19.9705 4.47093 15.4996 0 9.98477 0C4.46993 0 0 4.47093 0 9.98477C0 15.4986 4.47093 19.9705 9.98477 19.9705C13.1205 19.9705 15.9182 18.525 17.7485 16.2642L23.2007 19.6256C23.485 19.8005 23.8002 19.885 24.1124 19.885C24.696 19.885 25.2657 19.5908 25.5947 19.0579C26.0988 18.2396 25.8443 17.1679 25.027 16.6638ZM17.5546 12.5727C17.2504 13.4605 16.796 14.2817 16.2035 15.0125C14.6754 16.8994 12.4096 17.9811 9.98477 17.9811C5.57549 17.9811 1.9884 14.3931 1.9884 9.98378C1.9884 5.57449 5.57549 1.9884 9.98477 1.9884C14.3941 1.9884 17.9821 5.57549 17.9821 9.98477C17.9821 10.8736 17.838 11.7445 17.5546 12.5727Z"
                fill="#8DAD9D" />
              <path
                d="M11.0593 9.53129C12.42 9.53129 13.523 8.42828 13.523 7.06765C13.523 5.70702 12.42 4.60402 11.0593 4.60402C9.69871 4.60402 8.5957 5.70702 8.5957 7.06765C8.5957 8.42828 9.69871 9.53129 11.0593 9.53129Z"
                fill="#8DAD9D" />
            </g>
            <defs>
              <clipPath id="clip0_1395_3834">
                <rect width="25.8532" height="19.9705" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </a>

    </div>

    <!-- Mobile Search Modal -->
    <div v-if="isSearchOpen && isMobile" class="fixed inset-0 h-1/3 bg-white z-50 flex flex-col p-4">

      <div class="flex items-center justify-between mb-4">
        <div class="relative flex-1 max-w-[556px]">
          <input v-model="searchQuery" @input="performSearch" type="text"
            class="w-full h-[46px] border border-[#E5E7EB] rounded-[10px] pl-12 pr-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#34D399] focus:border-transparent placeholder-[#9CA3AF]"
            placeholder="Tapez pour rechercher..." />
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
                stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <button class="ml-4 text-gray-600 hover:text-gray-800" @click="closeSearch">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-4 flex-1 overflow-y-auto">
        <div v-if="loading" class="text-center text-gray-500">
          <span class="loader"></span> Recherche en cours...
        </div>
        <div v-else-if="results.length > 0" class="space-y-4">
          <a v-for="result in results" :key="result.id" :href="result.url"
            class="block p-3 hover:bg-gray-50 rounded-md text-gray-700 hover:text-[#34D399] transition-colors">
            {{ result.title }}
          </a>
        </div>
        <div v-else class="text-gray-500 text-center py-4">
          Aucun résultat trouvé.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "SearchBar",
  setup() {
    const isSearchOpen = ref(false);
    const searchQuery = ref("");
    const loading = ref(false);
    const results = ref([]);
    const isMobile = ref(false);

    const quickLinks = [
      { title: "Immobilier", url: "/immobilier" },
      { title: "Carrières", url: "/carrieres" },
      { title: "À propos", url: "/a-propos" },
    ];

    const openSearch = () => {
      isSearchOpen.value = true;
    };

    const closeSearch = () => {
      isSearchOpen.value = false;
      searchQuery.value = "";
    };

    const performSearch = () => {
      loading.value = true;
      setTimeout(() => {
        results.value = searchQuery.value
          ? [
            { id: 1, title: "Result 1", url: "/result-1" },
            { id: 2, title: "Result 2", url: "/result-2" },
          ]
          : [];
        loading.value = false;
      }, 500);
    };

    const handleResize = () => {
      if (typeof window !== "undefined") {
        isMobile.value = window.innerWidth <= 768;
      }
    };

    onMounted(() => {
      handleResize();
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);
      }
    });

    return {
      isSearchOpen,
      searchQuery,
      loading,
      results,
      quickLinks,
      isMobile,
      openSearch,
      closeSearch,
      performSearch,
    };
  },
};
</script>

<style scoped>
.loader {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  border: 2px solid #E5E7EB;
  border-radius: 50%;
  border-top-color: #34D399;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>