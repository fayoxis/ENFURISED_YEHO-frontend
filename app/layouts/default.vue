<template>
 
  <div class="flex overflow-x-hidden flex-col space-y-5 w-full min-h-screen">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-grow flex-wrap w-full ">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '~/components/layouts/AppFooter.vue';
import AppHeader from '~/components/layouts/AppHeader.vue';
</script>

<style scoped>
/* Layout-specific styles
main {
  padding: 1rem; /* Add some spacing around the content 
} */

</style>
