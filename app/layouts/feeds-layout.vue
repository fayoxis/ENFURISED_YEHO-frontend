
<template>
  <div class="flex overflow-hidden  flex-col min-h-screen">
  
        <AppHeader /> 

  
      <main class="max-w-7xl w-screen  flex-grow flex-wrap ">
        <NuxtPage />

      </main>
    </div>

  </template>

<script setup>
import AppHeader from '~/components/layouts/AppHeader.vue';
</script>
  
  <style scoped>

  </style>