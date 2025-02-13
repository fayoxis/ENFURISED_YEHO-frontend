<template>
  <section class="py-12 w-full">
    <div class="max-w-7xl mx-auto px-6">
      <div class="justify-start align-center w-full text-3xl">
        <h1 class="text-start text-gray-700 font-extrabold " >
          RETROUVEZ-VOUS PAR NOS CATEGORIES
        </h1>
      </div>
      <div class="overflow-x-auto hide-scrollbar">
        <div class="flex space-x-8 animate-scroll hover-pause">
          <div v-for="category in categories" :key="category.title" class="w-[400px] min-w-[400px] bg-white group">
            <div class="flex-col justify-between items-start mb-4">
              <div class="flex ">
                <span class="text-lime-500 text-3xl font-extrabold w-full text-start">{{ category.count }}</span>
                <h3 class="text-xl font-bold text-gray-900 mt-1 w-full text-end">{{ category.title }}</h3>
              </div>
              <div class="flex space-x-4 items-center">
                <p class="text-sm w-70% text-gray-500 text-start">{{ category.description }}</p>


                <a href="#" class="text-lime-500 flex items-center text-end justify-end group ">
                  TOUT VOIR
                  <svg class="w-9 h-9 text-gray-500 group-hover:text-lime-500 transition-colors" viewBox="0 0 24 24"
                    fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
            <div class="relative overflow-hidden">
              <img :src="category.image" :alt="category.title"
                class="h-48 w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" />
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CategorySection",
  data() {
    return {
      categories: [
        {
          title: "DOMESTIQUE",
          count: "25 024",
          image: "/images/home/domestic.jpg",
          description: "Chambres d'hôtes, appartements, villas"
        },
        {
          title: "PROFESSIONNEL",
          count: "8 769",
          image: "/images/home/professional.jpg",
          description: "Restaurants, boutiques, bureaux"
        },
        {
          title: "SALLES DE FÊTES",
          count: "1 437",
          image: "/images/home/fete.jpg",
          description: "Salles, espaces événementiels"
        },
        {
          title: "TERRAINS",
          count: "3 552",
          image: "/images/home/terrains.jpg",
          description: "Terrains constructibles, agricoles"
        },
        {
          title: "HÔTELS",
          count: "950",
          image: "/images/home/hotels.jpg",
          description: "Hôtels, résidences, auberges"
        },
        {
          title: "BUREAUX",
          count: "4 221",
          image: "/images/home/bureaux.jpg",
          description: "Espaces de travail, open spaces"
        },
      ],
    };
  },
};
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-400px * 3 - 2rem * 3));
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.hover-pause:hover {
  animation-play-state: paused;
}

.overflow-x-auto::before,
.overflow-x-auto::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.overflow-x-auto::before {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}

.overflow-x-auto::after {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}
</style>