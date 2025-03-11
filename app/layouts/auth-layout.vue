<script setup >
import AuthFooter from '~/components/auth/AuthFooter.vue';
import AuthHeader from '~/components/auth/AuthHeader.vue';
</script>

<template>
  <div class=" flex overflow-x-hidden overflow-y-auto flex-col h-full w-full max-h-screen ">
    <div class=" h-1/3">
      <AuthHeader />
    </div>
    <main class="flex-grow flex-wrap w-full h-2/3 ">
      <NuxtPage />
    </main>
    <div class="h-1/5 py-2">
    <AuthFooter />
  </div>
  </div>
</template>