<template>
    <div class="lg:mx-auto mx-5 space-y-10 lg:w-4/5 ">
        <div>
            <h1 class="text-4xl md:text-6xl lg:text-8xl font-bold">
                INSCRIPTION
            </h1>
        </div>
        <form @submit.prevent="handleSubmit" ref="registrationForm" class="w-full" >
            <div class="space-y-5 w-full">
                <div class="lg:w-3/4 space-y-3 font-semibold">
                    <h1>Informations Personnelles</h1>
                    <div class="border border-black w-1/6"></div>
                </div>

                <!-- first part -->
                <div class="space-y-10 shadow-xl p-6">
                    <!-- first row -->
                    <div>
                        <div class="flex flex-col lg:flex-row gap-5">
                            <div class="space-y-2 lg:w-1/2">
                                <label for="fullName">Nom Complet</label>
                                <input type="text" id="fullName" v-model="formData.fullName" required
                                    :class="{'border-red-500': errors.fullName}"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                <span v-if="errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</span>
                            </div>
                            <div class="space-y-2">
                                <label for="birthDate">Date de Naissance</label>
                                <input type="date" id="birthDate" v-model="formData.birthDate" required
                                    :class="{'border-red-500': errors.birthDate}"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                <span v-if="errors.birthDate" class="text-red-500 text-sm">{{ errors.birthDate }}</span>
                            </div>
                            <div class="space-y-2">
                                <label for="city">Ville de Résidence</label>
                                <input type="text" id="city" v-model="formData.city" required
                                    :class="{'border-red-500': errors.city}"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                <span v-if="errors.city" class="text-red-500 text-sm">{{ errors.city }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- second row -->
                    <div>
                        <div class="flex flex-col lg:flex-row gap-5">
                            <div class="space-y-2">
                                <label for="email">E Mail</label>
                                <input type="email" id="email" v-model="formData.email" required
                                    :class="{'border-red-500': errors.email}"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
                            </div>
                            <div class="space-y-2 lg:w-1/2">
                                <label for="phone">Numéro de Téléphone</label>
                                <input type="tel" id="phone" v-model="formData.phone" required
                                    :class="{'border-red-500': errors.phone}"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
                            </div>
                            <div class="space-y-2">
                                <label for="password">Mot de Passe</label>
                                <input type="password" id="password" v-model="formData.password" required
                                    :class="{'border-red-500': errors.password}"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
                            </div>
                            <div class="space-y-2">
                                <label for="confirmPassword">Confirmer Mot de passe</label>
                                <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required
                                    :class="{'border-red-500': errors.confirmPassword}"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="lg:w-3/4 space-y-3 font-semibold">
                        <h1>Informations Légales</h1>
                        <div class="border border-black w-1/6"></div>
                    </div>
                    <!-- second part -->
                    <div class="flex flex-col lg:flex-row gap-5">
                        <div class="w-full lg:w-2/3 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                            <!-- ID Card Front -->
                            <div class="w-full h-full font-semibold">
                                Carte Nationale d'Identité (Face)
                                <div @click="triggerFileInput('front')" @dragover.prevent
                                    @drop.prevent="handleFileDrop($event, 'front')"
                                    :class="{'border-red-500': errors.idCardFront}"
                                    class="border-2 border-dashed border-[#8DAD9D] rounded-xl h-[150px] md:h-[180px] lg:h-[200px] flex items-center justify-center cursor-pointer shadow-xl transition-all duration-300">
                                    <input type="file" ref="frontIdInput" class="hidden"
                                        @change="handleFileSelect($event, 'front')" accept="image/*">
                                    <div v-if="!formData.idCardFront" class="text-center">
                                        <img src="/icons/upload-icon.svg" class="w-12 h-12" alt="upload">
                                    </div>
                                    <img v-else :src="formData.idCardFront"
                                        class="h-full w-full object-cover rounded-md">
                                </div>
                                <span v-if="errors.idCardFront" class="text-red-500 text-sm">{{ errors.idCardFront }}</span>
                            </div>

                            <!-- ID Card Back -->
                            <div class="w-full font-semibold">
                                Carte Nationale d'Identité (dos)
                                <div @click="triggerFileInput('back')" @dragover.prevent
                                    @drop.prevent="handleFileDrop($event, 'back')"
                                    :class="{'border-red-500': errors.idCardBack}"
                                    class="border-2 border-dashed border-[#8DAD9D] rounded-xl h-[150px] md:h-[180px] lg:h-[200px] flex items-center justify-center cursor-pointer shadow-xl transition-all duration-300">
                                    <input type="file" ref="backIdInput" class="hidden"
                                        @change="handleFileSelect($event, 'back')" accept="image/*">
                                    <div v-if="!formData.idCardBack" class="text-center">
                                        <img src="/icons/upload-icon.svg" class="w-12 h-12" alt="upload">
                                    </div>
                                    <img v-else :src="formData.idCardBack"
                                        class="h-full w-full object-cover rounded-md">
                                </div>
                                <span v-if="errors.idCardBack" class="text-red-500 text-sm">{{ errors.idCardBack }}</span>
                            </div>
                        </div>

                        <div class="flex-col w-full h-full lg:space-y-20 lg:w-1/2">
                            <div class="w-full flex flex-col sm:flex-row gap-4">
                                <div class="relative w-full h-full space-y-2 flex-1">
                                    <label class="absolute -top-2 left-2 px-1 text-xs text-black">Numéro de CNI</label>
                                    <input type="text" v-model="formData.idNumber" required
                                        :class="{'border-red-500': errors.idNumber}"
                                        class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                    <span v-if="errors.idNumber" class="text-red-500 text-sm">{{ errors.idNumber }}</span>
                                </div>
                                <div class="relative h-full lg:w-1/2 space-y-2">
                                    <label class="absolute -top-2 left-2 px-1 text-xs text-black">Date d'expiration</label>
                                    <input type="date" v-model="formData.expiryDate" required
                                        :class="{'border-red-500': errors.expiryDate}"
                                        class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black transition-all duration-300">
                                    <span v-if="errors.expiryDate" class="text-red-500 text-sm">{{ errors.expiryDate }}</span>
                                </div>
                            </div>

                            <div class="flex flex-row sm:flex-row w-full gap-2 lg:gap-5 sm:space-y-0">
                                <button type="button" @click="showLegalTies" 
                                    class="bg-[#005C53] shadow-xl items-center justify-center text-[#A2C02D] text-xs  lg:text-base lg:font-semibold w-1/3 h-full lg:w-full rounded-lg py-6 px-2 hover:bg-[#004a43] transition-all duration-300">
                                    <img src="/icons/balance-icon.svg" class="px-6 lg:px-10" alt="balance-icon">
                                    Legal Ties</button>
                                <button type="button" @click="showTerms"
                                    class="bg-[#005C53] shadow-xl justify-center text-[#A2C02D] text-xs w-1/3 h-full lg:text-base lg:font-semibold lg:w-full rounded-lg py-3 px-2 hover:bg-[#004a43] transition-all duration-300">
                                    <img src="/icons/file-icon.svg" class="px-6 lg:px-10" alt="file-icon">

                                    Terms & <br>Conditions</button>
                                <button type="button" @click="showPrivacy"
                                    class="bg-[#005C53] shadow-xl items-center justify-center text-[#A2C02D] w-1/3 lg:text-base lg:font-semibold text-xs h-full lg:w-full rounded-lg py-3 px-2 hover:bg-[#004a43] transition-all duration-300">
                                    <img src="/icons/lock-icon.svg" class="px-6 lg:px-10" alt="lock-icon">

                                    Privacy <br>Policies</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="">
                    <button type="submit" 
                        :disabled="isSubmitting"
                        class="bg-[#A2C02D] mt-5 text-white text-lg font-bold rounded-xl h-full w-full p-10 hover:bg-[#8da825] transition-all duration-300 disabled:opacity-50">
                        {{ isSubmitting ? 'Création en cours...' : 'Créer mon compte' }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

definePageMeta({
    layout: 'auth-layout'
});

const formData = reactive({
    fullName: '',
    birthDate: '',
    city: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    idCardFront: null,
    idCardBack: null,
    idNumber: '',
    expiryDate: ''
});

const errors = reactive({});
const isSubmitting = ref(false);
const frontIdInput = ref(null);
const backIdInput = ref(null);

const validateForm = () => {
    errors.value = {};
    let isValid = true;

    // Basic validation
    if (!formData.fullName) {
        errors.fullName = 'Le nom complet est requis';
        isValid = false;
    }

    if (!formData.email) {
        errors.email = 'L\'email est requis';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Format d\'email invalide';
        isValid = false;
    }

    if (!formData.phone) {
        errors.phone = 'Le numéro de téléphone est requis';
        isValid = false;
    }

    if (!formData.password) {
        errors.password = 'Le mot de passe est requis';
        isValid = false;
    } else if (formData.password.length < 8) {
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Les mots de passe ne correspondent pas';
        isValid = false;
    }

    if (!formData.idCardFront) {
        errors.idCardFront = 'La photo recto de la CNI est requise';
        isValid = false;
    }

    if (!formData.idCardBack) {
        errors.idCardBack = 'La photo verso de la CNI est requise';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    isSubmitting.value = true;
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form submitted:', formData);
        // Reset form after successful submission
        Object.keys(formData).forEach(key => formData[key] = '');
        alert('Compte créé avec succès!');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
        isSubmitting.value = false;
    }
};

const triggerFileInput = (type) => {
    if (type === 'front') {
        frontIdInput.value.click();
    } else {
        backIdInput.value.click();
    }
};

const handleFileSelect = (event, type) => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5000000) { // 5MB limit
            alert('Le fichier est trop volumineux. Maximum 5MB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (type === 'front') {
                formData.idCardFront = e.target.result;
            } else {
                formData.idCardBack = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
};

const handleFileDrop = (event, type) => {
    const file = event.dataTransfer.files[0];
    if (file) {
        if (file.size > 5000000) { // 5MB limit
            alert('Le fichier est trop volumineux. Maximum 5MB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (type === 'front') {
                formData.idCardFront = e.target.result;
            } else {
                formData.idCardBack = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
};

const showLegalTies = () => {
    alert('Legal Ties content');
};

const showTerms = () => {
    alert('Terms & Conditions content');
};

const showPrivacy = () => {
    alert('Privacy Policy content');
};
</script>

<style scoped>
/* Add smooth transitions */
input, button {
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #A2C02D;
}

/* Improve responsive padding */
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