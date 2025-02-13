<template>
    <div>
        <DossierList/>
    </div>
</template>

<script setup>
import DossierList from '~/components/profile/dossiers/DossierList.vue'
definePageMeta({
  layout: 'profile-layout' 
});
</script>