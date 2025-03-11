<template>
    <div class="space-y-6 animate-fadeIn">
      <div v-for="review in reviews" :key="review.id"
           class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:border-[#D9F9E9] hover:shadow-md">
        <div class="flex flex-col sm:flex-row sm:items-start gap-4">
          <img :src="review.userImage" class="w-12 h-12 rounded-full border-2 border-[#D9F9E9]" />
          <div class="flex-1">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 class="font-semibold text-[#005C53]">{{ review.userName }}</h3>
              <div class="flex items-center mt-2 sm:mt-0">
                <div class="flex items-center">
                  <template v-for="star in 5" :key="star">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      class="h-5 w-5" 
                      :class="star <= review.rating ? 'text-yellow-500' : 'text-gray-300'"
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </template>
                  <span class="ml-1 text-sm text-gray-600">{{ review.rating }}/5</span>
                </div>
              </div>
            </div>
            <p class="mt-2 text-gray-600 leading-relaxed">{{ review.comment }}</p>
            <p class="mt-2 text-sm text-gray-500">{{ review.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    reviews: {
      type: Array,
      required: true
    }
  })
  </script>
  