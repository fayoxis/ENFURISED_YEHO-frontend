import { defineStore } from 'pinia'

export const useChatsStore = defineStore('chats', {
  state: () => ({
    chats: [
      {
        id: 1,
        name: 'John Doe',
        status: 'Online',
        lastMessage: 'See you tomorrow!',
        lastMessageTime: new Date(),
        unreadCount: 2,
        unread: true,
        archived: false,
        messages: [
          {
            id: 1,
            content: 'Hey there!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          },
          {
            id: 2,
            content: 'See you tomorrow!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          }
        ]
      },
      {
        id: 2,
        name: 'John David',
        status: 'Offline',
        lastMessage: 'See you tomorrow!',
        lastMessageTime: new Date(),
        unreadCount: 3,
        unread: true,
        archived: false,
        messages: [
          {
            id: 1,
            content: 'Hey there!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          },
          {
            id: 2,
            content: 'See you tomorrow!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          }
        ]
      },
      {
        id: 2,
        name: 'Donald jones',
        status: 'Offline',
        lastMessage: 'See you tomorrow!',
        lastMessageTime: new Date(),
        unreadCount: 3,
        unread: true,
        archived: false,
        messages: [
          {
            id: 1,
            content: 'Hey there!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          },
          {
            id: 2,
            content: 'See you tomorrow!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          }
        ]
      },{
        id: 3,
        name: 'samantha joyce',
        status: 'Online',
        lastMessage: 'See you tomorrow!',
        lastMessageTime: new Date(),
        unreadCount: 3,
        unread: true,
        archived: false,
        messages: [
          {
            id: 1,
            content: 'Hey there!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          },
          {
            id: 2,
            content: 'See you tomorrow!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60)
          }
        ]
      },
    ],
    selectedChat: null
  }),

  actions: {
    setSelectedChat(chat) {
      this.selectedChat = chat
    },

    markAsRead(chatId) {
      const chat = this.chats.find(c => c.id === chatId)
      if (chat) {
        chat.unread = false
      }
    },

    async sendMessage({ chatId, content, sender, timestamp }) {
      // This would be replaced with an API call in the future
      const chat = this.chats.find(c => c.id === chatId)
      if (chat) {
        const message = {
          id: Date.now(),
          content,
          sender,
          timestamp
        }
        chat.messages.push(message)
        chat.lastMessage = content
        chat.lastMessageTime = timestamp
      }
    }
  }
})
