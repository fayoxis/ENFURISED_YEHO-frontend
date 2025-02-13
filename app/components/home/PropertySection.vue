<template>
    <section class="w-full relative py-5">
        <div class="px-6">
            <h2 class="text-2xl font-bold mb-8 text-gray-800 hover:text-gray-700 transition-colors">
                PROPRIÉTÉS DISPONIBLES
            </h2>

            <div class="relative group">
                <div ref="scrollContainer" class="overflow-x-auto hide-scrollbar">
                    <div class="flex space-x-6 pb-4 min-w-full justify-start">
                        <PropertyCard v-for="property in properties" :key="property.id" :property="property"
                            class="min-w-[400px] transition-transform hover:scale-105" />
                    </div>
                </div>

                <!-- Scroll Buttons -->
                <button @click="handleScroll('left')" v-show="canScrollLeft"
                    class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full hover:shadow-lg hover:bg-gray-50 transition-all duration-3=500 opacity-0 group-hover:opacity-100 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-6 h-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button @click="handleScroll('right')" v-show="canScrollRight"
                    class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-6 h-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex -full">
            <div class="justify-start w-1/2 ">
                <button @click="handleScroll('left')" v-show="canScrollLeft"
                    class=" bg-white p-2 rounded-full hover:shadow-lg hover:bg-gray-50 ">
                    <img src="/icons/home/left-arrow-icon.svg" alt="" />
                </button>
            </div>

            <div class="justify-end flex w-1/2">
                <button @click="handleScroll('right')" v-show="canScrollLeft"
                    class=" bg-white p-2 rounded-full hover:shadow-lg hover:bg-gray-50 ">
                    <img src="/icons/right-arrow-icon.svg" alt="" />
                </button>
            </div>
        </div>
    </section>
</template>



<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PropertyCard from '../properties/PropertyCard.vue';

const scrollContainer = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);


const updateScrollButtons = () => {
    if (!scrollContainer.value) return;

    const container = scrollContainer.value;
    canScrollLeft.value = container.scrollLeft > 0;
    canScrollRight.value = container.scrollLeft < (container.scrollWidth - container.clientWidth);
};

const handleScroll = (direction) => {
    if (!scrollContainer.value) return;

    const container = scrollContainer.value;
    const scrollAmount = direction === 'left' ? -400 : 400;

    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
};

onMounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.addEventListener('scroll', updateScrollButtons);
        updateScrollButtons();
        window.addEventListener('load', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);
    }
});

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('load', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
    }
});

const properties = ref([
    {
        id: 1,
        image: '/images/home/properties/property-image.jpg',
        price: '130 000',
        period: 'Mois',
        title: 'Appartement Moderne',
        bathrooms: '02',
        bedrooms: '02',
        area: '200',
        location: 'Messassi mbankolo, Offa, Yaoundé IV',
    },
    {
        id: 2,
        image: '/images/home/properties/property-image.jpg',
        price: '130 000',
        period: 'Mois',
        title: 'Appartement Moderne',
        bathrooms: '02',
        bedrooms: '02',
        area: '200',
        location: 'Messassi mbankolo, Offa, Yaoundé IV'
    },
    {
        id: 3,
        image: '/images/home/properties/property-image.jpg',
        price: '130 000',
        period: 'Mois',
        title: 'Appartement Moderne',
        bathrooms: '02',
        bedrooms: '02',
        area: '200',
        location: 'Messassi mbankolo, Offa, Yaoundé IV'
    },
    {
        id: 4,
        image: '/images/home/properties/property-image.jpg',
        price: '180 000',
        period: 'Mois',
        title: 'Appartement Moderne',
        bathrooms: '03',
        bedrooms: '03',
        area: '300',
        location: 'Messassi mbankolo, Offa, Yaoundé IV'
    },
    {
        id: 5,
        image: '/images/home/properties/property-image.jpg',
        price: '330 000',
        period: 'Mois',
        title: 'Appartement Moderne',
        bathrooms: '05',
        bedrooms: '04',
        area: '500',
        location: 'Messassi mbankolo, Offa, Yaoundé IV'
    },
    {
        id: 6,
        image: '/images/home/properties/property-image.jpg',
        price: '130 000',
        period: 'Mois',
        title: 'Appartement Moderne',
        bathrooms: '02',
        bedrooms: '02',
        area: '200',
        location: 'Messassi mbankolo, Offa, Yaoundé IV',
        featured: true
    },
    {
        id: 7,
        image: '/images/home/properties/property-image.jpg',
        price: '250 000',
        period: 'Mois',
        title: 'Villa de Luxe',
        bathrooms: '04',
        bedrooms: '05',
        area: '400',
        location: 'Messassi mbankolo, Offa, Yaoundé IV'
    },
    {
        id: 8,
        image: '/images/home/properties/property-image.jpg',
        price: '180 000',
        period: 'Mois',
        title: 'Studio Moderne',
        bathrooms: '01',
        bedrooms: '01',
        area: '150',
        location: 'Messassi mbankolo, Offa, Yaoundé IV'
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
</style>