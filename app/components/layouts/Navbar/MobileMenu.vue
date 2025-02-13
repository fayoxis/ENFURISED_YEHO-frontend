<template>
    
      <!-- Profile Header -->
      <a href="/profile">
        <div class="flex items-center px-4 mb-4">
          <div 
            class="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center text-green-600 font-bold"
          >
            {{ userInitials }}
          </div>
          <div>
            <h3 class="text-lg font-semibold">{{ userName }}</h3>
            <a href="/profile/userId?/parametre">
            <p class="text-sm text-gray-500">Paramètres</p>
            </a>
          </div>
        </div>
      </a>

        <!-- Main Menu Items -->
        <div  class="flex flex-col space-y-2 mb-4">
          <router-link to="/profile/properties" class="flex items-center justify-start w-full">
            <button class="flex items-center justify-start w-full px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-300">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
                Propriétés
              </svg>
              Propriétés
            </button>
          </router-link>

          <router-link to="/profile/folders" class="flex items-center justify-start w-full">
            <button class="flex items-center justify-start w-full px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-300">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
                Dossiers
              </svg>
              Dossiers
            </button>
          </router-link>

          <router-link to="/profile/transactions" class="flex items-center justify-start w-full">
            <button class="flex items-center justify-start w-full px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-300">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
                Transactions
              </svg>
              Transactions
            </button>
          </router-link>
        </div>

        <!-- Bottom Section -->
        <div class="bg-emerald-800 rounded-lg w-full">
          <router-link to="/profile/my-properties" class="flex w-full">
            <button class="flex w-full items-center justify-start px-4 py-2 text-white hover:bg-green-600 transition-colors duration-300 rounded-t-lg">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
                Mes Propriétés
              </svg>
              Mes Propriétés
            </button>
          </router-link>
          <router-link to="/profile/my-contracts" class="flex w-full">
            <button class="flex w-full items-center justify-start px-4 py-2 text-white hover:bg-green-600 transition-colors duration-300 rounded-b-lg">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
                Mes Contrats
              </svg>
              Mes Contrats
            </button>
          </router-link>

          <button
            @click="logout"
            class="flex w-full items-center justify-start px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white border-t border-emerald-700 rounded-lg"
          >
            <svg
              class="w-6 h-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
              Se Déconnecter
            </svg>
            Se Déconnecter
          </button>
        </div>
</template>

<script>
export default {
data() {
    return {
      showMenu: false,
      isLoggedIn: false,
      userName: 'Abaze Clovis',
    };
  },
  computed: {
    userInitials() {
      const names = this.userName.split(' ');
      return names.map(name => name.charAt(0).toUpperCase()).slice(0, 2).join('');
    }
  },
  methods: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      this.showMenu = false;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>