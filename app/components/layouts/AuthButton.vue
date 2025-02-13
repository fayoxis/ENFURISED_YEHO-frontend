<template>
  <div class="w-full flex-wrap  items-center justify-center">
    <!-- Logged Out State -->
    <button
      v-if="!isLoggedIn"
      @click="login"
      class="bg-[#F24405] z-10 relative w-full  hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg items-center flex text-sm font-medium transition-colors duration-200"
    >
      Se Connecter
    </button>

    <!-- Logged In State -->
    <div v-else class="relative">
      <button
        class="relative z-10 px-4 py-1 text-xs text-end bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center"
        @click="toggleMenu"
      >
        <div 
          class="w-8 h-8 rounded-full mr-2 flex items-center justify-center text-green-600 bg-white font-bold"
        >
          {{ userInitials }}
        </div>
        Mon Compte
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="showMenu"
        class="absolute top-12 right-0 bg-white rounded-lg shadow-lg  w-64 menu-transition"
        :class="{ 'menu-open': showMenu }"
      >
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
        <div class="flex flex-col space-y-2 mb-4">
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
        <div class="bg-emerald-800 w-full">
          <router-link to="/profile/my-properties" class="flex w-full">
            <button class="flex w-full items-center justify-start px-4 py-2 text-white hover:bg-green-600 transition-colors duration-300 ">
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
            <button class="flex w-full items-center justify-start px-4 py-2 text-white hover:bg-green-600 transition-colors duration-300">
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
            class="flex w-full items-center justify-start px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white border-t border-emerald-700"
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
      </div>
    </div>
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

<style scoped>
button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.menu-transition {
  transform-origin: right top;
  transition: all 0.3s ease-out;
  transform: scaleX(0);
  opacity: 0;
}

.menu-open {
  transform: scaleX(1);
  opacity: 1;
}

@media (max-width: 768px) {
  button {
    width: 100%;
    font-size: 14px;
  }
  
  .menu-transition {
    right: 0;
    left: auto;
    transform-origin: right top;
  }
}
</style>