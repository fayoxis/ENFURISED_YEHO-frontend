<template>
    <div class="lg:px-20 mx-auto justify-center py-5 px-0 md:px-4">
        <div class=" container mx-auto justify-center px-0 mb-12 w-full lg:w-2/3">
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-black">
                VOUS ETES PRET A FAIRE LE <span class="text-[#2FAC66]">GRAND PAS </span>?
            </h1>
            <p class="text-[#8DAD9D] lg:w-2/3 text-sm sm:text-base">
                Discover the endless possibilities of a real estate career. Enjoy the
                flexibility, financial rewards, and the satisfaction of helping people
                achieve their dreams.
            </p>
        </div>

        <form @submit.prevent="submitForm" class="container mx-auto px-0 space-y-5 sm:px-4 lg:w-5/6">
            <!-- Personal Information Section -->
            <div class="mb-10 space-y-10 w-full">
                <div class="w-3/4 mb-4">
                    <h2 class="text-lg font-bold text-black mb-4">Informations Personnelles</h2>
                    <div class="border border-black w-1/5"></div>
                </div>

                <!-- First Row -->
                <div class="flex w-full flex-col lg:h-3/4 sm:flex-row gap-4 mb-4">
                    <div class="w-full lg:w-1/2 space-y-2 sm:w-1/3 relative">
                        <label class="absolute -top-2 left-2  px-1 text-xs text-black">Nom Complet</label>
                        <input v-model="formData.fullName" type="text"
                            class="w-full px-4 py-3 bg-white shadow-xl rounded-xl text-black"
                            :class="{ 'border-red-500': errors.fullName }">
                        <span v-if="errors.fullName" class="text-red-500 text-xs">{{ errors.fullName }}</span>
                    </div>

                    <div class="w-full space-y-2 lg:w-1/3 sm:w-[200px] relative">
                        <label class="absolute -top-2 left-2 px-1 text-xs text-black">Date de Naissance</label>
                        <input v-model="formData.birthDate" type="date"
                            class="w-full px-4 py-3 bg-white shadow-xl rounded-xl text-black"
                            :class="{ 'border-red-500': errors.birthDate }">
                    </div>

                    <div class="w-full space-y-2 sm:w-1/3 relative">
                        <label class="absolute -top-2 left-2  px-1 text-xs text-black">Nationalité</label>
                        <select v-model="formData.nationality"
                            class="w-full px-4 py-3 bg-white shadow-xl rounded-xl appearance-none text-black">
                            <option v-for="nationality in nationalities" :key="nationality" :value="nationality">
                                {{ nationality }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Second Row -->
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="w-full space-y-2 sm:w-[250px] relative">
                        <label class="absolute -top-2 left-2 px-1 text-xs text-black">Ville</label>
                        <select v-model="formData.city"
                            class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl appearance-none text-black">
                            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                        </select>
                    </div>

                    <div class="flex-1 space-y-2 relative">
                        <label class="absolute -top-2 left-2 px-1 text-xs text-black">Zone de Résidence</label>
                        <input v-model="formData.residenceZone" type="text"
                            class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black">
                    </div>

                    <div class="w-full space-y-2 sm:w-[250px] relative">
                        <label class="absolute -top-2 left-2  px-1 text-xs text-black">Moyen de Transport</label>
                        <select v-model="formData.transport"
                            class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl appearance-none text-black">
                            <option value="car">Voiture</option>
                            <option value="motorcycle">Moto</option>
                            <option value="other">Autre</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Professional Information Section -->
            <div class="mb-10 space-y-10">

                <div class="lg:w-2/3 mb-4">
                    <h2 class="text-xs font-bold text-black mb-4">Informations Professionnelles</h2>
                    <div class="border border-black w-1/6"></div>
                </div>

                <div class="flex flex-col lg:flex-row gap-4">
                    <div class="w-full lg:w-2/3 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                        <!-- ID Card Front -->
                        <div class="w-full h-full">
                            <div @click="triggerFileInput('front')" @dragover.prevent
                                @drop.prevent="handleFileDrop($event, 'front')"
                                class="border-2 border-dashed border-[#8DAD9D]  rounded-xl h-[150px] md:h-[180] lg:h-[200px] flex items-center justify-center cursor-pointer shadow-xl">
                                <input type="file" ref="frontIdInput" class="hidden"
                                    @change="handleFileSelect($event, 'front')" accept="image/*">
                                <div v-if="!formData.idCardFront" class="text-center">
                                    <img src="/icons/upload-icon.svg" class="w-12 h-12" alt="" srcset="">
                                </div>
                                <img v-else :src="formData.idCardFront" class="h-full w-full object-cover rounded-md">
                            </div>
                        </div>

                        <!-- ID Card Back -->
                        <div class="w-full">
                            <div @click="triggerFileInput('back')" @dragover.prevent
                                @drop.prevent="handleFileDrop($event, 'back')"
                                class="border-2 border-dashed border-[#8DAD9D] rounded-xl h-[150px] md:h-[180] lg:h-[200px] flex items-center justify-center cursor-pointer shadow-xl">
                                <input type="file" ref="backIdInput" class="hidden"
                                    @change="handleFileSelect($event, 'back')" accept="image/*">
                                <div v-if="!formData.idCardBack" class="text-center">
                                    <img src="/icons/upload-icon.svg" class="w-12 h-12" alt="" srcset="">
                                </div>
                                <img v-else :src="formData.idCardBack" class="h-full w-full object-cover rounded-md">
                            </div>
                        </div>
                    </div>

                    <div class="flex-col w-full lg:space-y-20 lg:w-1/2">
                        <div class="w-full flex flex-col sm:flex-row gap-4">
                            <div class="relative w-full space-y-2 flex-1">
                                <label class="absolute -top-2 left-2  px-1 text-xs text-black">Numéro de CNI</label>
                                <input v-model="formData.cniNumber" type="text"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black">
                            </div>
                            <div class="relative lg:w-1/2 space-y-2">
                                <label class="absolute -top-2 left-2  px-1 text-xs text-black">Date d'expiration</label>
                                <input v-model="formData.cniExpiry" type="date"
                                    class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black">
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row w-full space-y-5 sm:space-y-0 gap-4 mt-4">
                            <div class="relative w-full space-y-2 flex-1">
                                <label class="absolute -top-2 left-2 px-1 text-xs text-black">Expérience</label>
                                <input v-model="formData.experience" type="number"
                                    class="w-full h-5/6 px-4 py-3 bg-white shadow-xl rounded-xl text-black">
                            </div>
                            <div class="flex pt-2 lg:w-1/2">
                                <input type="file" ref="cvInput" class="hidden" @change="handleCVUpload"
                                    accept=".pdf,.doc,.docx">
                                <button @click="triggerCVInput"
                                    class="w-full text-xs bg-[#8DAD9D] text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xl">
                                    <img src="/icons/pdf-icon.svg" class="w-8 h-8" alt="pdf" srcset="">
                                    TELECHARGER LE FICHIER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Details Section -->
            <div class="mb-10">

                <div class="lg:w-2/3 mb-4">
                    <h2 class="text-xs text-black font-bold mb-4">Détails Supplémentaires</h2>
                    <div class="border border-black w-1/6"></div>
                </div>
                <div class="flex flex-col lg:flex-row gap-4">
                    <div class="flex flex-col space-y-5 w-full lg:w-1/2">
                        <div class="relative space-y-2 flex-1">
                            <label class="absolute -top-2 left-2 px-1 text-xs text-black">Téléphone</label>
                            <input v-model="formData.phone" type="tel"
                                class="w-full px-4 py-3 bg-white h-full shadow-xl rounded-xl text-black">
                        </div>

                        <div class="relative space-y-2 flex-1">
                            <label class="absolute -top-2 left-2  px-1 text-xs text-black">Email</label>
                            <input v-model="formData.email" type="email"
                                class="w-full h-full px-4 py-3 bg-white shadow-xl rounded-xl text-black">
                        </div>
                    </div>

                    <div class="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2">
                        <div class="relative space-y-2 w-full">
                            <label class="absolute -top-2 left-2  px-1 text-xs text-black">Détails additionnels</label>
                            <textarea v-model="formData.additionalDetails"
                                class="w-full h-32 lg:h-full resize-none px-4 py-3 bg-white shadow-xl rounded-md text-black"></textarea>
                        </div>

                        <!-- Submit Section -->
                        <div class="w-full lg:w-auto ">
                            <button type="submit"
                                class="w-full lg:p-10 bg-[#A2C02D] text-white py-5 rounded-xl text-lg font-medium mb-4 shadow-xl"
                                :disabled="isSubmitting">
                                {{ isSubmitting ? 'ENVOI EN COURS...' : 'POSTULER' }}
                            </button>

                            <div class="flex items-center gap-2">
                                <input v-model="formData.termsAccepted" type="checkbox"
                                    class="w-4 h-4 rounded border-gray-300">
                                <span class="text-xs text-gray-500">Je lu et j'accepte les termes et conditions de ce
                                    site web</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formData = reactive({
    fullName: '',
    birthDate: '',
    nationality: '',
    city: '',
    residenceZone: '',
    transport: '',
    idCardFront: null,
    idCardBack: null,
    cniNumber: '',
    cniExpiry: '',
    experience: '',
    cv: null,
    phone: '',
    email: '',
    additionalDetails: '',
    termsAccepted: false
})

const errors = reactive({})
const isSubmitting = ref(false)

const frontIdInput = ref(null)
const backIdInput = ref(null)
const cvInput = ref(null)

const nationalities = ['Marocaine', 'Française', 'Autre']
const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger']

function triggerFileInput(type) {
    if (type === 'front') frontIdInput.value.click()
    else if (type === 'back') backIdInput.value.click()
}

function triggerCVInput() {
    cvInput.value.click()
}

function handleFileSelect(event, type) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        if (type === 'front') formData.idCardFront = e.target.result
        else if (type === 'back') formData.idCardBack = e.target.result
    }
    reader.readAsDataURL(file)
}

function handleFileDrop(event, type) {
    const file = event.dataTransfer.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        if (type === 'front') formData.idCardFront = e.target.result
        else if (type === 'back') formData.idCardBack = e.target.result
    }
    reader.readAsDataURL(file)
}

function handleCVUpload(event) {
    const file = event.target.files[0]
    if (!file) return
    formData.cv = file
}

function validateForm() {
    errors.fullName = !formData.fullName ? 'Le nom est requis' : ''
    // Add other validation rules
    return Object.values(errors).every(error => !error)
}

async function submitForm() {
    if (!validateForm()) return

    isSubmitting.value = true
    try {
        // Create FormData object for file upload
        const formDataToSubmit = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSubmit.append(key, value)
        })

        // Submit the form (replace with your API endpoint)
        const response = await fetch('/api/submit-application', {
            method: 'POST',
            body: formDataToSubmit
        })

        if (!response.ok) throw new Error('Submission failed')

        // Handle success
        alert('Formulaire soumis avec succès!')
    } catch (error) {
        console.error('Error submitting form:', error)
        alert('Une erreur est survenue lors de la soumission du formulaire')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
input,
select,
textarea {
    outline: none;
}

input::placeholder,
select::placeholder,
textarea::placeholder {
    color: #9CA3AF;
}

.shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>