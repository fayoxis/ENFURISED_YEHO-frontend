<template>
    <div class="w-full bg-white py-6">
      <div class="relative max-w-7xl mx-auto">
        <!-- Navigation Arrows -->
        <button @click="scroll('left')"
                class="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:shadow-xl rounded-full p-3 hover:bg-emerald-50 transition-all duration-200 border border-gray-100 group"
                :class="{ 'opacity-0 pointer-events-none': isScrollStart, 'opacity-100': !isScrollStart }">
          <img src="/icons/home/left-arrow-icon.svg" alt="" class="w-7">
        </button>
  
        <button @click="scroll('right')"
                class="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:shadow-xl rounded-full p-3 hover:bg-emerald-50 transition-all duration-200 border border-gray-100 group"
                :class="{ 'opacity-0 pointer-events-none': isScrollEnd, 'opacity-100': !isScrollEnd }">
          <img src="/icons/right-arrow-icon.svg" alt="" class="w-7">
        </button>
  
        <!-- Scrollable Container -->
        <div ref="container"
             class="flex overflow-x-auto scrollbar-hide bg-white snap-x snap-mandatory gap-6 px-4 md:px-8 scroll-smooth pb-4"
             @scroll="checkScroll">
          <div v-for="type in propertyTypes" :key="type.id"
               class="flex flex-col items-center flex-shrink-0 snap-center w-28 cursor-pointer transition-all duration-300 ease-in-out"
               @click="selectType(type.id)">
            <div class="w-16 h-16 mb-3 flex items-center justify-center rounded-xl shadow-md transition-all duration-300"
                 :class="{
                   'bg-[#2FAC66] text-white': selectedType === type.id,
                   'bg-white text-[#2FAC66]': selectedType !== type.id
                 }">
              <component :is="type.icon" class="w-8 h-8" />
            </div>
            <span class="text-sm font-medium text-center transition-colors duration-300 whitespace-nowrap"
                  :class="{
                    'text-[#2FAC66]': selectedType === type.id,
                    'text-[#8DAD9D]': selectedType !== type.id
                  }">
              {{ type.name }}
            </span>
          </div>
        </div>
  
        <!-- Shadow Overlays -->
        <div class="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"
             :class="{ 'opacity-0': isScrollStart }"></div>
        <div class="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"
             :class="{ 'opacity-0': isScrollEnd }"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, onMounted } from 'vue';
  import {
    Home,
    Building2,
    Hotel,
    Warehouse,
    Building,
    Store,
    PartyPopper,
    Users,
    Camera,
    Calendar,
    Building2 as Office,
    Clock,
    CalendarClock,
    CalendarDays,
    HouseIcon,
    HomeIcon
  } from 'lucide-vue-next';
  
  const container = ref(null);
  const selectedType = ref(null); // Start with no selected type
  const isScrollStart = ref(true);
  const isScrollEnd = ref(false);
  
  const props = defineProps({
    selectedType: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['update:selectedType']);
  
  const selectType = (typeId) => {
    selectedType.value = typeId; // Set selected type to the clicked type
    emit('update:selectedType', typeId);
    centralizeSelectedItem();
  };
  
  const propertyTypes = [
    { id: 'house', name: 'Maison', icon: Home },
    { id: 'apartment', name: 'Appartement', icon: Building2 },
    { id: 'villa', name: 'Villa', icon: Building },
    { id: 'hotel', name: 'Hôtel', icon: Hotel },
    { id: 'event_hall', name: 'Salle des fêtes', icon: PartyPopper },
    { id: 'conference', name: 'Salle de conférence', icon: Users },
    { id: 'wedding_venue', name: 'Lieu de mariage', icon: PartyPopper },
    { id: 'exhibition', name: 'Salle d\'exposition', icon: Camera },
    { id: 'meeting_room', name: 'Salle de réunion', icon: Calendar },
    { id: 'theater', name: 'Théâtre', icon: Building },
    { id: 'banquet', name: 'Banquet', icon: Store },
    { id: 'office', name: 'Bureau', icon: Office },
    { id: 'store', name: 'Commerce', icon: Store },
    { id: 'warehouse', name: 'Entrepôt', icon: Warehouse },
    { id: 'coworking', name: 'Coworking', icon: Users },
    { id: 'studio', name: 'Studio', icon: HomeIcon },
    { id: 'factory', name: 'Usine', icon: Building2 },
    { id: 'short_term', name: 'Court terme', icon: Clock },
    { id: 'long_term', name: 'Long terme', icon: CalendarDays },
    { id: 'seasonal', name: 'Saisonnier', icon: CalendarClock },
    { id: 'shared_room', name: 'Chambre partagée', icon: Users },
  ];
  
  const scroll = (direction) => {
    if (!container.value) return;
  
    const scrollAmount = container.value.offsetWidth * 0.75;
    const targetScroll = container.value.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
  
    container.value.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };
  
  const checkScroll = () => {
    if (!container.value) return;
  
    const { scrollLeft, scrollWidth, offsetWidth } = container.value;
    isScrollStart.value = scrollLeft <= 0;
    isScrollEnd.value = scrollLeft + offsetWidth >= scrollWidth - 10;
  };
  
  const centralizeSelectedItem = () => {
    if (!container.value) return;
  
    const selectedItem = container.value.querySelector(`[key="${selectedType.value}"]`);
    if (selectedItem) {
      const containerWidth = container.value.offsetWidth;
      const itemLeft = selectedItem.offsetLeft;
      const itemWidth = selectedItem.offsetWidth;
      const targetScroll = itemLeft - containerWidth / 2 + itemWidth / 2;
  
      container.value.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };
  
  onMounted(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
  });
  </script>
  
  <style scoped>
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
  
  .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
  
  /* Smooth transition for shadow overlays */
  .from-gray-50 {
      transition: opacity 0.3s ease-in-out;
  }
  
  /* Responsive Design */
  @media (max-width: 640px) {
      .w-28 {
          width: 5rem;
      }
  
      .w-16 {
          width: 3.5rem;
          height: 3.5rem;
      }
  
      .w-8 {
          width: 1.5rem;
          height: 1.5rem;
      }
  }
  
  /* Active item animation */
  .scale-105 {
      transform: scale(1.05);
  }
  
  /* Shadow and hover effects */
  .shadow-md {
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  
  .shadow-xl {
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
  </style>