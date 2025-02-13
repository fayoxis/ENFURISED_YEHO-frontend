// tailwind.config.js
const colors = {
  // Primary Green Palette
  'teal-dark': '#005c53',       // Dark Main Color
  'teal-medium': '#446655',     // Dark Accent
  'android-green': '#2fac66',   // Accent Green
  'jade-green': '#9dc12e',      // Light Accent Green
  
  // Neutral Colors
  'smoke-white': '#F3f3f3',     // Light Background
  'pale-green': '#dbede4',      // Soft Background
  'davy-grey': '#446655',       // Grey Accent
  
  // Accent Colors
  'flame-orange': '#e84615',    // Vibrant Accent
  
  // Blacks and Whites
  'night-black': '#0a0a0a',     // Deep Black
  'white': '#ffffff',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'night-black': '#121212',
        'dark-background': '#181818',
        'dark-text': '#EAEAEA',
        primary: '#4338CA',
        secondary: '#6D28D9',
        accent: '#F59E0B',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
      },
      fontFamily: {
        sans: [
          'Montserrat',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
    },
  },
  plugins: [],
};
