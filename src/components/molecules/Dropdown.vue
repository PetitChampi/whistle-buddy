<template>
  <div class="custom-select" :class="isOpen && 'open'" ref="selectEl">
    <div class="custom-select--trigger" @click="toggleOpen" ref="triggerEl">
      <slot name="dropdown-title"></slot>
      <div class="custom-select--arrow"></div>
    </div>
    <div class="custom-select-content">
      <slot name="dropdown-content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";

const props = defineProps({
  closeOnInteraction: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref<boolean>(false);
const selectEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLElement | null>(null);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}
function checkClickTarget(e: MouseEvent) {
  if (!isOpen.value) return;
  const elToCheck = props.closeOnInteraction ? triggerEl : selectEl;
  if (!e.composedPath().includes((elToCheck.value as EventTarget))) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.body.addEventListener("click", checkClickTarget);
});

onBeforeUnmount(() => {
  document.body.removeEventListener("click", checkClickTarget);
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.custom-select {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  &--trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: $button-radius-desktop;
    background: var(--intensified-bg);
    box-shadow: var(--button-shadow);
    font-weight: 500;
    cursor: pointer;
    transition: filter ease .2s;

    &:hover {
      filter: brightness(1.3);
    }
  }
  &-content {
    position: absolute;
    display: block;
    top: 100%;
    min-width: 100%;
    border-radius: $button-radius-desktop;
    overflow: hidden;
    box-shadow: var(--card-shadow-desktop);
    background: var(--intensified-bg);
    transition: opacity .2s, visibility .2s;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 2;
  }
  &.open &-content {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  &--arrow {
    position: relative;
    height: 10px;
    width: 10px;
    margin-left: 20px;
    &::before, &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      transition: all .2s;
    }
    &::before {
      left: 3px;
      transform: rotate(45deg);
      background-color: var(--text-standard);
    }
    &::after {
      left: -3px;
      transform: rotate(-45deg);
      background-color: var(--text-standard);
    }
  }
  &.open &--arrow::before {
    left: 3px;
    transform: rotate(-45deg);
  }
  &.open &--arrow::after {
    left: -3px;
    transform: rotate(45deg);
  }
}
</style>