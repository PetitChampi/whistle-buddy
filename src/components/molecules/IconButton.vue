<template>
  <div
    class="button"
    :class="{ active: isActive, play: isPlay }"
    @click="toggleActivate"
  >
    <span :class="`icon-${icon}`" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

export interface IProps {
  activateOnClick?: boolean,
  active?: boolean,
  icon: string
}
const props = withDefaults(defineProps<IProps>(), {
  active: false,
});

const emit = defineEmits(["@activateBtn"]);

const isActive = ref<boolean>(props.active);
const isPlay = ref<boolean>(props.icon === "play");

function toggleActivate() {
  if (!props.activateOnClick) return;
  isActive.value = !isActive.value;
  emit("@activateBtn");
}

watch(() => props.active, (newVal) => isActive.value = newVal);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.button {
  --size: 40px;
  font-size: 1.125rem;
  border-radius: 50px;
  background-color: var(--intensified-bg);
  box-shadow: var(--button-shadow);
  height: var(--size);
  width: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: filter .2s ease, background-color .2s ease, color .2s ease;
  @media screen and (max-width: $mobile) {
    --size: 36px;
    font-size: 1rem;
  }
  &:hover {
    filter: brightness(1.2);
  }

  &.active {
    background-color: var(--accent);
    color: var(--accent-contraster);
  }

  &.play {
    padding-left: 3px;
  }
}
</style>