<template>
  <div class="w-full p-3">
    <!-- Property Header -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-5xl font-black uppercase">Appartement Moderne</h1>
        <div class="flex items-center text-sm text-gray-600">
          <span class="mr-1"><img src="/icons/location-icon.svg" /></span>
          <span>Messassi/Mendong, Odza, Yaoundé</span>
        </div>
      </div>
      <div>
        <p class="text-[#D9F9E9]"></p>
        <button class="bg-teal-700 text-white px-4 py-2 rounded-md text-sm">
          Planifier une visite
        </button>
      </div>
    </div>

    <!-- Property Gallery Grid -->
    <div class="grid lg:grid-cols-3 grid-rows-4 gap-4 h-[400px] mb-5">
      <!-- Main Large Image -->
      <div class="lg:col-span-2 row-span-3 ">
        <div class="w-full h-[500px] bg-mint-100 relative">
          <img src="" alt="Main Property View" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Thumbnail Grid -->
      <div class="grid grid-cols-2 gap-3 h-[500px] overflow-x-auto lg:overflow-y-auto w-full">
        <div v-for="n in 9" :key="n" class="bg-mint-100">
          <div class="w-full h-[180px]">
            <img src="" alt="Property View" class="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// You can add your component logic here
</script>

<style scoped>
.bg-mint-100 {
  background-color: #D9F9E9;
}
</style>