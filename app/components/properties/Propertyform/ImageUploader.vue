<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="n in 12"
      :key="n"
      class="relative aspect-square cursor-pointer group"
      @click="triggerFileInput"
    >
      <div
        class="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center transition-colors group-hover:border-[#9ab94e]"
      >
        <input
          type="file"
          class="hidden"
          accept="image/*"
          @change="handleFileUpload"
        />
        <svg
          class="w-8 h-8 text-gray-400 group-hover:text-[#9ab94e]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['upload'],
  methods: {
    triggerFileInput(event) {
      const input = event.currentTarget.querySelector('input[type="file"]');
      input?.click();
    },
    handleFileUpload(event) {
      const file = event.target.files?.[0];
      if (file) {
        this.$emit('upload', file);
      }
    }
  }
}
</script>