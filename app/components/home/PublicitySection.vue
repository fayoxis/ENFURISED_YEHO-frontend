<template>
    <div class="bg-white  p-4 sm:p-6 lg:p-12 relative overflow-hidden">
        <!-- Main Content -->
        <div class="container mx-auto justify-center grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            <!-- Right Content - Phone Mockup -->
            <div class="relative flex justify-center lg:justify-between items-center  lg:order-2" v-motion
                :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0 }">
                <div
                    class="absolute top-1/2 lg:right-0 sm:left-20 transform -translate-y-1/2 w-[335px] h-[335px] sm:w-[400px] sm:h-[400px] lg:w-[520px] lg:h-[520px] bg-[#2FAC66] rounded-full opacity-100 animate-pulse ">
                </div>
                <img src="/images/home/phone-mockup.svg" alt="YEHO App"
                    class="relative z-10 w-full lg:right-10 sm:right-10  lg:top-20 max-w-[310px] sm:max-w-[390px] lg:max-w-md mx-auto transform transition-all duration-500 hover:scale-105 hover:rotate-4" />
            </div>

            <!-- Left Content -->
            <div class="text-white  justify-center w-full space-y-6 lg:space-y-6 transform transition-all duration-500 ease-out"
                v-motion :initial="{ opacity: 0, x: -100 }" :visible="{ opacity: 1, x: 0 }">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                    <span class="text-black">EMMENEZ </span>
                    <span class="text-[#2FAC66] hover:text-[#238653] transition-colors duration-300">YEHO</span>
                    <br />
                    <span class="text-black">AVEC VOUS.</span>
                </h1>

                <p class="text-[#8DAD9D] text-sm md:text-base max-w-xl">
                    Ayez nos services immobiliers à portée de doigt avec l'application YEHO ! Un accès
                    simplifié et des fonctionnalités sur-mesure pour vous faciliter la tâche. Profitez des
                    nombreux avantages et optimisez votre expérience immobilière en un clic.
                </p>

                <!-- Feature Cards -->
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <!-- Feature Card Component (repeated 4 times) -->
                    <template v-for="(feature, index) in features" :key="index">
                        <div class="bg-white rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            :class="{ 'animate-fadeIn': true }" :style="{ animationDelay: `${index * 100}ms` }">
                            <div class=" flex flex-col lg:flex-row justify-center items-center p-2 lg:space-x-6">
                                <div class="flex flex-wrap py-5 lg:px-6  w-1/2 lg:w-fit justify-center items-center rounded-lg" :class="feature.bgColor">
                                    <img :src="feature.icon" :alt="feature.title" class="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 class="font-bold text-center text-black">{{ feature.title }}</h3>
                                    <p class="text-sm text-center font-normal lg:font-semibold text-gray-400">{{ feature.subtitle }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- App Store Buttons -->
                <div class="flex sm:flex-row gap-4 mt-8">
                    <template v-for="(store, index) in stores" :key="index">
                        <a :href="store.link"
                            class="group border-black border  p-1 bg-white w-full rounded-lg transform transition-all duration-300 hover:scale-105">
                            <div
                                class="bg-black w-full h-full px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center sm:justify-start space-x-2 transition-all duration-300 group-hover:bg-gray-900">
                                <img :src="store.logo" :alt="store.name" class="h-8 sm:h-9 px-3 sm:px-7" />
                                <div class="text-left text-white">
                                    <div class="text-xs hidden lg:block">{{ store.subtitle }}</div>
                                    <div class="lg:text-lg sm:text-md font-bold">{{ store.name }}</div>
                                </div>
                            </div>
                        </a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const features = [
    {
        title: 'Nouvelles Publications',
        subtitle: 'Suivre vos recherches',
        icon: '/icons/home/time-icon.svg',
        bgColor: 'bg-[#A2C02D] bg-opacity-10'
    },
    {
        title: 'Propriétés Favorites',
        subtitle: 'Vos enregistrements',
        icon: '/icons/home/favorite-icon.svg',
        bgColor: 'bg-[#F24405] bg-opacity-10'
    },
    {
        title: 'Suivre vos Procédures',
        subtitle: 'avec l\'agent immobilier',
        icon: '/icons/home/follow-procedure-icon.svg',
        bgColor: 'bg-[#005C53] bg-opacity-10'
    },
    {
        title: 'Selection de Filtres',
        subtitle: 'recherche à refaire',
        icon: '/icons/home/selection-icon.svg',
        bgColor: 'bg-black bg-opacity-10'
    }
]

const stores = [
    {
        name: 'Google Play',
        subtitle: 'Obtenir pour aos sur',
        logo: '/images/store/google-play.png',
        link: '#'
    },
    {
        name: 'App Store',
        subtitle: 'Obtenir pour ios sur',
        logo: '/images/store/app-store.png',
        link: '#'
    }
]
</script>

<style>
.animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>