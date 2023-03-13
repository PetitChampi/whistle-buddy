<template>
  <div class="mode-toggle" @click="switchMode">
    <span class="mode-toggle-sun" v-if="darkMode">
      <span class="icon-sun"></span>
    </span>
    <span class="mode-toggle-moon" v-else>
      <span class="icon-moon"></span>
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