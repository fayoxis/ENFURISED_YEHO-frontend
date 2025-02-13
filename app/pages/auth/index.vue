<template>
    <div class="h-full flex flex-col">
        <AuthOptions/>
    </div>
</template>

<script setup>
import AuthOptions from '~/components/auth/AuthOptions.vue';

definePageMeta({
  layout: 'auth-layout'  
});
</script>