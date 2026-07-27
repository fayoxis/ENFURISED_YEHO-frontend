<template>
  <div class="w-screen">
    <CategoryBar 
      :selectedType="selectedPropertyType" 
      @update:selectedType="updateSelectedType"
    />
    <FeedStructure 
      :selectedCategory="selectedPropertyType"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CategoryBar from '~/components/feeds/CategoryBar.vue';
import FeedStructure from '~/components/feeds/FeedStructure.vue';

definePageMeta({
  layout: 'feeds-layout'  
});

const selectedPropertyType = ref('house');

const updateSelectedType = (newType) => {
  selectedPropertyType.value = newType;
};
</script>
