<template>
  <div class="h-full px-2">
      <Transactions/>
  </div>
</template>

<script setup>
import Transactions from '~/components/profile/transaction/Transactions.vue'
definePageMeta({
layout: 'profile-layout' 
})
</script>
