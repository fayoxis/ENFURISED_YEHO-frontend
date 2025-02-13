<template>
  <nav class="fixed bottom-0 md:relative w-full bg-white border-t md:border-none md:bg-transparent">
    <div class="flex space-x-5 max-w-7xl mx-auto">
      <!-- Logged Out State -->
      <div v-if="!isLoggedIn" class="hidden lg:flex items-center justify-center space-x-8 py-2">
        <nav class="flex items-center space-x-6">
          <nuxt-link v-for="(link, index) in NavLinks" :key="index" :to="link.to"
            class="text-gray-600 hover:text-emerald-500 font-medium text-sm whitespace-nowrap nav-link">
            {{ link.text }}
          </nuxt-link>
        </nav>
      </div>

      <!-- Logged In State -->
      <div v-else class="flex items-center justify-between md:justify-end md:space-x-6 py-2">
        <!-- Main Navigation Items -->
        <div class="flex items-center justify-around md:justify-end w-full md:w-auto md:space-x-8">
          <!-- Navigation Items -->
          <div v-for="(item, index) in navItems" :key="index" class="nav-item group">
            <template v-if="item.type === 'link'">
              <nuxt-link :to="item.to" class="nav-link-wrapper">
                <button class="nav-icon-link" :class="{
                  'active': $route.path === item.to,
                  'current-page': $route.path === item.to
                }">
                  <div class="relative icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24" :class="{
                      'text-emerald-600': $route.path === item.to,
                      'text-gray-600': $route.path !== item.to
                    }">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
                    </svg>
                    <span v-if="item.badge" class="notification-badge">{{ item.badge }}</span>
                  </div>
                  <span class="nav-text">{{ item.text }}</span>
                  <div class="icon-tooltip">{{ item.text }}</div>
                </button>
              </nuxt-link>
            </template>

            <template v-else-if="item.type === 'dropdown'">
              <button @click.stop="toggleDropdown(item.name)" class="nav-icon-link"
                :class="{ 'active': dropdown[item.name] }">
                <div class="relative icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
                  </svg>
                  <span v-if="item.badge" class="notification-badge">{{ item.badge }}</span>
                </div>
                <span class="nav-text">{{ item.text }}</span>
                <div class="icon-tooltip">{{ item.text }}</div>
              </button>

              <!-- Dropdown Content  -->
              <transition name="dropdown">
                <div v-if="dropdown[item.name]" class="dropdown-menu">
                  <div class="dropdown-header">
                    <h3 class="font-semibold text-gray-800">{{ item.text }}</h3>
                    <nuxt-link to="/notifications" class="text-sm text-emerald-600 hover:text-emerald-700">Mark All as
                      Read</nuxt-link>
                  </div>
                  <div class="dropdown-content">
                    <template v-if="notifications.length">
                      <div v-for="(notification, nIndex) in notifications" :key="nIndex" class="notification-item">
                        <nuxt-link :to="'/notification/' + nIndex">
                          <p class="text-sm text-gray-600">{{ notification }}</p>
                          <span class="text-xs text-gray-400">{{ getTimeAgo(nIndex) }}</span>
                        </nuxt-link>
                      </div>
                    </template>
                    <div v-else class="empty-state">No Notifications</div>
                  </div>
                  <div class="text-center py-2 border-t">
                    <nuxt-link to="/notifications" class="text-sm text-emerald-600 hover:text-emerald-700">View All
                      Notifications</nuxt-link>
                  </div>
                </div>
              </transition>
            </template>
          </div>

          <!-- More Dropdown -->
          <div class="nav-item group">
            <button @click.stop="toggleDropdown('more')" class="nav-icon-link" :class="{ 'active': dropdown.more }">
              <div class="relative icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4a1 1 0 100-2 1 1 0 000 2zm0 6a1 1 0 100-2 1 1 0 000 2zm0 6a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
              </div>
              <span class="nav-text">More</span>
              <div class="icon-tooltip">More</div>
            </button>

            <!-- More Dropdown Content (remains unchanged) -->
            <transition name="dropdown">
              <div v-if="dropdown.more" class="dropdown-menu">
                <nav>
                  <nuxt-link v-for="(link, index) in NavLinks" :key="index" :to="link.to"
                    class="block px-4 py-2 text-gray-600 hover:text-emerald-600">
                    {{ link.text }}
                  </nuxt-link>
                </nav>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Auth Button -->
      <div class="hidden lg:block">
        <AuthButton />
      </div>
    </div>
  </nav>
</template>

<script>
import AuthButton from "../AuthButton.vue";

export default {
  name: "Navigation",
  components: {
    AuthButton,
  },
  props: {
    initialLoginState: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoggedIn: this.initialLoginState,
      dropdown: {
        notifications: false,
        more: false,
      },
      notifications: [
        "New order received #1234",
        "Your account was verified",
        "Welcome to our platform!",
        "New features available",
      ],
      navItems: [
        {
          type: "link",
          to: "/home",
          text: "Accueil",
          icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
          type: "link",
          to: "/feeds",
          text: "Actualités",
          icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H18",
        },
        {
          type: "dropdown",
          name: "notifications",
          text: "Notifications",
          icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
          badge: 3,
        },
        {
          type: "link",
          to: "/chat",
          text: "Messages",
          icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
          badge: 2,
        },
      ],
      NavLinks: [
        { to: "/immobilier", text: "Immobilier" },
        { to: "/carrieres", text: "carrieres" },
        { to: "/a propos", text: "A propos" },
      ],
    };
  },
  methods: {
    toggleDropdown(name) {
      this.dropdown[name] = !this.dropdown[name];
    },
    getTimeAgo(index) {
      // Dummy data for time difference
      return `${index + 1} minutes ago`;
    },
  },
};
</script>

<style scoped>
.nav-item {
  @apply relative flex flex-col items-center;
}

.nav-link-wrapper {
  @apply flex flex-col  lg:px-0 items-center relative ;
}

.nav-icon-link {
  @apply relative flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-emerald-600 transition-all duration-200;
}

.nav-icon {
  @apply w-6 h-6 lg:w-5 lg:h-5 stroke-current;
  fill: none;
  transition: transform 0.3s ease;
}

.nav-icon-link:hover .nav-icon {
  transform: scale(1.15) rotate(5deg);
}

.nav-text {
  @apply text-xs mt-1 md:hidden;
}

/* Icon Tooltip Styling */
.icon-tooltip {
  @apply absolute top-full mb-2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap transform -translate-y-2 group-hover:translate-y-0 pointer-events-none;
  z-index: 50;
}

/* Tooltip Arrow Styling */
.nav-icon-link::before {
  content: '';
  position: absolute;
  top: calc(100% - 5px);
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(0, 0, 0, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
}

@media (min-width: 768px) {
  .nav-icon-link:hover::before {
    opacity: 1;
    visibility: visible;
  }
}

.icon-container {
  @apply flex items-center space-x-10 justify-center relative;
}

/* Current Page Highlight */
.current-page .nav-icon,
.nav-icon-link.active .nav-icon {
  @apply text-emerald-600;
}

.notification-badge {
  @apply absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

.dropdown-menu {
  @apply fixed md:absolute left-4 right-4 md:left-auto md:right-0 bottom-20 md:bottom-auto md:top-full mt-2 md:w-80 bg-white rounded-xl shadow-lg border border-gray-100;
  z-index: 50;
}

.dropdown-header {
  @apply flex items-center justify-between px-4 py-3 border-b border-gray-100;
}

.dropdown-content {
  @apply max-h-[60vh] md:max-h-96 overflow-y-auto;
}

.notification-item {
  @apply px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer;
  transition: background-color 0.2s ease;
}

.empty-state {
  @apply p-4 text-center text-gray-500 text-sm;
}

.active {
  @apply bg-emerald-50 text-emerald-600;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>