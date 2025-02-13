<template>

    <div>
        profile
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'profile-layout' 
});
middleware: "auth"
// async asyncData({ store, params }) {
//     const user = await store.dispatch("user/fetchUserById", params.userId);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     return {};
//   },

</script>

<style