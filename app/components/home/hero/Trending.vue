<template>
    <section class="bg-transparent w-full py-10">
        <div>
            <h1 class="px-10 text-start text-lg text-white font-extrabold">
              Les lieu les plus abordable selon votre localisation
            </h1>
        </div>
      <div class="max-w-[95%] mx-auto">
        <!-- Scrollable Container -->
        <div class="overflow-x-auto hide-scrollbar">
          <div class="flex space-x-4 px-2">
            <div
              v-for="category in categories"
              :key="category.title"
              class="category-card group"
            >
              <NuxtImg
                :src="category.image"
                :alt="category.title"
                class="w-full h-full object-cover rounded-2xl absolute inset-0 transition-transform duration-300"
                loading="lazy"
                format="webp"
                quality="80"
              />
              <div class="overlay">
                <div class="content">
                  <div class="flex items-center justify-between w-full">
                    <div>
                      <h3 class="text-2xl font-bold text-white">{{ category.count }}</h3>
                      <p class="text-white uppercase tracking-wider text-sm font-medium">
                        {{ category.title }}
                      </p>
                    </div>
                    <div class="arrow-icon opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        class="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <path 
                          d="M7 17L17 7M17 7H7M17 7V17" 
                          stroke="white" 
                          stroke-width="2" 
                          stroke-linecap="round" 
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const categories = ref([
    {
      title: "Domestique",
      count: "25 024",
      image: "/images/home/domestic.jpg",
    },
    {
      title: "Professionnel",
      count: "8 769",
      image: "/images/home/professional.jpg",
    },
    {
      title: "Salles de Fêtes",
      count: "1 437",
      image: "/images/home/fete.jpg",
    },
    {
      title: "Terrains",
      count: "3 552",
      image: "/images/home/terrains.jpg",
    },
    {
      title: "Hôtels",
      count: "950",
      image: "/images/home/hotels.jpg",
    },
    {
      title: "Bureaux",
      count: "4 221",
      image: "/images/home/bureaux.jpg",
    },
  ]);
  </script>
  
  <style scoped>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .category-card {
    position: relative;
    width: 280px;
    height: 180px;
    flex-shrink: 0;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    transition: background 0.3s ease;
  }
  
  .category-card:hover .overlay {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
  
  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
  }
  
  .arrow-icon {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Smooth scroll behavior */
  .overflow-x-auto {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  </style>