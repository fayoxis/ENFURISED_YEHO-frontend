<template>
    <div class="h-full px-2 space-y-10">
      <UserProperties/>
    </div>
</template>

<script setup>
import UserProperties from '~/components/profile/properties/UserProperties.vue';


definePageMeta({
  layout: 'profile-layout' ,

})
</script>
