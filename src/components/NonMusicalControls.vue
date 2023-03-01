<template>
  <div class="controls">
    <ModeToggle />
    <ListDropdown
      :options="langOptions"
      :defaultSelectedOption="'en'"
      :closeOnInteraction="true"
    />
  </div>
</template>

<script setup lang="ts">
import ModeToggle from "@/components/molecules/ModeToggle.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import { ref } from "@vue/reactivity";
import type { IOption } from "@/types/UiElements";

// Todo: replace w/ state
const langOptions = ref<IOption[]>([
  { value: "en", displayValue: "EN" },
  { value: "fr", displayValue: "FR" }
]);
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
