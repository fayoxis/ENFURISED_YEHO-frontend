<template>
  <div class="lg:mx-auto mx-5 space-y-10 lg:w-2/3 min-h-screen flex items-center">
      <div class="w-full space-y-10">
          <div>
              <h1 class="text-4xl md:text-6xl lg:text-8xl font-bold">
                  CONNEXION
              </h1>
          </div>
          
          <form @submit.prevent="handleLogin" ref="loginForm" class="w-full">
              <div class="space-y-8 shadow-xl p-6 lg:p-10">
                  <div class="lg:w-3/4 space-y-3 font-semibold">
                      <h1>Identifiants</h1>
                      <div class="border border-black w-1/6"></div>
                  </div>

                  <div class="space-y-6 lg:w-2/3">
                      <!-- Email Field -->
                      <div class="space-y-2">
                          <label for="email">E Mail</label>
                          <input 
                              type="email" 
                              id="email" 
                              v-model="formData.email" 
                              required
                              :class="{'border-red-500': errors.email}"
                              class="w-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300"
                          >
                          <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
                      </div>

                      <!-- Password Field -->
                      <div class="space-y-2">
                          <label for="password">Mot de Passe</label>
                          <div class="relative">
                              <input 
                                  :type="showPassword ? 'text' : 'password'"
                                  id="password" 
                                  v-model="formData.password" 
                                  required
                                  :class="{'border-red-500': errors.password}"
                                  class="w-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300"
                              >
                              <button 
                                  type="button"
                                  @click="togglePassword"
                                  class="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                  <span v-if="showPassword">🔒</span>
                                  <span v-else>👁️</span>
                              </button>
                          </div>
                          <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
                      </div>

                      <div class="flex justify-between items-center">
                          <label class="flex items-center space-x-2 cursor-pointer">
                              <input 
                                  type="checkbox" 
                                  v-model="formData.rememberMe"
                                  class="rounded text-[#A2C02D] focus:ring-[#A2C02D]"
                              >
                              <span>Se souvenir de moi</span>
                          </label>
                          <a href="#" class="text-[#005C53] hover:text-[#004a43] transition-all duration-300">
                              Mot de passe oublié?
                          </a>
                      </div>
                  </div>

                  <div class="pt-4">
                      <button 
                          type="submit"
                          :disabled="isSubmitting"
                          class="bg-[#A2C02D] text-white text-lg font-bold rounded-xl w-full p-6 hover:bg-[#8da825] transition-all duration-300 disabled:opacity-50"
                      >
                          {{ isSubmitting ? 'Connexion...' : 'Se Connecter' }}
                      </button>
                  </div>

                  <div class="text-center">
                      <p>Vous n'avez pas de compte? 
                          <a href="/inscription" class="text-[#005C53] font-semibold hover:text-[#004a43] transition-all duration-300">
                              Créer un compte
                          </a>
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

const errors = reactive({});
const isSubmitting = ref(false);
const showPassword = ref(false);

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!formData.email) {
      errors.email = 'L\'email est requis';
      isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
      isValid = false;
  }

  if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
      isValid = false;
  }

  return isValid;
};

const handleLogin = async (event) => {
  event.preventDefault();
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login attempt:', {
          email: formData.email,
          rememberMe: formData.rememberMe
      });
      // Handle successful login here (e.g., redirect to dashboard)
  } catch (error) {
      console.error('Login error:', error);
      alert('Échec de la connexion. Veuillez vérifier vos identifiants.');
  } finally {
      isSubmitting.value = false;
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
input {
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #A2C02D;
}

@media (min-width: 768px) {
  .space-y-10 {
      padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .space-y-10 {
      padding: 2.5rem;
  }
}
</style>