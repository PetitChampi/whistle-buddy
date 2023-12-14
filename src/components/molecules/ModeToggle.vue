<template>
  <div class="mode-toggle" @click="switchMode">
    <span v-if="darkMode" class="mode-toggle-sun">
      <span class="icon-sun" />
    </span>
    <span v-else class="mode-toggle-moon">
      <span class="icon-moon" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { useDarkModeStore } from "@/stores/darkMode";
import { storeToRefs } from "pinia";

const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);
const { switchMode } = darkModeStore;
</script>

<style lang="scss" scoped>
.mode-toggle {
  font-size: 1.5rem;
  cursor: pointer;

  &-sun, &-moon {
    color: var(--mode-toggle);
    text-shadow: var(--mode-toggle-shadow);
  }
}
</style>