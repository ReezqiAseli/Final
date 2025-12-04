<template>
  <button
    type="button"
    class="filter-button"
    :class="[
      `filter-button--${size}`,
      { active, disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
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

<style scoped>
:global(:root) {
  --filter-button-bg: transparent;
  --filter-button-border: #2c3e50;
  --filter-button-color: #aaa;
  --filter-button-bg-active: #00b894;
  --filter-button-border-active: #00b894;
  --filter-button-color-active: #050a14;
}

.filter-button {
  font-family: 'Finger Paint', cursive;
  border-radius: 999px;
  border: 1px solid var(--filter-button-border);
  background: var(--filter-button-bg);
  color: var(--filter-button-color);
  padding: 6px 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  min-width: 80px;
  text-align: center;
}

.filter-button--sm {
  font-size: 0.75rem;
  padding: 4px 12px;
}

.filter-button--md {
  font-size: 0.85rem;
}

.filter-button--lg {
  font-size: 1rem;
  padding: 10px 24px;
}

.filter-button:hover:not(.active):not(.disabled) {
  border-color: #00b894;
  color: #fff;
}

.filter-button.active {
  background: var(--filter-button-bg-active);
  border-color: var(--filter-button-border-active);
  color: var(--filter-button-color-active);
  font-weight: 600;
}

.filter-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
