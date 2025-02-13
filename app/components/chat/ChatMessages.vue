<template>
  <div 
    class="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-white max-h-screen messages-container"
    ref="messagesContainer"
  >
    <TransitionGroup
      name="message"
      tag="div"
      class="space-y-4"
    >
      <div
        v-for="(message, index) in messages"
        :key="message.id"
        class="flex w-full items-end"
        :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- Timestamp for first message of the day -->
        <div 
          v-if="shouldShowDate(message, index)"
          class="absolute left-1/2 -translate-x-1/2 -top-8 bg-white px-4 py-1 rounded-full shadow-sm text-xs text-gray-500"
        >
          {{ formatMessageDate(message.timestamp) }}
        </div>

        <div
          class="group relative message-wrapper"
          :class="[
            'max-w-[65%] break-words',
            message.sender === 'user' ? 'items-end' : 'items-start'
          ]"
        >
          <!-- Message Content -->
          <div
            class="message-bubble"
            :class="[
              'px-4 py-2.5 rounded-[18px] shadow-sm transition-all duration-200',
              message.sender === 'user' 
                ? 'bg-[#005C53] text-white rounded-tr-[4px] hover:bg-[#004a42]'
                : 'bg-[#F3F3F3] text-gray-800 rounded-tl-[4px] border border-gray-100 hover:bg-gray-50'
            ]"
          >
            <p class="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {{ message.content }}
            </p>
            <!-- Message Time -->
          <div
            class="message-time"
            :class="[
              ' mt-1 px-1 text-sm font-semibold',
              message.sender === 'user' ? 'text-white text-right' : ' text-[#005C53] '
            ]"
          >
            {{ formatMessageTime(message.timestamp) }}
          </div>
          </div>

          

          <!-- Message Status (for user messages) -->
          <div 
            v-if="message.sender === 'user'"
            class="absolute -right-5 bottom-5 text-gray-400"
          >
            <CheckIcon v-if="message.status === 'sent'" class="w-4 h-4" />
            <CheckCheckIcon v-if="message.status === 'read'" class="w-4 h-4 text-[#005C53]" />
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { format, isToday, isYesterday, isSameDay } from 'date-fns'
import { CheckIcon, CheckCheckIcon } from 'lucide-vue-next'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['scrollToBottom'])
const messagesContainer = ref(null)

const formatMessageTime = (timestamp) => {
  return format(new Date(timestamp), 'HH:mm')
}

const formatMessageDate = (timestamp) => {
  const date = new Date(timestamp)
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return format(date, 'MMMM d, yyyy')
}

const shouldShowDate = (message, index) => {
  if (index === 0) return true
  const currentDate = new Date(message.timestamp)
  const previousDate = new Date(props.messages[index - 1].timestamp)
  return !isSameDay(currentDate, previousDate)
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
  emit('scrollToBottom')
}

onMounted(() => {
  scrollToBottom()
})

watch(() => props.messages, () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })
</script>

<style scoped>
.messages-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
  background-image: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.5));
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

/* Message animations */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Message bubble hover effects */
.message-bubble {
  transform-origin: bottom;
  will-change: transform;
}

.message-bubble:hover {
  transform: scale(1.01);
}

/* Time fade in */
.message-time {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.message-wrapper:hover .message-time {
  opacity: 1;
}

/* Custom animations for specific elements */
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

.message-wrapper {
  animation: fadeIn 0.3s ease-out;
}
</style>