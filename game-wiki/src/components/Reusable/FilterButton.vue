<template>
  <button
    type="button"
    :disabled="disabled"
    @click="$emit('click')"
    :class="[
      // Base Styles
      'font-[\'Finger_Paint\'] rounded-full border transition-all duration-200 min-w-[80px] text-center',
      
      // Size Variants
      {
        'text-xs px-3 py-1': size === 'sm',
        'text-sm px-4 py-1.5': size === 'md',
        'text-base px-6 py-2.5': size === 'lg',
      },

      // State Variants (Active vs Inactive)
      active
        ? 'bg-emerald-500 border-emerald-500 text-[#050a14] font-semibold' 
        : 'bg-transparent border-white-700 text-gray-400 hover:border-emerald-500 hover:text-white',

      // Disabled State
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
});

defineEmits(['click']);
</script>