<template>
  <div class="w-full space-y-5 mx-auto p-4">
    <h1 class="text-black w-full font-bold text-3xl ">Ajouter et publier une annonce</h1>


    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Header -->
      <h2 class="text-black font-bold text-lg mb-4">Détails supplémentaires</h2>
      <div class="flex flex-col lg:w-5/6 space-y-2 ">
        <!-- Title Input -->
        <div class="lg:space-x-5 flex flex-col lg:flex-row  text-black font-semibold w-full">
          <div class="h-full w-full space-y-5">
          <div>
            <p>Titre de l'annonce</p>
            <input type="text" placeholder="" class="w-full p-3 rounded-lg shadow-lg" />
          </div>
          <div>
            <p>Public de l’annonce</p>
            <input type="text" placeholder="" class="w-full p-3 rounded-lg shadow-lg" />
          </div>
        </div>

          <div class="h-full w-full">
            <p>Détails de l’annonce</p>

            <textarea placeholder="" rows="4" class="w-full overflow-y-auto resize-none h-2/3 lg:h-full p-5 rounded-lg shadow-lg"></textarea>
          </div>

        </div>

        <div class="items-center w-full justify-start lg:flex lg:flex-row  flex-col lg:space-x-5 h-full lg:space-y-0 space-y-4 text-black font-semibold">
          <!-- Details Input -->
          <div class="w-full">
            <p>Options de publication</p>
            <input type="text" placeholder="" class="w-full p-3 rounded-lg shadow-lg" />
          </div>

          <!-- Location Input -->
          <div class="w-full">
            <p>Liens de suivi de l’annonce</p>
            <input type="text" placeholder="" class="w-full p-3 rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      <!-- Image Upload Section -->
      <div class="mt-6 w-full lg:w-6/7">
        <p class="text-sm text-gray-600 mb-2">
          Ajoutez des photos de l'annonce (Cliquez sur une cadre pour ajouter)
        </p>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="n in 6" :key="n"
            class="aspect-square border-2 border-dashed border-gray-300 rounded-3xl flex items-center justify-center cursor-pointer"
            @click="triggerFileInput(n)">
            <svg class="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              <path d="M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <input type="file" :id="'file-' + n" class="hidden" accept="image/*"
              @change="handleFileUpload($event, n)" />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex h-full mt-6 lg: w-full lg:w-2/3">
        <button type="submit"
          class="w-full h-full py-10 bg-[#98C03D] text-white rounded-xl hover:bg-[#89af37] transition-colors ">
          PUBLIER L'ANNONCE
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'profile-layout'
});

const triggerFileInput = (index) => {
  document.getElementById(`file-' + index`).click();
};

const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    // Handle file upload logic here
    console.log(`File ${index} uploaded:`, file);
  }
};

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted');
};
</script>