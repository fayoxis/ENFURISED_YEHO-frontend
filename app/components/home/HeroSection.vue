<template>
  <section class="w-full relative bg-gray-50">
    <!-- Image Carousel -->
    <div class="absolute w-full inset-0">
      <div class="w-fit h-full overflow-hidden" ref="carousel">
        <div class="carousel flex h-full" :style="{ transform: `translateX(-${currentImage * 100}%)` }">
          <img v-for="(image, index) in images" :key="index" :src="image" alt="Hero Background"
            class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-40"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center text-white">
      <h1
        class="text-4xl md:text-5xl font-extrabold leading-tight mb-4 animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-green-500 inline-block"
        :style="{ animationDuration: `${headlineText.length / 10}s` }">
        <span v-for="(letter, index) in headlineText" :key="index">
          {{ letter }}
        </span>
      </h1>
      <p class="text-lg md:text-xl font-light mb-8 animate-fade-in-up">
        Des propriétés à acheter et à louer sur tout le territoire camerounais.
      </p>

  <div>
    <SearchBar
      v-model:searchState="searchState"
      @search="handleSearch"
    />
    <Trending
      :searchState="searchState"
      @category-selected="handleCategorySelect"
    />
  </div>

    </div>
  </section>
</template>

<script>
import Trending from './hero/Trending.vue';
import SearchBar from './hero/SearchBar.vue';
export default {
  name: "HeroSection",
  components: {
    Trending,
    SearchBar, // Register the SearchBar component
  },
  data() {
    return {
      currentImage: 0,
      images: [
        "/images/home/hero/hero1.jpg",
        "/images/home/hero/hero2.jpg",
        "/images/home/hero/hero3.jpg",
        "/images/home/hero/hero4.jpg",
      ],
      headlineText: "Trouvons le Parfait Espace pour vos projets".split(""),
    };
  },
  mounted() {
    // Start carousel autoplay
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }, 5000);
  },
};

import { ref } from 'vue';

const searchState = ref({
  query: '',
  category: '',
  location: null,
  dateRange: { start: null, end: null }
});

const handleSearch = (searchData) => {
  console.log('Search submitted:', searchData);
  // Implement search logic
};

const handleCategorySelect = (category) => {
  console.log('Category selected:', category);
  // Update search state or navigate
  searchState.value.category = category.types[0];
};
</script>
<style scoped>

/* Animations */

@keyframes fadeInUp {

from {

opacity: 0;

transform: translateY(20px);

}

to {

opacity: 1;

transform: translateY(0);

}

}

@keyframes scaleUp {

from {

opacity: 0;

transform: scale(0.8);

}

to {

opacity: 1;

transform: scale(1);

}

}

@keyframes typewriter {

from {

width: 0;

}

to {

width: 100%;

}

}

/* Applying Animations */

.animate-fade-in-up {

animation: fadeInUp 1s ease-out;

}

.animate-scale-up {

animation: scaleUp 1s ease-out;

}

.animate-typewriter {

animation: typewriter 4s steps(40, end) 1 normal forwards, blink 0.75s step-end infinite;

}

/* Blink Cursor */

@keyframes blink {

from {

border-color: transparent;

}

to {

border-color: #38a169;

/* Tailwind's green-500 */

}

}

.carousel img {

flex-shrink: 0;

min-width: 100%;

}

</style>