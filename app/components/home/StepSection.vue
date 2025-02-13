<template>
  <section class="bg-[#8DAD9D] w-full relative overflow-hidden">
    <!-- Decorative Background -->
    <div class="absolute top-1/2 lg:top-55% left-1/2 lg:left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-80 hidden lg:block"
      :style="{
        backgroundImage: `url('images/home/decorativebackground.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '600px',
        height: '540px'
      }"></div>

    <div class="lg:flex hidden justify-end space-x-5 items-center">
      <p class="text-[#D9F9E9] text-sm md:text-base">
        Vous avez accès ou possédez des propriétés à proposer?
      </p>
      <a href="/">
        <div
          class="hover:bg-lime-100 bg-white rounded-bl-3xl py-2 px-3 md:py-4 md:px-5 text-sm md:text-base cursor-pointer transition-colors">
          devenir agent immobilier
        </div>
      </a>
    </div>

    <div class="container mx-auto px-4 relative z-10 ">
      <div class="flex flex-col lg:flex-row items-start justify-center space-y-12 lg:space-y-0 lg:space-x-8">
        <!-- Left Side -->
        <div class="w-full lg:w-1/2 space-y-10">
          <h2
            class="text-3xl md:text-5xl text-start md:text-center lg:text-end lg:text-6xl font-black text-[#D9F9E9] mb-8 animate-fade-in px-5">
            LES ÉTAPES DE <br> NOTRE MÉTHODE.
          </h2>
          <div class="lg:grid-cols-1 flex md:grid-cols-3 gap-2 lg:gap-5 lg:px-2">
            <div v-for="step in steps" :key="step.title"
              class="cursor-pointer lg:px-3 py-5 lg:py-5 lg:space-y-10 transform hover:scale-105 transition-all duration-300 bg-[#005C53] rounded-lg shadow-md w-full h-30 lg:h-64 md:h-46 flex flex-col"
              :class="{ 'ring-2 bg-white text-[#F24405] border-[#F24405] ring-[#D9F9E9]': selectedRole === step.title }"
              @click="selectedRole = step.title">
              <div class="h-full justify-center items-center lg:py-3">
              <img :src="step.icon" :alt="step.title"
                class="w-16 lg:w-24 lg:h-24 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-1 border-2 border-b-4"
                :class="{ 'ring-2 bg-white text-[#F24405] border-[#F24405] ring-transparent': selectedRole === step.title }" />
              </div>
              <div class="flex-grow w-full h-1/3 flex-col bottom-0 items-end">
                <p
                  :class="['lg:text-md lg:font-bold text-xs text-center lg:text-start', { 'text-[#F24405]': selectedRole === step.title, 'text-[#D9F9E9]': selectedRole !== step.title }]">
                  {{ step.description }}
                </p>
                <h3
                  :class="['font-black lg:text-4xl text-center lg:text-start', { 'text-[#F24405]': selectedRole === step.title, 'text-[#D9F9E9]': selectedRole !== step.title }]">
                  {{ step.title }}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div class="w-full lg:py-28 lg:w-1/3">
          <ol class="space-y-6">
            <li v-for="item in stepContent[selectedRole]" :key="item.number" class="group">
              <div class="flex items-center justify-between border-b-4 border-white pb-4">
                <div class="flex items-center">
                  <span :class="[
                    'text-3xl md:text-3xl font-black mr-4 transform transition-transform group-hover:scale-110',
                    item.expandable ? 'text-[#005C53]' : 'text-[#D9F9E9]'
                  ]">
                    {{ item.number }}
                  </span>
                  <span :class="[
                    item.expandable
                      ? 'text-2xl font-bold text-white'
                      : 'text-white text-md font-extralight',
                    'group-hover:text-[#D9F9E9]'
                  ]">
                    {{ item.title }}
                  </span>
                </div>
                <button v-if="item.expandable" @click="toggleStep(item.number)"
                  class="text-white items-center hover:text-[#D9F9E9] transition-colors">
                  <img :src="expandedStep === item.number ? '/icons/minus-icon.svg' : '/icons/plus-icon.svg'"
                    alt="toggle" class="w-6 h-6" />
                </button>
                <img v-else src="/icons/up-right-icon.svg" alt="arrow icon"
                  class="w-5 h-5 transition-all duration-300 group-hover:transform group-hover:translate-x-[5px]" />
              </div>
              <div v-if="expandedStep === item.number && item.expandable"
                class="mt-4 pl-12 pr-4 text-[#D9F9E9] text-sm md:text-base animate-fade-in">
                {{ item.description }}
              </div>
            </li>
          </ol>
          <!-- Desktop buttom section -->
          <div class="hidden w-full lg:flex lg:justify-end py-5 space-y-4 md:space-y-0 space-x-10 items-center mt-8">
            <div v-for="(link, index) in bottomLinks" :key="index"
              class="flex flex-row items-center space-x-5 text-[#D9F9E9] cursor-pointer group">
              <p class="transition-all duration-300 group-hover:transform group-hover:translate-x-[-5px]">
                {{ link.text }}
              </p>
              <img src="/icons/up-right-icon.svg" alt="arrow icon"
                class="w-6 h-6 transition-all duration-300 group-hover:transform group-hover:translate-x-[5px]" />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Bottom Section -->
      <div
        class="lg:hidden flex flex-rowflex-wrap lg:justify-end py-5 w-full space-y-4 md:space-y-0 space-x-10 items-center md:px-12 mt-8">
        <!-- devenir un argent section -->
        <div class="flex flex-col space-y-4 w-1/2 justify-end items-center">
          <p class="text-[#D9F9E9] text-sm md:text-base ">
            Vous avez accès ou possédez des propriétés à proposer?
          </p>
          <a href="/">
            <div
              class="hover:bg-lime-100 h-full justify-start bg-white rounded-bl-3xl py-3 rounded-e-2xl px-3 md:py-4 md:px-5 text-sm md:text-base cursor-pointer transition-colors">
              <p class="text-center font-bold md:text-xl"> devenir agent immobilier </p>
            </div>
          </a>
        </div>
        <!-- link section -->
        <div class="flex-col items-center justify-end w-1/2 space-y-5">
          <div v-for="(link, index) in bottomLinks" :key="index"
            class="flex items-center space-x-3 text-[#D9F9E9] cursor-pointer group justify-end">
            <p
              class="transition-all text-sm duration-300 group-hover:transform group-hover:translate-x-[-5px] flex items-center">
              {{ link.text }}
            </p>
            <img src="/icons/up-right-icon.svg" alt="arrow icon"
              class="w-5 h-5 transition-all duration-300 group-hover:transform group-hover:translate-x-[5px] flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const selectedRole = ref('CLIENT');
const expandedStep = ref(null);
const bottomLinks = [

  { text: 'À propos' },

  { text: 'MON COMPTE' },

  { text: 'F.A.Q' }

]

const steps = [
  {
    icon: '/images/home/hero/hero2.jpg',
    title: 'CLIENT',
    description: 'Procédure pour un',
    color: 'text-red-600',
  },
  {
    icon: '/images/home/hero/hero2.jpg',
    title: 'PROPRIO',
    description: 'Procédure pour un',
    color: 'text-green-600',
  },
  {
    icon: '/images/home/hero/hero2.jpg',
    title: 'AGENT IM.',
    description: 'En suivi par un',
    color: 'text-blue-600',
  },
];

const stepContent = {
  CLIENT: [
    {
      number: '01',
      title: 'RECHERCHES ET SUIVI',
      expandable: true,
      description: 'Notre équipe vous accompagne dans la définition de vos critères de recherche. Nous analysons vos besoins en termes de localisation, budget, et caractéristiques spécifiques pour cibler les propriétés idéales.',
    },
    {
      number: '02',
      title: 'CALENDRIER DE VISITES',
      expandable: true,
      description: 'Organisation efficace des visites selon vos disponibilités. Nous coordonnons avec les propriétaires et préparons un itinéraire optimisé pour maximiser votre temps.',
    },
    {
      number: '03',
      title: 'ENTENTES ET PRÉREQUIS',
      expandable: true,
      description: 'Assistance complète dans la préparation de votre dossier, vérification des conditions financières, et négociation des termes du contrat en votre faveur.',
    },
    {
      number: '04',
      title: 'Cliquez pour poser une question',
      expandable: false,
    },
  ],
  PROPRIO: [
    {
      number: '01',
      title: 'ÉVALUATION ET STRATÉGIE',
      expandable: true,
      description: 'Analyse approfondie de votre propriété, étude du marché local, et établissement d\'une stratégie de prix optimale pour maximiser votre rendement.',
    },
    {
      number: '02',
      title: 'MARKETING ET EXPOSITION',
      expandable: true,
      description: 'Mise en valeur professionnelle de votre bien avec photos de qualité, visites virtuelles, et diffusion sur nos réseaux privilégiés.',
    },
    {
      number: '03',
      title: 'GESTION DES OFFRES',
      expandable: true,
      description: 'Négociation experte des offres reçues, vérification approfondie des dossiers des acheteurs potentiels, et conseil stratégique pour la meilleure décision.',
    },
    {
      number: '04',
      title: 'Cliquez pour poser une question',
      expandable: false,
    },
  ],
  'AGENT IM.': [
    {
      number: '01',
      title: 'INTÉGRATION ET FORMATION',
      expandable: true,
      description: 'Programme complet d\'intégration, formation aux outils exclusifs, et accès à notre réseau d\'experts pour développer votre activité.',
    },
    {
      number: '02',
      title: 'GESTION DE PORTEFEUILLE',
      expandable: true,
      description: 'Outils avancés pour la gestion de vos biens et clients, support marketing personnalisé, et ressources pour optimiser vos performances.',
    },
    {
      number: '03',
      title: 'DÉVELOPPEMENT PROFESSIONNEL',
      expandable: true,
      description: 'Accompagnement continu, formations régulières, et opportunités de croissance au sein de notre réseau d\'excellence.',
    },
    {
      number: '04',
      title: 'Cliquez pour poser une question',
      expandable: false,
    },
  ],
};

const toggleStep = (stepNumber) => {
  expandedStep.value = expandedStep.value === stepNumber ? null : stepNumber;
};
</script>

<style scoped>
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

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
</style>