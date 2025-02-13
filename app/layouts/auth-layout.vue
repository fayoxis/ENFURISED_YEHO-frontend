<script setup ">
import AuthFooter from '~/components/auth/AuthFooter.vue';
import AuthHeader from '~/components/auth/AuthHeader.vue';
</script>

<template>
  <div class=" flex overflow-x-hidden overflow-y-auto flex-col space-y-5 h-full w-full min-h-screen ">
    <div class=" h-1/4">
      <AuthHeader />
    </div>
    <main class="flex-grow flex-wrap w-full h-2/3 ">
      <NuxtPage />
    </main>
    <AuthFooter />

  </div>
</template>