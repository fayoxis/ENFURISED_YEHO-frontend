// stores/messages.ts
import { defineStore } from 'pinia'

interface Message {
  id: string
  content: string
  sender: 'user' | 'other'
  timestamp: Date
}

interface Conversation {
  id: string
  userName: string
  messages: Message[]
}

export const useMessageStore = defineStore('messages', {
  state: () => ({
    conversations: new Map<string, Conversation>(),
    activeConversationId: null as string | null,
  }),

  actions: {
    sendMessage(conversationId: string, content: string) {
      const conversation = this.conversations.get(conversationId)
      if (conversation) {
        const message: Message = {
          id: Date.now().toString(),
          content,
          sender: 'user',
          timestamp: new Date()
        }
        conversation.messages.push(message)
        this.conversations.set(conversationId, conversation)
      }
    },

    setActiveConversation(id: string) {
      this.activeConversationId = id
    }
  }
})