<template>
  <component
    :is="tag"
    :class="[
      baseWidthClass,
      roundedClass,
      variantClasses[variant] ?? variantClasses.default,
      paddingClasses[padding] ?? paddingClasses.lg
    ]"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tag: {
    type: String,
    default: 'article',
  },
  variant: {
    type: String,
    default: 'default',
  },
  padding: {
    type: String,
    default: 'lg',
  },
  rounded: {
    type: String,
    default: 'rounded-[20px]',
  },
  fullWidth: {
    type: Boolean,
    default: true,
  },
});

const variantClasses = {
  default: 'bg-slate-900/80 border-2 border-emerald-500',
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4 md:p-6',
  md: 'p-5 md:p-8',
  lg: 'p-6 md:p-10',
  xl: 'p-8 md:p-12',
};

const baseWidthClass = computed(() => (props.fullWidth ? 'w-full' : ''));
const roundedClass = computed(() => props.rounded);
</script>
