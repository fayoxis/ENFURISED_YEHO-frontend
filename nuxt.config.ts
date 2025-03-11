// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Define compatibility date and version
  compatibilityDate: "2024-11-29",

  css: ['@fortawesome/fontawesome-free/css/all.css','~/assets/css/tailwind.css'],

  future: {
    compatibilityVersion: 4, // Ensures compatibility with Nuxt 4 features
  },
  plugins: [
    // {src: '~/plugins/lucide.js'},
    { src: '~/plugins/v-calendar.ts', mode: 'client' },
    //{ src: "~/plugins/localStorage.client.js", mode: "client" }
  ],

  // Experimental features (only enable necessary ones)
  experimental: {
    scanPageMeta: true, // Simplified option for improved performance
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false, // Set to true if conflicts occur
    defaults: {
      useAsyncData: {
        deep: true, // Keep consistent data fetching
      },
    },
  },

  // Custom settings for the head management library
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false, // Disable if you notice unnecessary whitespace in SSR output
    },
  },
  lucide: {
    namePrefix: 'Icon'
  },

  // Enable Nuxt devtools
  devtools: { enabled: true },

  // Nuxt modules
  modules: [// Tailwind CSS module
  // Google Fonts module
  // Nuxt Icon for SVGs
  "@nuxtjs/tailwindcss", // Nuxt UI module
  "@nuxtjs/google-fonts", // "@nuxt/ui", // Nuxt Color Mode for dark/light mode toggles
  "@nuxt/icon", "@nuxtjs/color-mode", "nuxt-icon-tw", "@nuxt/image", "nuxt-lucide-icons"],

  // Google Fonts configuration
  googleFonts: {
    families: {
      Montserrat: true, // Load Montserrat font
    },
  },

  components: [
    {
      path: '~/components/profile',
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ['stores']
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  }

 
});