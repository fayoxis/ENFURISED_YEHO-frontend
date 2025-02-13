<template>
  <button 
    @click="toggleDarkMode" 
    class="p-2 bg-android-green text-white rounded"
  >
    {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
  </button>
</template>

<script setup>
const colorMode = useColorMode()
const isDarkMode = computed(() => colorMode.preference === 'dark')

const toggleDarkMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>