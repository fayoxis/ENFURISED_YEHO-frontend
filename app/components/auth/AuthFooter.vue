<template>
    <footer class="bg-white py-2">
      <div class="w-full mx-auto items-center px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-[#8DAD9D]">
          Your Elite Home - Tous droits réservés 
          <span class="text-[#A2C02D] font-medium">E.U.P.H.A.I.S.E</span> 
          {{ currentYear }} - Conception 
          <a 
            href="#" 
            class="text-[#A2C02D] hover:underline"
          >
            Yeko Design
          </a>
        </p>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  const currentYear = new Date().getFullYear()
  </script>