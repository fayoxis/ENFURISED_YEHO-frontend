<template>
    <div class="search-container">
        <div class="blur-background"></div>
        <div class="search-wrapper">
            <!-- Search Input with Icon -->
            <div class="search-input-group">
                <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    v-model="searchState.query"
                    placeholder="Aujourd'hui, nous cherchons..."
                    class="search-input"
                    @input="emitSearchUpdate"
                />
            </div>

            <!--  Category Select -->
            <div class="select-wrapper">
                <select 
                    v-model="searchState.category" 
                    class="category-select" 
                    @change="handleCategoryChange"
                >
                    <option value="">Tous les sites</option>
                    <optgroup v-for="(options, group) in categoryGroups" 
                             :key="group" 
                             :label="group">
                        <option v-for="option in options" 
                                :key="option.value" 
                                :value="option.value">
                            {{ option.label }}
                        </option>
                    </optgroup>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" class="select-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <!-- Location Button -->
            <button 
                @click="handleLocation" 
                class="location-button" 
                :class="{ 'active': searchState.isLocationActive }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="location-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ searchState.location ? 'Localisation activée' : 'Plus proche de vous' }}</span>
            </button>

            <!-- Date Picker -->
            <div v-if="showDatePicker" class="date-picker-wrapper">
                <button 
                    @click="toggleDatePicker" 
                    class="date-button" 
                    ref="datePickerButton"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ formatDateRange }}</span>
                </button>
            </div>

            <!-- Search Button -->
            <button 
                @click="handleSearch" 
                :disabled="!isValidSearch"
                class="search-button"
                :class="{ 'disabled': !isValidSearch }"
            >
                <span>Rechercher</span>
            </button>
        </div>

        <!-- Calendar Modal -->
        <Teleport to="body">
            <div v-if="isDatePickerOpen" 
                 class="calendar-modal"
                 @click="handleModalClick">
                <div 
                    class="calendar-content"
                    ref="calendarContent"
                    @click.stop
                >
                    <button class="close-button" @click="closeDatePicker">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <DatePicker
                        v-model="searchState.dateRange"
                        is-range
                        :min-date="new Date()"
                        :masks="dateMasks"
                        :attributes="calendarAttributes"
                        @dayclick="handleDayClick"
                        class="custom-calendar"
                    />
                    <div class="calendar-actions">
                        <button 
                            class="calendar-action-button cancel" 
                            @click="closeDatePicker"
                        >
                            Annuler
                        </button>
                        <button 
                            class="calendar-action-button confirm" 
                            @click="confirmDateSelection"
                            :disabled="!isValidDateRange"
                        >
                            Confirmer
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
    name: 'SearchBar',
    components: {
        DatePicker
    },
    props: {
        initialState: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['search', 'update:searchState'],
    setup(props, { emit }) {
        // Reactive state
        const searchState = reactive({
            query: '',
            category: '',
            location: null,
            isLocationActive: false,
            dateRange: {
                start: null,
                end: null
            }
        });

        // UI state
        const isDatePickerOpen = ref(false);
        const datePickerButton = ref(null);
        const calendarContent = ref(null);
        const isMobile = ref(true); // Default to true for mobile-first approach

        // Check if we're in browser environment
        const isClient = typeof window !== 'undefined';
        // Category groups configuration
        const categoryGroups = {
            'Hébergement': [
                { value: 'house', label: 'Maison' },
                { value: 'apartment', label: 'Appartement' },
                { value: 'villa', label: 'Villa' },
                { value: 'hotel', label: 'Hôtel' },
                { value: 'resort', label: 'Resort' }
            ],
            'Evénementiel': [
                { value: 'event_hall', label: 'Salle des fêtes' },
                { value: 'conference', label: 'Salle de conférence' },
                { value: 'wedding_venue', label: 'Lieu de mariage' },
                { value: 'exhibition', label: 'Salle d\'exposition' }
            ],
            'Professional': [
                { value: 'office', label: 'Bureau' },
                { value: 'store', label: 'Commerce' },
                { value: 'warehouse', label: 'Entrepôt' }
            ],
            'Location': [
                { value: 'short_term', label: 'Court terme' },
                { value: 'long_term', label: 'Long terme' },
                { value: 'seasonal', label: 'Saisonnier' }
            ]
        };

        // Computed properties
        const showDatePicker = computed(() => {
            const dateRequiredCategories = [
                'short_term', 'long_term', 'seasonal',
                'hotel', 'resort', 'event_hall',
                'conference', 'wedding_venue', 'exhibition'
            ];
            return dateRequiredCategories.includes(searchState.category);
        });

        const isValidDateRange = computed(() => {
            return searchState.dateRange.start && searchState.dateRange.end;
        });

        const isValidSearch = computed(() => {
            if (!searchState.query.trim()) return false;
            if (!searchState.category) return false;
            if (showDatePicker.value && !isValidDateRange.value) return false;
            return true;
        });

        const formatDateRange = computed(() => {
            if (!searchState.dateRange.start && !searchState.dateRange.end) {
                return 'Sélectionner des dates';
            }
            const formatDate = (date) => {
                if (!date) return '';
                return new Date(date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short'
                });
            };
            return `${formatDate(searchState.dateRange.start)} - ${formatDate(searchState.dateRange.end)}`;
        });

        // Methods
        const handleCategoryChange = () => {
            if (!showDatePicker.value) {
                searchState.dateRange = { start: null, end: null };
                isDatePickerOpen.value = false;
            }
            emitSearchUpdate();
        };

        const handleLocation = async () => {
            try {
                if (navigator.geolocation) {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    
                    searchState.location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    searchState.isLocationActive = true;
                    emitSearchUpdate();
                }
            } catch (error) {
                console.error('Geolocation error:', error);
                searchState.isLocationActive = false;
                searchState.location = null;
            }
        };

        const toggleDatePicker = () => {
            isDatePickerOpen.value = !isDatePickerOpen.value;
        };

        const closeDatePicker = () => {
            isDatePickerOpen.value = false;
        };

        const confirmDateSelection = () => {
            if (isValidDateRange.value) {
                closeDatePicker();
                emitSearchUpdate();
            }
        };

        const handleModalClick = (event) => {
            if (event.target.classList.contains('calendar-modal')) {
                closeDatePicker();
            }
        };

        const handleDayClick = () => {
            emitSearchUpdate();
        };

        const handleSearch = () => {
            if (isValidSearch.value) {
                emit('search', { ...searchState });
            }
        };

        const emitSearchUpdate = () => {
            emit('update:searchState', { ...searchState });
        };

        // Lifecycle hooks
        onMounted(() => {
            // Initialize with props if provided
            Object.assign(searchState, props.initialState);
            
            // Handle window resize
            const handleResize = () => {
                isMobile.value = window.innerWidth < 768;
            };
            window.addEventListener('resize', handleResize);
            
            // Handle escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape' && isDatePickerOpen.value) {
                    closeDatePicker();
                }
            };
            document.addEventListener('keydown', handleEscape);
            
            onUnmounted(() => {
                window.removeEventListener('resize', handleResize);
                document.removeEventListener('keydown', handleEscape);
            });
        });

        return {
            searchState,
            isDatePickerOpen,
            datePickerButton,
            calendarContent,
            isMobile,
            categoryGroups,
            showDatePicker,
            isValidDateRange,
            isValidSearch,
            formatDateRange,
            handleCategoryChange,
            handleLocation,
            toggleDatePicker,
            closeDatePicker,
            confirmDateSelection,
            handleModalClick,
            handleDayClick,
            handleSearch,
            dateMasks: {
                input: 'DD/MM/YYYY',
                data: 'YYYY-MM-DD'
            },
            calendarAttributes: computed(() => [{
                key: 'range',
                dates: searchState.dateRange,
                highlight: {
                    start: { fillMode: 'light' },
                    base: { fillMode: 'light' },
                    end: { fillMode: 'light' }
                }
            }])
        };
    }
};
</script>

<style scoped>
.calendar-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.calendar-content {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
}

.close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
}

.close-button:hover {
    color: #000;
}

.calendar-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
}

.calendar-action-button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.calendar-action-button.cancel {
    background: #f3f4f6;
    color: #374151;
}

.calendar-action-button.cancel:hover {
    background: #e5e7eb;
}

.calendar-action-button.confirm {
    background: #023701;
    color: white;
}

.calendar-action-button.confirm:hover {
    background: #1a1a1a;
}

.calendar-action-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.calendar-dropdown {
    position: fixed;
    z-index: 1000;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

:deep(.vc-container) {
    border: none;
    font-family: inherit;
}

:deep(.vc-day-content) {
    height: 32px !important;
    width: 32px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    transition: all 0.2s ease;
}

:deep(.vc-day-content:hover) {
    background-color: #f3f4f6 !important;
    border-radius: 50%;
}

:deep(.vc-highlight) {
    background-color: #87eac9 !important;
    border-radius: 50%;
}

:deep(.vc-highlight-base-start),
:deep(.vc-highlight-base-end) {
    background-color: #87eac9 !important;
    border-radius: 50%;
}

:deep(.vc-day.is-not-in-month) {
    opacity: 0.3;
}

.search-container {
    @apply relative w-full max-w-7xl mx-auto px-4 py-6;
}

.blur-background {
    @apply absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl;
}

.search-wrapper {
    @apply relative flex flex-col md:flex-row items-center gap-3 p-4 bg-white/50 rounded-xl shadow-lg backdrop-blur-sm;
}

.search-input-group {
    @apply relative flex-1 min-w-[200px];
}

.search-icon {
    @apply absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600;
}

.search-input {
    @apply w-full pl-10 pr-4 py-3 text-gray-800 bg-white/50 border border-gray-200 rounded-lg 
    focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300;
}

.select-wrapper {
    @apply relative min-w-[180px];
}

.category-select {
    @apply w-full appearance-none pl-4 pr-10 py-3 bg-white/50 border border-gray-200 rounded-lg 
    text-gray-700 cursor-pointer focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300;
}

.category-select optgroup {
    @apply font-semibold bg-white;
}

.category-select option {
    @apply py-1 px-2;
}

.select-icon {
    @apply absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none;
}

.location-button {
    @apply flex items-center gap-2 px-4 py-3 text-gray-600 bg-white/50 border border-gray-200 
    rounded-lg hover:bg-gray-100 transition-all duration-300;
}

.location-button.active {
    @apply text-green-600 bg-green-50 border-green-200;
}

.location-icon {
    @apply w-5 h-5;
}

.date-picker-wrapper {
    @apply relative min-w-[220px];
}

.date-button {
    @apply flex items-center gap-2 w-full px-4 py-3 text-gray-600 bg-white/50 border border-gray-200 
    rounded-lg hover:bg-gray-100 transition-all duration-300;
}

.calendar-dropdown {
    @apply absolute top-full mt-2 z-50 bg-white rounded-lg shadow-xl border border-gray-200;
}

.custom-calendar {
    @apply p-2;
}

.calendar-icon {
    @apply w-5 h-5;
}

.search-button {
    @apply px-8 py-3 text-white bg-green-900 rounded-lg shadow-md hover:bg-green-600 
    transition-all duration-300 font-semibold min-w-[120px];
}

@media (max-width: 768px) {
    .search-wrapper {
        @apply space-y-3;
    }
    
    .search-input-group,
    .select-wrapper,
    .location-button,
    .date-picker-wrapper,
    .search-button {
        @apply w-full;
    }

    .calendar-dropdown {
        @apply left-1/2 -translate-x-1/2 w-[90vw]  max-w-[400px];
    }
}


/* Mobile-specific styles */
@media (max-width: 767px) {
    .calendar-dropdown {
        border-radius: 12px;
        background: white;
        padding: 8px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    }

    :deep(.vc-container) {
        width: 100% !important;
        max-width: none !important;
    }

    :deep(.vc-weeks) {
        padding: 0 !important;
    }

    :deep(.vc-day) {
        padding: 2px !important;
    }

    :deep(.vc-day-content) {
        width: 28px !important;
        height: 28px !important;
        font-size: 14px !important;
    }
}

/* Add backdrop for mobile */
.calendar-dropdown::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
}

/*  calendar appearance */
:deep(.vc-container) {
    border: none;
    font-family: inherit;
}

</style>
