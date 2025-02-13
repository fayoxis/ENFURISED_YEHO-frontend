<template>
    <div class="lg:mx-auto mx-5 space-y-10 lg:w-2/3 min-h-screen flex items-center">
      <div class="w-full space-y-10">
        <!-- Header -->
        <div>
          <h1 class="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900">
            CONNEXION
          </h1>
        </div>
        
        <!-- Form -->
        <form @submit.prevent="handleLogin" class="w-full">
          <div class="space-y-8 shadow-xl p-6 lg:p-10 rounded-2xl bg-white">
            <!-- Section Header -->
            <div class="lg:w-3/4 space-y-3 font-semibold">
              <h2 class="text-xl text-gray-900">Identifiants</h2>
              <div class="border-2 border-black w-16"></div>
            </div>
  
            <div class="space-y-6 lg:w-2/3">
              <!-- Email Field -->
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">E Mail</label>
                <div class="relative">
                  <Icon 
                    name="heroicons:envelope" 
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5"
                  />
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    required
                    :class="{'ring-2 ring-red-500': errors.email}"
                    class="w-full pl-10 pr-4 py-3 bg-white shadow-md rounded-xl text-gray-900 focus:ring-2 focus:ring-[#A2C02D] transition-all duration-300"
                    placeholder="votre@email.com"
                  >
                </div>
                <TransitionGroup name="fade">
                  <p v-if="errors.email" class="text-red-500 text-sm" :key="errors.email">
                    {{ errors.email }}
                  </p>
                </TransitionGroup>
              </div>
  
              <!-- Password Field -->
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Mot de Passe</label>
                <div class="relative">
                  <Icon 
                    name="heroicons:lock-closed" 
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5"
                  />
                  <input 
                    :type="showPassword ? 'text' : 'password'"
                    id="password" 
                    v-model="formData.password" 
                    required
                    :class="{'ring-2 ring-red-500': errors.password}"
                    class="w-full pl-10 pr-12 py-3 bg-white shadow-md rounded-xl text-gray-900 focus:ring-2 focus:ring-[#A2C02D] transition-all duration-300"
                    placeholder="••••••••"
                  >
                  <button 
                    type="button"
                    @click="togglePassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon 
                      :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" 
                      class="h-5 w-5"
                    />
                  </button>
                </div>
                <TransitionGroup name="fade">
                  <p v-if="errors.password" class="text-red-500 text-sm" :key="errors.password">
                    {{ errors.password }}
                  </p>
                </TransitionGroup>
              </div>
  
              <!-- Remember Me & Forgot Password -->
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="formData.rememberMe"
                    class="rounded text-[#A2C02D] focus:ring-[#A2C02D] h-4 w-4"
                  >
                  <span class="text-sm text-gray-700">Se souvenir de moi</span>
                </label>
                <NuxtLink 
                  to="/forgot-password"
                  class="text-sm text-[#005C53] hover:text-[#004a43] transition-all duration-300"
                >
                  Mot de passe oublié?
                </NuxtLink>
              </div>
            </div>
  
            <!-- Submit Button -->
            <div class="pt-4">
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="bg-[#A2C02D] text-white text-lg font-bold rounded-xl w-full p-6 hover:bg-[#8da825] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
                {{ isSubmitting ? 'Connexion...' : 'Se Connecter' }}
              </button>
            </div>
  
            <!-- Sign Up Link -->
            <div class="text-center">
              <p class="text-gray-700">
                Vous n'avez pas de compte? 
                <NuxtLink 
                  to="/auth/register" 
                  class="text-[#005C53] font-semibold hover:text-[#004a43] transition-all duration-300"
                >
                  Créer un compte
                </NuxtLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  definePageMeta({
    layout: 'auth-layout'
  });
  
  const formData = reactive({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const errors = reactive({
    email: '',
    password: ''
  });
  
  const isSubmitting = ref(false);
  const showPassword = ref(false);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    errors.email = '';
    errors.password = '';
  
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
      isValid = false;
    }
  
    // Password validation
    if (!formData.password.trim()) {
      errors.password = 'Le mot de passe est requis';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
      isValid = false;
    }
  
    return isValid;
  };
  
  const handleLogin = async () => {
    if (!validateForm()) return;
  
    isSubmitting.value = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make your actual API call
      console.log('Login attempt:', {
        email: formData.email,
        rememberMe: formData.rememberMe
      });
      
      // Reset form after successful login
      formData.email = '';
      formData.password = '';
      formData.rememberMe = false;
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>