<template>
  <div class="card-container" :class="{ 'expanded': isExpanded }">
    <div class="card-content" @click="toggleExpand">
      <!-- Header with new status indicator -->
      <div class="card-header">
        <h2 class="title">{{ studioData.title }}</h2>
        <span class="status-badge" :class="getStatusClass">
          {{ getStatusText }}
        </span>
      </div>

      <!-- Date Section with improved styling -->
      <div class="date-section">
        <div class="dates">
          <div class="date-label">
            <i class="fas fa-calendar-alt mr-2"></i>
            Ouverture du dossier:
          </div>
          <div class="date-label">
            <i class="fas fa-hourglass-end mr-2"></i>
            Limite de traitement:
          </div>
        </div>
        <div class="date-values">
          <div>{{ formatDate(studioData.openingDate) }}</div>
          <div class="deadline" :class="{ 'urgent': isDeadlineNear }">
            {{ formatDate(studioData.deadline) }}
          </div>
        </div>
      </div>

      <!-- Stats Grid with hover effects -->
      <div class="stats-grid">
        <div class="stat-item" v-for="(stat, index) in stats" :key="index">
          <div class="stat-icon">
            <i :class="stat.icon"></i>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </div>

      <!-- Price Section with animation -->
      <div class="price-section">
        <div class="budget-container">
          <div class="section-label">
            <i class="fas fa-wallet mr-2"></i>
            Fourchette budgetaire
          </div>
          <div class="budget-range">
            {{ formatPrice(studioData.budget.min) }} - {{ formatPrice(studioData.budget.max) }}
          </div>
        </div>
        <div class="location-container">
          <div class="section-label">
            <i class="fas fa-map-marker-alt mr-2"></i>
            Zone géographique
          </div>
          <div class="location">{{ studioData.location }}</div>
        </div>
      </div>

      <!-- Features with tags -->
      <div class="features-section" v-if="isExpanded">
        <div class="section-label">
          <i class="fas fa-tools mr-2"></i>
          Accessoires
        </div>
        <div class="features-tags">
          <span v-for="feature in studioData.features" 
                :key="feature" 
                class="feature-tag">
            {{ feature }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons" v-if="isExpanded">
        <button class="action-btn  bg-black text-white" @click.stop="$emit('edit')">
          <i class="fas fa-plus"></i> plus 
        </button>
        <button class="action-btn edit" @click.stop="$emit('edit')">
          <i class="fas fa-edit"></i> Modifier
        </button>
        <button class="action-btn share" @click.stop="shareProperty">
          <i class="fas fa-share"></i> Partager
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const props = defineProps({
  studioData: {
    type: Object,
    required: true
  }
});

const isExpanded = ref(false);

const stats = computed(() => [
  { label: 'Pièces', value: props.studioData.rooms, icon: 'fas fa-door-open' },
  { label: 'Chambres', value: props.studioData.bedrooms, icon: 'fas fa-bed' },
  { label: 'Douches', value: props.studioData.bathrooms, icon: 'fas fa-shower' }
]);

const getStatusClass = computed(() => {
  const daysUntilDeadline = getDaysUntilDeadline();
  if (daysUntilDeadline < 7) return 'status-urgent';
  if (daysUntilDeadline < 14) return 'status-warning';
  return 'status-normal';
});

const getStatusText = computed(() => {
  const days = getDaysUntilDeadline();
  return `${days} jours restants`;
});

const isDeadlineNear = computed(() => {
  return getDaysUntilDeadline() < 7;
});

function getDaysUntilDeadline() {
  const deadline = new Date(props.studioData.deadline);
  const today = new Date();
  const diffTime = deadline - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}

function formatDate(date) {
  return format(new Date(date), 'dd MMM yyyy', { locale: fr });
}

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: props.studioData.budget.currency
  }).format(price);
}

function shareProperty() {
  // Implement sharing functionality
  const shareData = {
    title: props.studioData.title,
    text: `${props.studioData.title} - ${props.studioData.location}`,
    url: window.location.href
  };
  
  if (navigator.share) {
    navigator.share(shareData)
      .catch((error) => console.log('Error sharing:', error));
  }
}
</script>

<style scoped>
.card-container {
  @apply max-w-sm border-2 border-[#8DAD9D] rounded-xl bg-white shadow-lg transition-all duration-300;
  transform-origin: center;
}

.card-content {
  @apply px-5 py-2 cursor-pointer;
}

.card-header {
  @apply flex justify-between items-center mb-2;
}

.title {
  @apply text-3xl font-bold text-black;
}

.status-badge {
  @apply px-3 py-1 rounded-full text-xs font-semibold;
}

.status-urgent {
  @apply bg-red-100 text-[#F24405] animate-pulse;
}

.status-warning {
  @apply bg-yellow-100 text-yellow-800;
}

.status-normal {
  @apply bg-green-100 text-green-800;
}

.date-section {
  @apply flex justify-between text-sm mb-6;
}

.dates {
  @apply space-y-2 text-black font-semibold;
}

.date-values {
  @apply text-right font-semibold text-[#2FAC66] space-y-2;
}

.deadline.urgent {
  @apply text-[#F24405] ;
}

.stats-grid {
  @apply grid grid-cols-3 gap-6 mb-6;
}

.stat-item {
  @apply flex flex-col items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50;
}

.stat-icon {
  @apply text-[#2FAC66] text-xl mb-2;
}

.stat-label {
  @apply text-sm font-semibold text-[#8DAD9D];
}

.stat-value {
  @apply text-2xl font-bold text-gray-900;
}

.price-section {
  @apply flex justify-between items-start mb-6;
}

.section-label {
  @apply text-xs font-bold text-[#8DAD9D] mb-1;
}

.budget-range, .location {
  @apply text-xs flex text-end justify-end font-bold text-black;
}

.features-section {
  @apply mt-4 animate-fade-in;
}

.features-tags {
  @apply flex flex-wrap gap-2 mt-2;
}

.feature-tag {
  @apply px-3 py-1 rounded-full bg-[#2FAC66] text-white text-sm font-semibold;
}

.action-buttons {
  @apply flex justify-end gap-2 mt-4 animate-fade-in;
}

.action-btn {
  @apply px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200;
}

.action-btn.edit {
  @apply bg-[#F24405] text-white hover:bg-[#7A9B8B];
}

.action-btn.share {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
}

.expanded {
  @apply shadow-xl -translate-y-1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@media (max-width: 640px) {
  .stats-grid {
    @apply gap-2;
  }
  
  .price-section {
    @apply flex-col space-y-4;
  }
  
  .action-buttons {
    @apply flex-col space-y-2;
  }
  
  .action-btn {
    @apply w-full text-center;
  }
}
</style>