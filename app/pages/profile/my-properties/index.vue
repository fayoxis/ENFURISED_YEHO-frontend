<template>
  <div class="h-full px-2">
      <MyPropertiesList/>
  </div>
</template>

<script setup>
import MyPropertiesList from '~/components/profile/my-properties/MyPropertiesList.vue'
definePageMeta({
layout: 'profile-layout' 
})
</script>
