<template>
  <div class="controls">
    <ModeToggle />
    <ListDropdown
      :options="langOptions"
      :defaultSelectedOption="$i18n.locale"
      :closeOnInteraction="true"
      @@optionSelected="changeLanguage($event)"
    />
  </div>
</template>

<script setup lang="ts">
import ModeToggle from "@/components/molecules/ModeToggle.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import { ref } from "@vue/reactivity";
import type { IOption } from "@/types/UiElements";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });

// Todo: replace w/ state
const langOptions = ref<IOption[]>([
  { value: "en", displayValue: "EN" },
  { value: "fr", displayValue: "FR" }
]);

function changeLanguage(lang: IOption): void {
  locale.value = lang.value;
  localStorage.setItem("lang_key", lang.value);
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
