<template>
  <div class="property-card">
    <!-- Image Carousel Section -->
    <div class="relative h-48 sm:h-56 md:h-64 lg:h-72">
      <div class="image-scroll-container" ref="scrollContainer">
        <div class="image-wrapper" :style="{ width: `${property.images.length * 100}%` }">
          <div v-for="(image, index) in property.images" :key="index" class="image-slide"
            :style="{ width: `${100 / property.images.length}%` }">
            <img :src="image" class="w-full h-full object-cover" :alt="`${property.category} - Image ${index + 1}`"
              loading="lazy">
          </div>
        </div>
      </div>

      <!-- Arrow Navigation -->
      <button @click.prevent="previousImage" class="nav-arrow left-2" v-show="currentImageIndex > 0">
        <i class="fas fa-chevron-left"></i>
      </button>

      <button @click.prevent="nextImage" class="nav-arrow right-2"
        v-show="currentImageIndex < property.images.length - 1">
        <i class="fas fa-chevron-right"></i>
      </button>

      <!-- Navigation Dots -->
      <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        <button v-for="(_, index) in property.images" :key="index" class="nav-dot"
          :class="{ 'active': currentImageIndex === index }" @click.prevent="scrollToImage(index)">
        </button>
      </div>

      <!-- Category Badge -->
      <div class="category-badge">
        <i class="fas" :class="getCategoryIcon"></i>
        {{ property.category }}
      </div>

      <!-- User Info -->
      <div class="user-info" @click.prevent="navigateToUserProfile(property.userId)">
        <img :src="property.userAvatar" :alt="property.userName" class="w-6 h-6 rounded-full object-cover">
        <span class="text-sm font-medium text-gray-800">{{ property.userName }}</span>
      </div>

      <!-- Favorite Button -->
      <button @click.prevent="toggleFavorite" class="favorite-button" :class="{ 'favorited': isFavorite }">
        <i :class="isFavorite ? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
      </button>
    </div>

    <!-- Property Details -->
    <div class="p-4 sm:p-5">
      <!-- Price Section -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-emerald-600 font-bold text-xl lg:text-2xl">
            {{ formatPrice(property.price) }} XAF
          </span>
          <span class="text-gray-500 text-sm">/ {{ property.period }}</span>
        </div>
      </div>

      <!-- Location -->
      <div class="location-info">
        <i class="fas fa-map-marker-alt"></i>
        <span class="text-sm">{{ property.location }}</span>
      </div>

      <!-- Features Grid -->
      <div class="features-grid">
        <div class="feature-item">
          <i class="fas fa-bed text-emerald-600"></i>
          <div class="text-emerald-600 font-semibold">{{ property.details.bedrooms }}</div>
          <div class="text-xs text-gray-600">Bedrooms</div>
        </div>
        <div class="feature-item">
          <i class="fas fa-bath text-emerald-600"></i>
          <div class="text-emerald-600 font-semibold">{{ property.details.bathrooms }}</div>
          <div class="text-xs text-gray-600">Bathrooms</div>
        </div>
        <div class="feature-item">
          <i class="fas fa-vector-square text-emerald-600"></i>
          <div class="text-emerald-600 font-semibold">{{ property.details.area }}</div>
          <div class="text-xs text-gray-600">m²</div>
        </div>
      </div>

      <!-- Description -->
      <p class="description">{{ property.description }}</p>

      <!-- Social Section -->
      <div class="social-section">
        <div class="likes-wrapper">
          <button @click.prevent="toggleLike" class="like-button" :class="{ 'liked': isLiked }">
            <i :class="isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
          </button>
          <div class="likers-info">
            <div class="likers-avatars">
              <img v-for="(liker, index) in property.topLikers.slice(0, 3)" :key="index" :src="liker.avatar"
                :alt="liker.name" class="w-6 h-6 rounded-full border-2 border-white">
            </div>
            <span class="text-sm text-gray-600">
              {{ property.likesCount }} likes
            </span>
          </div>
        </div>

        <button @click.prevent="toggleComments" class="comments-toggle" :class="{ 'active': showComments }">
          <i class="far fa-comment"></i>
          <span>{{ property.commentsCount }}</span>

        </button>
      </div>

      <!-- Comments Section -->
      <div v-show="showComments" class="comments-container">
        <div class="comments-list">
          <div v-for="(comment, index) in property.comments" :key="index" class="comment-item">
            <img :src="comment.userAvatar" :alt="comment.userName" class="comment-avatar">
            <div class="comment-content">
              <span class="comment-username">{{ comment.userName }}</span>
              <p class="comment-text">{{ comment.text }}</p>
            </div>
            <button v-if="isCurrentUserComment(comment)" @click="deleteComment(index)" class="delete-comment">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Add Comment Form -->
        <form @submit.prevent="addComment" class="comment-form">
          <input v-model="newComment" type="text" placeholder="Add a comment..." class="comment-input"
            @keyup.enter="addComment">
          <button type="submit" class="comment-submit" :disabled="!newComment.trim()">
            Post
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MessageCircleIcon } from 'lucide-vue-next';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollContainer = ref(null)
const currentImageIndex = ref(0)
const isLiked = ref(false)
const isFavorite = ref(false)
const showComments = ref(false)
const newComment = ref('')

const props = defineProps({
  property: {
    type: Object,
    required: true,
    validator: (prop) => {
      return (
        Array.isArray(prop.images) &&
        prop.images.length > 0 &&
        typeof prop.category === 'string' &&
        typeof prop.details === 'object'
      )
    }
  }
})

// Computed properties
const getCategoryIcon = computed(() => {
  const icons = {
    apartment: 'fa-building',
    house: 'fa-home',
    villa: 'fa-hotel',
    office: 'fa-briefcase',
    default: 'fa-home'
  }
  return icons[props.property.category.toLowerCase()] || icons.default
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const scrollToImage = (index) => {
  currentImageIndex.value = index
  scrollContainer.value?.scrollTo({
    left: (scrollContainer.value.scrollWidth / props.property.images.length) * index,
    behavior: 'smooth'
  })
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    scrollToImage(currentImageIndex.value - 1)
  }
}

const nextImage = () => {
  if (currentImageIndex.value < props.property.images.length - 1) {
    scrollToImage(currentImageIndex.value + 1)
  }
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  props.property.likesCount += isLiked.value ? 1 : -1
  // Here you would make an API call to update likes
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // Here you would make an API call to update favorites
}

const toggleComments = () => {
  showComments.value = !showComments.value
}

const addComment = () => {
  if (!newComment.value.trim()) return

  const comment = {
    userName: 'Current User', // Replace with actual user data
    userAvatar: '/images/profile.png', // Replace with actual user avatar
    text: newComment.value.trim()
  }

  props.property.comments.push(comment)
  props.property.commentsCount++
  newComment.value = ''
  // Here you would make an API call to add the comment
}

const deleteComment = (index) => {
  props.property.comments.splice(index, 1)
  props.property.commentsCount--
  // Here you would make an API call to delete the comment
}

const isCurrentUserComment = (comment) => {
  // Replace with actual user authentication logic
  return comment.userName === 'Current User'
}

const navigateToUserProfile = (userId) => {
  router.push(`/user/${userId}`)
}

// Touch handling
let touchStartX = 0
let currentScroll = 0

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
  currentScroll = scrollContainer.value?.scrollLeft || 0
}

const handleTouchMove = (e) => {
  if (!touchStartX || !scrollContainer.value) return
  const deltaX = touchStartX - e.touches[0].clientX
  scrollContainer.value.scrollLeft = currentScroll + deltaX
}

const handleTouchEnd = () => {
  touchStartX = 0
  updateCurrentIndex()
}

const handleScroll = () => {
  updateCurrentIndex()
}

const updateCurrentIndex = () => {
  if (!scrollContainer.value) return
  const scrollPosition = scrollContainer.value.scrollLeft
  const imageWidth = scrollContainer.value.scrollWidth / props.property.images.length
  currentImageIndex.value = Math.round(scrollPosition / imageWidth)
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('touchstart', handleTouchStart)
    scrollContainer.value.addEventListener('touchmove', handleTouchMove)
    scrollContainer.value.addEventListener('touchend', handleTouchEnd)
    scrollContainer.value.addEventListener('scroll', handleScroll)
  }
})

onBeforeUnmount(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('touchstart', handleTouchStart)
    scrollContainer.value.removeEventListener('touchmove', handleTouchMove)
    scrollContainer.value.removeEventListener('touchend', handleTouchEnd)
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.property-card {
  @apply block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden;
}

.image-scroll-container {
  @apply w-full h-full overflow-x-scroll scroll-smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.image-scroll-container::-webkit-scrollbar {
  display: none;
}

.image-wrapper {
  @apply flex h-full;
}

.image-slide {
  @apply flex-shrink-0;
  scroll-snap-align: start;
}

.nav-arrow {
  @apply absolute top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-200 z-20 shadow-md;
}

.nav-dot {
  @apply w-2 h-2 rounded-full bg-white/80 transition-all duration-200;
}

.nav-dot.active {
  @apply w-3 h-3 bg-emerald-500;
}

.category-badge {
  @apply absolute top-3 left-3 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-medium capitalize flex items-center gap-1.5;
}

.user-info {
  @apply absolute top-3 right-12 flex items-center gap-2 bg-white/90 rounded-full px-2 py-1 cursor-pointer hover:bg-white transition-all duration-200;
}

.favorite-button {
  @apply absolute top-3 right-3 bg-white/90 text-black w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:text-yellow-500;
}

.favorite-button i {
  @apply text-yellow-500;
}

.favorite-button.favorited {
  @apply text-yellow-500;
}

.location-info {
  @apply flex items-center gap-1.5 text-gray-500 mb-3;
}

.features-grid {
  @apply grid grid-cols-3 gap-2 mb-4;
}

.feature-item {
  @apply bg-emerald-50 rounded-lg p-2 text-center flex flex-col items-center gap-1;
}

.description {
  @apply text-gray-600 text-sm mb-4 line-clamp-2 hover:line-clamp-none transition-all duration-300;
}

.social-section {
  @apply flex items-center justify-between pt-3 border-t border-gray-100;
}

.likes-wrapper {
  @apply flex items-center gap-2;
}

.like-button {
  @apply p-2 rounded-full hover:bg-gray-100 transition-colors duration-200;
}

.like-button.liked {
  @apply text-red-500;
}

.likers-info {
  @apply flex items-center gap-2;
}

.likers-avatars {
  @apply flex -space-x-2;
}

.comments-toggle {
  @apply flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700;
}

.comments-toggle.active {
  @apply text-emerald-600;
}

.comments-container {
  @apply mt-4 pt-4 border-t border-gray-100;
}

.comments-list {
  @apply space-y-3 mb-4 max-h-60 overflow-y-auto;
}

.comment-item {
  @apply flex items-start gap-2 p-2 relative;
}

.comment-avatar {
  @apply w-8 h-8 rounded-full;
}

.comment-content {
  @apply flex-1;
}

.comment-username {
  @apply font-medium text-sm text-gray-800;
}

.comment-text {
  @apply text-sm text-gray-600;
}

.delete-comment {
  @apply text-gray-400 hover:text-red-500 p-1;
}

.comment-form {
  @apply flex gap-2 items-center;
}

.comment-input {
  @apply flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-emerald-500;
}

.comment-submit {
  @apply px-4 py-2 bg-emerald-500 text-white rounded-full text-sm hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed;
}

@media (max-width: 640px) {
  .nav-arrow {
    @apply w-7 h-7;
  }

  .feature-item {
    @apply p-1.5;
  }

  .user-info {
    @apply right-10;
  }
}
</style>