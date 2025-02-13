<template>
  <div class="p-4 rounded-lg border border-[#8DAD9D] bg-white shadow-md">
    <form @submit.prevent="handleSubmit" class="flex flex-col  gap-3">
      <div class="flex-1 relative ">
        <textarea
          v-model="messageContent"
          @keydown.enter.prevent="handleSubmit"
          placeholder="Type a message..."
          class="w-full px-4 py-3 border border-[#8DAD9D] overflow-y-auto rounded-lg focus:ring-2 focus:ring-[#8DAD9D] focus:border-transparent resize-none overflow-hidden transition-all duration-200 text-gray-700"
          :class="{ 'pr-10': messageContent.length > 0 }"
          :style="{ height: textareaHeight }"
          ref="textarea"
          rows="1"
          @input="adjustTextareaHeight"
        ></textarea>
        <transition 
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <button
            v-show="messageContent.length > 0"
            type="button"
            class="absolute right-3 bottom-3 text-gray-400 hover:text-[#005C53] transition-colors duration-200"
            @click="clearMessage"
          >
            <XIcon class="w-4 h-4" />
          </button>
        </transition>
      </div>
      <div class="flex items-end gap-2 w-full">
        <div class="flex flex-col lg:flex-row md:flex-row gap-2 w-full items-end relative">
          <div class=" flex w-full">
          <button class="w-full bg-[#8DAD9D] text-white rounded-lg p-4">
            Envoyer une proprieter
          </button>
        </div>
        <div class="flex justify-start lg:justify-end w-full">
        <div class="flex w-full justify-start lg:justify-end md:justify-end gap-3">
          <button
            v-for="action in attachmentActions"
            :key="action.icon"
            type="button"
            class="p-2.5 text-[#8DAD9D] hover:text-[#005C53] hover:bg-gray-100 rounded-lg transition-all duration-200 relative group"
            @click="action.handler"
            :title="action.title"
          >
            <component :is="action.icon" class="w-5 h-5" />
            <span 
              class="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {{ action.title }}
            </span>
          </button>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            :accept="currentFileType"
            @change="handleFileSelected"
          />
        </div>
        <button
          type="submit"
          class="px-5 py-2.5 bg-[#005C53] text-white rounded-lg hover:bg-[#004A42] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[90px] justify-center transform active:scale-95"
          :disabled="!messageContent.trim()"
        >
          <span>Send</span>
          <SendIcon class="w-4 h-4" />
        </button>
      </div>
      </div>
      </div>
    </form>
    
    <!-- Emoji Picker Modal -->
    <transition 
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-2"
    >
      <div v-if="showEmojiPicker" class="absolute bottom-full mb-2 right-0 z-50">
        <div class="bg-white rounded-lg shadow-lg p-4 border max-w-[320px]">
          <div class="grid grid-cols-8 gap-2">
            <button
              v-for="emoji in commonEmojis"
              :key="emoji"
              @click="insertEmoji(emoji)"
              class="p-2 hover:bg-gray-100 rounded transition-colors text-xl hover:scale-110 transform duration-150"
            >
              {{ emoji }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  Paperclip as PaperclipIcon,
  Image as ImageIcon,
  Smile as SmileIcon,
  Send as SendIcon,
  X as XIcon
} from 'lucide-vue-next'

const emit = defineEmits(['sendMessage', 'fileSelected'])
const messageContent = ref('')
const textarea = ref(null)
const fileInput = ref(null)
const textareaHeight = ref('auto')
const showEmojiPicker = ref(false)
const currentFileType = ref('')

const commonEmojis = [
  '😊', '😂', '❤️', '👍', '😎', '🎉', '🔥', '✨',
  '😅', '🙌', '😍', '🤔', '👏', '🌟', '💪', '🙏',
  '😃', '🥳', '🌈', '💫', '👌', '💯', '🎨', '🚀'
]

const attachmentActions = [
  {
    icon: PaperclipIcon,
    title: 'Attach File',
    handler: () => handleAttachment('file')
  },
  {
    icon: ImageIcon,
    title: 'Upload Image',
    handler: () => handleAttachment('image')
  },
  {
    icon: SmileIcon,
    title: 'Add Emoji',
    // handler: toggleEmojiPicker
  }
]

const handleSubmit = () => {
  const content = messageContent.value.trim()
  if (content) {
    emit('sendMessage', content)
    clearMessage()
  }
}

const clearMessage = () => {
  messageContent.value = ''
  textareaHeight.value = 'auto'
  adjustTextareaHeight()
}

const adjustTextareaHeight = () => {
  const element = textarea.value
  if (!element) return
  
  element.style.height = '50'
  const newHeight = Math.min(element.scrollHeight, 100)
  element.style.height = `${newHeight}px`
  textareaHeight.value = `${newHeight}px`
}

const handleAttachment = (type) => {
  currentFileType.value = type === 'image' ? 'image/*' : '*/*'
  fileInput.value?.click()
}

const handleFileSelected = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    emit('fileSelected', file)
  }
  event.target.value = '' // Reset input
}

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

const insertEmoji = (emoji) => {
  const textareaEl = textarea.value
  if (!textareaEl) return

  const start = textareaEl.selectionStart
  const end = textareaEl.selectionEnd
  
  messageContent.value = 
    messageContent.value.substring(0, start) + 
    emoji + 
    messageContent.value.substring(end)
    
  // Set cursor position after emoji
  nextTick(() => {
    textareaEl.selectionStart = textareaEl.selectionEnd = start + emoji.length
    textareaEl.focus()
  })
  
  showEmojiPicker.value = false
}

// Close emoji picker when clicking outside
const handleClickOutside = (event) => {
  const target = event.target
  if (showEmojiPicker.value && !target.closest('.emoji-picker') && !target.closest('button')) {
    showEmojiPicker.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  adjustTextareaHeight()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
textarea {
  min-height: 44px;
  max-height: 200px;
  transition: height 0.2s ease;
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded;
}

textarea::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded hover:bg-gray-500;
}

/* Focus styles */
textarea:focus {
  @apply outline-none ring-2 ring-[#8DAD9D] border-transparent;
}

/* Custom animations */
.message-input-enter-active,
.message-input-leave-active {
  transition: all 0.3s ease;
}

.message-input-enter-from,
.message-input-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Hover effects */
button:not(:disabled):hover {
  @apply transform hover:-translate-y-0.5;
}

/* Loading state */
.loading {
  @apply opacity-75 cursor-wait;
}
</style>