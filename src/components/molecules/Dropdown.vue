<template>
  <div class="custom-select" :class="{ open: isOpen }" ref="selectEl">
    <div class="custom-select--trigger" @click="toggleOpen" ref="triggerEl">
      <slot name="dropdown-title"></slot>
      <div class="custom-select--arrow" :class="{ open: isOpen }"></div>
    </div>
    <div
      class="custom-select-content"
      :class="{ open: isOpen, settings: type === 'settings' }"
      ref="trayEl"
    >
      <slot name="dropdown-content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";

export interface IProps {
  closeOnInteraction?: boolean,
  type?: "list" | "settings"
}
const props = withDefaults(defineProps<IProps>(), {});

const isOpen = ref<boolean>(false);
const selectEl = ref<HTMLElement | null>(null);
const triggerEl = ref<any>(null);
const trayEl = ref<any>(null);

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

function resizeTray() {
  if (window.innerWidth > 500) {
    trayEl.value.style.top = null;
    return;
  }
  const trigCoords = triggerEl.value.getBoundingClientRect();
  trayEl.value.style.top = `${trigCoords.top + triggerEl.value.offsetHeight}px`;
}

onMounted(() => {
  document.body.addEventListener("click", checkClickTarget);
  if (props.type === "settings") {
    window.addEventListener("resize", resizeTray);
    window.addEventListener("scroll", resizeTray);
    resizeTray();
  }
});

onBeforeUnmount(() => {
  document.body.removeEventListener("click", checkClickTarget);
  if (props.type === "settings") {
    window.removeEventListener("resize", resizeTray);
    window.removeEventListener("scroll", resizeTray);
  }
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
    @media screen and (max-width: $mobile) {
      border-radius: $button-radius-mobile;
      font-weight: normal;
      padding: 8px 12px;
    }

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
    box-shadow: var(--card-shadow-desktop);
    background: var(--intensified-bg);
    transition: opacity .2s, visibility .2s;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 2;

    &.settings {
      @media screen and (max-width: 500px) {
        position: fixed;
        right: 20px;
        left: 20px;
        min-width: unset;
        max-width: calc(100vw - 40px);
      }
    }
  }
  &-content.open {
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
  &--arrow.open::before {
    left: 3px;
    transform: rotate(-45deg);
  }
  &--arrow.open::after {
    left: -3px;
    transform: rotate(45deg);
  }
}
</style>