<template>
  <button
    :class="`px-4 py-2 rounded text-white text-sm font-medium transition-colors ${
      variant === 'primary' ? 'bg-[#1b4332]' : 'bg-[#9ab94e]'
    }`"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary'].includes(value)
    }
  }
}
</script>