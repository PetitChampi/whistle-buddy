<template>
  <button class="btn" :class="{ secondary: btnType === 'secondary' }">
    {{ btnText }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  btnType: {
    type: String,
    default: "primary"
  },
  btnText: {
    type: String,
    default: "Button text"
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.btn {
  font-family: inherit;
  font-weight: 600;
  font-size: 1rem;
  color: var(--accent-contraster);
  background-color: var(--accent);
  border: none;
  box-shadow: var(--button-shadow);
  border-radius: $button-radius-desktop;
  padding: 10px 20px;
  cursor: pointer;
  transition: filter .2s ease;

  &:hover {
    filter: brightness(1.3);
  }

  &.secondary {
    color: var(--accent);
    background-color: var(--accent-contraster);

    &:hover {
      filter: brightness(.95);
    }
  }
}
</style>