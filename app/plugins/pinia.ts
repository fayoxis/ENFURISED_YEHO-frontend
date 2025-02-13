import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'

export default defineNuxtPlugin(({ vueApp }) => {
  const pinia = createPinia()
  vueApp.use(pinia)
})

// composables/useMessaging.ts
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/stores/chats'

export const useMessaging = () => {
  const chatStore = useChatStore()
  const { conversations, activeConversation, messages } = storeToRefs(chatStore)

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const scrollToBottom = (element: HTMLElement | null) => {
    if (element) {
      nextTick(() => {
        element.scrollTop = element.scrollHeight
      })
    }
  }

  return {
    formatTime,
    scrollToBottom,
    conversations,
    activeConversation,
    messages
  }
}

// stores/chat.ts
import { defineStore } from 'pinia'

interface Message {
  id: number
  content: string
  senderId: string
  timestamp: Date
}

interface Conversation {
  id: string
  userId: string
  name: string
  unread: boolean
  lastMessage: string
  timestamp: string
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    conversations: [] as Conversation[],
    messages: {} as Record<string, Message[]>,
    activeConversation: null as Conversation | null,
    currentUser: {
      id: 'agent_1',
      name: 'Agent'
    }
  }),

  getters: {
    currentMessages: (state) => {
      if (!state.activeConversation) return []
      return state.messages[state.activeConversation.userId] || []
    }
  },

  actions: {
    async initialize() {
      try {
        // Initialize store data
        // You can add API calls here
        this.conversations = [
          {
            id: '1',
            userId: 'xavier_1',
            name: 'Xavier Moretz',
            unread: true,
            lastMessage: 'Merci pour votre réponse...',
            timestamp: '07:34'
          },
          // ... other initial conversations
        ]
      } catch (error) {
        console.error('Failed to initialize chat store:', error)
      }
    },

    setActiveConversation(conversationId: string) {
      const conversation = this.conversations.find(c => c.id === conversationId)
      if (conversation) {
        this.activeConversation = conversation
      }
    },

    async sendMessage(content: string) {
      if (!this.activeConversation || !content.trim()) return

      try {
        const newMessage = {
          id: Date.now(),
          content,
          senderId: this.currentUser.id,
          timestamp: new Date()
        }

        if (!this.messages[this.activeConversation.userId]) {
          this.messages[this.activeConversation.userId] = []
        }

        this.messages[this.activeConversation.userId].push(newMessage)
        
        const conversation = this.conversations.find(
          c => c.id === this.activeConversation?.id
        )
        
        if (conversation) {
          conversation.lastMessage = content
          conversation.timestamp = new Date().toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      } catch (error) {
        console.error('Failed to send message:', error)
        throw error
      }
    }
  }
})
