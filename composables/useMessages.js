import { ref, computed } from 'vue'

export const useMessages = () => {
  const conversations = ref([
    {
      id: 1,
      sender: 'Xavier Moretz',
      preview: 'Merci pour votre...',
      time: '07:34',
      unread: true,
      online: true,
      messages: [
        {
          id: 1,
          content: "Bonjour, je suis intéressé par votre propriété. Pouvez-vous me donner plus d'informations ?",
          senderId: 'current_user',
          timestamp: new Date('2024-12-30T07:30:00')
        },
        {
          id: 2,
          content: "Merci de votre réponse, je vais vérifier et vous reviens rapidement avec les détails.",
          senderId: 'other_user',
          timestamp: new Date('2024-12-30T07:32:00')
        }
      ]
    },
    // Add more conversations as needed
  ])

  const activeConversation = ref(null)
  const searchQuery = ref('')
  const selectedFilter = ref('Toutes les conversations')

  const filteredConversations = computed(() => {
    let filtered = conversations.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(conversation => 
        conversation.sender.toLowerCase().includes(query) ||
        conversation.preview.toLowerCase().includes(query)
      )
    }

    switch (selectedFilter.value) {
      case 'Messages non lus':
        filtered = filtered.filter(conversation => conversation.unread)
        break
    }

    return filtered
  })

  const setActiveConversation = (conversationId) => {
    activeConversation.value = conversations.value.find(c => c.id === conversationId)
  }

  return {
    conversations,
    activeConversation,
    searchQuery,
    selectedFilter,
    filteredConversations,
    setActiveConversation
  }
}
