<template>
    <div class="container bg-white flex-wrap">
      <UserProfile />
      <Messages />
    </div>
  </template>
  
  <script>
  import UserProfile from '~/components/profile/UserProfile.vue'
  import Messages from '~/components/profile/ProfileMessages.vue'
  
  export default {
    components: {
      UserProfile,
      Messages,
    },
  }
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>