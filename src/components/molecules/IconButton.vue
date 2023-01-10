<template>
  <div
    class="button"
    :class="{ active: isActive, play: isPlay }"
    @click="toggleActivate"
  >
    <span :class="`icon-${icon}`"></span>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  activateOnClick: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    required: true
  }
});

const isActive = ref(false);
const isPlay = ref(props.icon === "play");

function toggleActivate() {
  if (!props.activateOnClick) return;
  isActive.value = !isActive.value;
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 1.125rem;
  border-radius: 50px;
  background-color: var(--intensified-bg);
  box-shadow: var(--button-shadow);
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: filter .2s ease, background-color .2s ease, color .2s ease;

  &:hover {
    filter: brightness(1.2);
  }

  &.active {
    background-color: var(--accent);
    color: var(--intensified-bg);
  }

  &.play {
    padding-left: 3px;
  }
}
</style>