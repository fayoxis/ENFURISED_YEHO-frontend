<template>
    <div class="max-w-2xl mx-auto p-6 bg-white">
        <!-- Personal Information Section -->
        <h1 class="text-4xl font-bold mb-8 transition-all duration-300 hover:text-[#005C53]">
            Informations Personnelles
        </h1>

        <!-- Profile Photo Area -->
        <div class="mb-8 relative lg:space-x-15 flex flex-col lg:flex-row">
            <div class="w-full lg:w-1/2 h-full">
                <div class="w-2/3 h-full aspect-square rounded-full bg-gray-200 relative mb-2 ">
                    <transition name="fade">
                        <img v-if="profileImage" :src="profileImage" 
                             class="w-full h-full rounded-full object-cover transition-transform duration-300 hover:scale-105" />
                        <div v-else class="flex items-center justify-center h-full">
                            <span class="text-gray-500">Photo de profil</span>
                        </div>
                    </transition>
                    <div class="absolute flex-col bottom-5 justify-start -right-20 flex gap-2">
                        <button @click="triggerImageUpload"
                            class="text-[#005C53] bg-[#D9F9E9] text-xs font-semibold py-1 px-2 rounded-lg 
                                   hover:text-[#D9F9E9] hover:bg-[#005C53] transition-all duration-300">
                            Changer la Photo
                        </button>
                        <button v-if="profileImage" @click="deleteProfileImage"
                            class="text-[#005C53] bg-[#D9F9E9] text-xs font-semibold py-1 px-3 rounded-lg 
                                   hover:text-red-600 hover:bg-white transition-all duration-300">
                            Supprimer la photo
                        </button>
                    </div>
                </div>
            </div>
            <input type="file" ref="imageInput" @change="handleImageUpload" class="hidden" accept="image/*" />

            <div class="flex flex-col h-full space-y-5 w-full lg:w-1/2 justify-end">
                <div class="space-y-2">
                    <label class="block font-semibold text-black text-sm mb-1">Nom Complet</label>
                    <input type="text" v-model="formData.fullName" 
                           :class="[inputClasses, {'border-red-500': errors.fullName}]"
                           @input="validateField('fullName')">
                    <span v-if="errors.fullName" class="text-red-500 text-xs">{{ errors.fullName }}</span>
                </div>
                <div class="space-y-2">
                    <label class="block font-semibold text-sm mb-1 text-black">Ville de résidence</label>
                    <select v-model="formData.city" :class="[inputClasses, {'border-red-500': errors.city}]">
                        <option value="">Sélectionnez une ville</option>
                        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                    </select>
                    <span v-if="errors.city" class="text-red-500 text-xs">{{ errors.city }}</span>
                </div>
            </div>
        </div>

        <!-- Personal Details Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label class="block font-semibold text-sm mb-1 text-black">
                        Zone de Résidence (Quartier et secteur)
                    </label>
                    <input type="text" v-model="formData.residenceZone" 
                           :class="[inputClasses, {'border-red-500': errors.residenceZone}]">
                    <span v-if="errors.residenceZone" class="text-red-500 text-xs">{{ errors.residenceZone }}</span>
                </div>
                <div class="space-y-2">
                    <label class="block font-semibold text-sm text-black mb-1">Moyen de Locomotion</label>
                    <select v-model="formData.transportation" 
                            :class="[inputClasses, {'border-red-500': errors.transportation}]">
                        <option value="">Sélectionnez un moyen</option>
                        <option v-for="transport in transportationOptions" 
                                :key="transport" :value="transport">{{ transport }}</option>
                    </select>
                </div>
            </div>

            <!-- Contact Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-black mb-1">Adresse e-mail</label>
                    <input type="email" v-model="formData.email" 
                           :class="[inputClasses, {'border-red-500': errors.email}]"
                           @input="validateEmail">
                    <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
                </div>
                <div class="space-y-2">
                    <label class="block font-semibold text-sm mb-1">Numéro de téléphone</label>
                    <input type="tel" v-model="formData.phone" 
                           :class="[inputClasses, {'border-red-500': errors.phone}]"
                           @input="validatePhone">
                    <span v-if="errors.phone" class="text-red-500 text-xs">{{ errors.phone }}</span>
                </div>
            </div>

            <!-- Social Media -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-black mb-1">LinkedIn</label>
                    <input type="text" v-model="formData.linkedin" 
                           :class="[inputClasses, {'border-red-500': errors.linkedin}]"
                           @input="validateSocialMedia('linkedin')">
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-black mb-1">Contact WhatsApp</label>
                    <input type="tel" v-model="formData.whatsapp" 
                           :class="[inputClasses, {'border-red-500': errors.whatsapp}]"
                           @input="validatePhone">
                </div>
                <div class="space-y-2">
                    <label class="block font-semibold text-black text-sm mb-1">Facebook</label>
                    <input type="text" v-model="formData.facebook" 
                           :class="[inputClasses, {'border-red-500': errors.facebook}]"
                           @input="validateSocialMedia('facebook')">
                </div>
            </div>

            <!-- Password Management -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                    <label class="block text-black font-semibold text-sm mb-1">Mot de passe actuel</label>
                    <input type="password" v-model="formData.currentPassword" 
                           :class="[inputClasses, {'border-red-500': errors.currentPassword}]">
                    <span v-if="errors.currentPassword" class="text-red-500 text-xs">{{ errors.currentPassword }}</span>
                </div>
                <div class="space-y-2">
                    <label class="block font-semibold text-sm mb-1">Nouveau mot de passe</label>
                    <input type="password" v-model="formData.newPassword" 
                           :class="[inputClasses, {'border-red-500': errors.newPassword}]"
                           @input="validatePassword">
                    <span v-if="errors.newPassword" class="text-red-500 text-xs">{{ errors.newPassword }}</span>
                </div>
                <div class="space-y-2">
                    <label class="block font-semibold text-sm text-black mb-1">Confirmer le mot de passe</label>
                    <input type="password" v-model="formData.confirmPassword" 
                           :class="[inputClasses, {'border-red-500': errors.confirmPassword}]"
                           @input="validatePasswordConfirmation">
                    <span v-if="errors.confirmPassword" class="text-red-500 text-xs">{{ errors.confirmPassword }}</span>
                </div>
            </div>

            <!-- ID Card Section -->
            <div class="mt-8 space-y-3">
                <h2 class="text-3xl font-bold mb-4">Carte d'identité</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-black font-semibold mt-2">Carte Nationale d'identité (face)</p>
                        <div class="border-2 border-dashed border-[#8DAD9D] rounded-xl p-4 
                                  transition-all duration-300 hover:border-[#005C53]">
                            <div @click="triggerIdFrontUpload"
                                class="flex flex-col items-center justify-center min-h-[120px] cursor-pointer">
                                <transition name="fade">
                                    <div v-if="!idCardFront" class="text-center justify-center">
                                        <img src="/icons/upload-icon.svg" class="w-12 h-12 " alt="upload-icon" srcset="">

                                    </div>
                                    <img v-else :src="idCardFront" 
                                         class="max-w-full max-h-[120px] object-contain 
                                                transition-transform duration-300 hover:scale-105" />
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm text-black font-semibold mt-2">Carte Nationale d'identité (dos)</p>
                        <div class="border-2 border-dashed border-[#8DAD9D] rounded-xl p-4 
                                  transition-all duration-300 hover:border-[#005C53]">
                            <div @click="triggerIdBackUpload"
                                class="flex flex-col items-center justify-center min-h-[120px] cursor-pointer">
                                <transition name="fade">
                                    <div v-if="!idCardBack" class="text-center justify-center">
                                        <img src="/icons/upload-icon.svg" class="w-12 h-12 " alt="upload-icon" srcset="">
                                    </div>
                                    <img v-else :src="idCardBack" 
                                         class="max-w-full max-h-[120px] object-contain 
                                                transition-transform duration-300 hover:scale-105" />
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col lg:flex-row gap-4">
                    <div class="space-y-2 w-full">
                        <label class="block font-semibold text-black text-sm mb-1">Numero de CNI</label>
                        <input type="text" v-model="formData.numeroDeCni" 
                               :class="[inputClasses, {'border-red-500': errors.numeroDeCni}]"
                               @input="validateCNI">
                        <span v-if="errors.numeroDeCni" class="text-red-500 text-xs">{{ errors.numeroDeCni }}</span>
                    </div>
                    <div class="space-y-2 w-full">
                        <label class="block font-semibold text-sm text-black mb-1">Délivrance de CNI</label>
                        <Datepicker v-model="formData.deliveranceDeCNI" 
                                  :enableTimePicker="false"
                                  :format="'dd/MM/yyyy'"
                                  :maxDate="new Date()"
                                  autoApply
                                  class="w-full"
                                  :class="{'border-red-500': errors.deliveranceDeCNI}" />
                        <span v-if="errors.deliveranceDeCNI" class="text-red-500 text-xs">
                            {{ errors.deliveranceDeCNI }}
                        </span>
                    </div>
                </div>
                <input type="file" ref="idFrontInput" @change="handleIdFrontUpload" class="hidden" accept="image/*" />
                <input type="file" ref="idBackInput" @change="handleIdBackUpload" class="hidden" accept="image/*" />
            </div>

            <!-- Payment Methods -->
            <div class="mt-8">
                <h2 class="text-3xl font-bold mb-4">Moyens de paiements</h2>
                <p class="text-black font-bold">Informations de votre carte bancaire</p>
                <div class="space-y-4 mt-3">
                    <div class="lg:flex lg:space-x-3">
                        <div class="space-y-2 w-full">
                            <label class="block font-semibold text-black text-sm mb-1">
                                Titulaire de la carte bancaire
                            </label>
                            <input type="text" v-model="formData.cardHolder" 
                                   :class="[inputClasses, {'border-red-500': errors.cardHolder}]"
                                   @input="validateCardHolder">
                        </div>
                        <div class="space-y-2 w-full">
                            <label class="block font-semibold text-sm mb-1">Numéro de carte bancaire</label>
                            <input type="text" v-model="formData.cardNumber" 
                                   :class="[inputClasses, {'border-red-500': errors.cardNumber}]"
                                   @input="formatCardNumber"
                                   maxlength="19">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div class="space-y-2">
                            <label class="block font-semibold text-black text-sm mb-1">Code CVV</label>
                            <input type="text" v-model="formData.cvv" 
                                   :class="[inputClasses, {'border-red-500': errors.cvv}]"
                                   @input="validateCVV"
                                   maxlength="3">
                        </div>
                        <div class="space-y-2 w-full col-span-2">
                            <label class="block text-sm font-semibold text-black mb-1">Date d'expiration</label>
                            <input type="text" v-model="formData.expiryDate" 
                                   placeholder="MM/YY"
                                   :class="[inputClasses, {'border-red-500': errors.expiryDate}]"
                                   @input="formatExpiryDate"
                                   maxlength="5">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold mb-1">
                                <img src="/icons/profile/orange-money.svg" alt="Orange Money" class="h-4 inline mr-2">
                                Orange Money
                            </label>
                            <input type="text" v-model="formData.orangeMoney" 
                                   :class="[inputClasses, {'border-red-500': errors.orangeMoney}]"
                                   @input="validateMobileMoneyNumber">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm mb-1">
                                <img src="/icons/profile/mtn.svg" alt="MTN Mobile Money" 
                                     class="h-4 font-semibold inline mr-2">
                                MTN Mobile Money
                            </label>
                            <input type="text" v-model="formData.mtnMoney" 
                                   :class="[inputClasses, {'border-red-500': errors.mtnMoney}]"
                                   @input="validateMobileMoneyNumber">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 space-y-4">
                <button type="submit"
                    :disabled="isSubmitting || hasErrors"
                    :class="['w-full py-4 px-6 rounded-xl transition-all duration-300',
                            isSubmitting || hasErrors ? 
                            'bg-gray-400 cursor-not-allowed' : 
                            'bg-[#A2C02D] hover:bg-[#8DA825] text-white']">
                    <span v-if="isSubmitting" class="flex items-center justify-center">
                        <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <!-- Loading spinner SVG -->
                        </svg>
                        Enregistrement...
                    </span>
                    <span v-else>ENREGISTRER LES MODIFICATIONS</span>
                </button>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button type="button" @click="confirmDeleteAccount"
                        class="w-full p-3 text-[#F24405] border border-[#F24405] rounded-xl 
                               hover:bg-[#F24405]/20 transition-all duration-300">
                        Supprimer mon compte
                    </button>
                    <button type="button" @click="confirmStopAgent"
                        class="w-full p-3 text-[#F24405] border border-[#F24405] rounded-xl 
                               hover:bg-[#F24405]/20 transition-all duration-300">
                        Cesser d'être un agent
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useToast } from 'vue-toast-notification'

definePageMeta({
  layout: 'profile-layout'
});

// Types
interface FormData {
    fullName: string
    city: string
    residenceZone: string
    transportation: string
    email: string
    phone: string
    linkedin: string
    whatsapp: string
    facebook: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
    numeroDeCni: string
    deliveranceDeCNI: Date | null
    cardHolder: string
    cardNumber: string
    cvv: string
    expiryDate: string
    orangeMoney: string
    mtnMoney: string
}

interface FormErrors {
    [key: string]: string
}

// Constants
const cities = ['Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua']
const transportationOptions = ['Voiture', 'Moto', 'Taxi', 'Transport en commun', 'À pied']
const toast = useToast()

// Refs
const formData = ref<FormData>({
    fullName: '',
    city: '',
    residenceZone: '',
    transportation: '',
    email: '',
    phone: '',
    linkedin: '',
    whatsapp: '',
    facebook: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    numeroDeCni: '',
    deliveranceDeCNI: null,
    cardHolder: '',
    cardNumber: '',
    cvv: '',
    expiryDate: '',
    orangeMoney: '',
    mtnMoney: '',
})

const errors = ref<FormErrors>({})
const isSubmitting = ref(false)
const profileImage = ref<string | null>(null)
const idCardFront = ref<string | null>(null)
const idCardBack = ref<string | null>(null)
const imageInput = ref<HTMLInputElement | null>(null)
const idFrontInput = ref<HTMLInputElement | null>(null)
const idBackInput = ref<HTMLInputElement | null>(null)

// Input Classes
const inputClasses = 'w-full p-2 rounded-lg shadow-xl border transition-colors duration-300 focus:border-[#005C53] focus:ring-1 focus:ring-[#005C53] outline-none'

// Computed
const hasErrors = computed(() => Object.keys(errors.value).length > 0)

// Validation Functions
const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.value.email)) {
        errors.value.email = 'Adresse email invalide'
    } else {
        delete errors.value.email
    }
}

const validatePhone = (field: 'phone' | 'whatsapp' = 'phone') => {
    const phoneRegex = /^(\+237|237)?[2368]\d{8}$/
    const value = formData.value[field]
    if (!phoneRegex.test(value)) {
        errors.value[field] = 'Numéro de téléphone invalide'
    } else {
        delete errors.value[field]
    }
}

const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (formData.value.newPassword && !passwordRegex.test(formData.value.newPassword)) {
        errors.value.newPassword = 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre'
    } else {
        delete errors.value.newPassword
    }
    validatePasswordConfirmation()
}

const validatePasswordConfirmation = () => {
    if (formData.value.newPassword !== formData.value.confirmPassword) {
        errors.value.confirmPassword = 'Les mots de passe ne correspondent pas'
    } else {
        delete errors.value.confirmPassword
    }
}

const validateCNI = () => {
    const cniRegex = /^[0-9]{9}$/
    if (!cniRegex.test(formData.value.numeroDeCni)) {
        errors.value.numeroDeCni = 'Numéro de CNI invalide'
    } else {
        delete errors.value.numeroDeCni
    }
}

const validateCardNumber = () => {
    const cardNumberRegex = /^[0-9]{16}$/
    if (!cardNumberRegex.test(formData.value.cardNumber.replace(/\s/g, ''))) {
        errors.value.cardNumber = 'Numéro de carte invalide'
    } else {
        delete errors.value.cardNumber
    }
}

const formatCardNumber = () => {
    formData.value.cardNumber = formData.value.cardNumber
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
    validateCardNumber()
}

const validateCVV = () => {
    const cvvRegex = /^[0-9]{3}$/
    if (!cvvRegex.test(formData.value.cvv)) {
        errors.value.cvv = 'CVV invalide'
    } else {
        delete errors.value.cvv
    }
}

const formatExpiryDate = () => {
    let value = formData.value.expiryDate.replace(/\D/g, '')
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2)
    }
    formData.value.expiryDate = value

    const [month, year] = value.split('/')
    if (month && parseInt(month) > 12) {
        errors.value.expiryDate = 'Mois invalide'
    } else if (value.length === 5) {
        const currentYear = new Date().getFullYear() % 100
        const expiryYear = parseInt(year)
        if (expiryYear < currentYear) {
            errors.value.expiryDate = 'Carte expirée'
        } else {
            delete errors.value.expiryDate
        }
    }
}

// File Handling Functions
const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]
        if (validateImageFile(file)) {
            const reader = new FileReader()
            reader.onload = (e) => {
                profileImage.value = e.target?.result as string
            }
            reader.readAsDataURL(file)
        }
    }
}

const handleIdFrontUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]
        if (validateImageFile(file)) {
            const reader = new FileReader()
            reader.onload = (e) => {
                idCardFront.value = e.target?.result as string
            }
            reader.readAsDataURL(file)
        }
    }
}

const handleIdBackUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]
        if (validateImageFile(file)) {
            const reader = new FileReader()
            reader.onload = (e) => {
                idCardBack.value = e.target?.result as string
            }
            reader.readAsDataURL(file)
        }
    }
}

const validateImageFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

    if (!allowedTypes.includes(file.type)) {
        toast.error('Format de fichier non supporté. Utilisez JPG ou PNG.')
        return false
    }

    if (file.size > maxSize) {
        toast.error('La taille du fichier ne doit pas dépasser 5MB.')
        return false
    }

    return true
}

// Trigger Functions
const triggerImageUpload = () => imageInput.value?.click()
const triggerIdFrontUpload = () => idFrontInput.value?.click()
const triggerIdBackUpload = () => idBackInput.value?.click()

const deleteProfileImage = () => {
    profileImage.value = null
    if (imageInput.value) imageInput.value.value = ''
}

// Form Submission
const validateForm = (): boolean => {
    errors.value = {}
    
    // Required fields validation
    const requiredFields = ['fullName', 'city', 'email', 'phone']
    requiredFields.forEach(field => {
        if (!formData.value[field as keyof FormData]) {
            errors.value[field] = 'Ce champ est requis'
        }
    })

    // Run all validations
    validateEmail()
    validatePhone()
    if (formData.value.newPassword) validatePassword()
    if (formData.value.numeroDeCni) validateCNI()
    if (formData.value.cardNumber) validateCardNumber()
    if (formData.value.cvv) validateCVV()

    return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
    if (!validateForm()) {
        toast.error('Veuillez corriger les erreurs du formulaire')
        return
    }

    isSubmitting.value = true
    try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
        toast.success('Modifications enregistrées avec succès')
    } catch (error) {
        toast.error('Une erreur est survenue')
        console.error(error)
    } finally {
        isSubmitting.value = false
    }
}

// Confirmation Dialogs
const confirmDeleteAccount = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
        // Handle account deletion
        toast.info('Fonctionnalité en cours de développement')
    }
}

const confirmStopAgent = () => {
    if (confirm('Êtes-vous sûr de vouloir cesser d\'être un agent ?')) {
        // Handle agent status change
        toast.info('Fonctionnalité en cours de développement')
    }
}

// Load initial data
onMounted(async () => {
    try {
        // Load user data from API
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        // Set formData.value = response.data
    } catch (error) {
        toast.error('Erreur lors du chargement des données')
        console.error(error)
    }
})
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

/* Custom styling for Datepicker */
:deep(.dp__input) {
    @apply w-full p-2 rounded-lg shadow-xl border transition-colors duration-300;
}

:deep(.dp__input:focus) {
    @apply border-[#005C53] ring-1 ring-[#005C53] outline-none;
}

/* Add loading spinner animation */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>