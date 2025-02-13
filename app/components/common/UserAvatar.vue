<template>
    <div 
      :class="[
        'rounded-full flex items-center justify-center text-white',
        sizeClasses[size]
      ]"
      :style="{ backgroundColor: generateColor(name) }"
    >
      {{ initials }}
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
  })
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }
  
  const initials = computed(() => {
    return props.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })
  
  const generateColor = (name) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = hash % 360
    return `hsl(${hue}, 70%, 50%)`
  }
  </script>