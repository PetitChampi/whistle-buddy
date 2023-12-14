<template>
  <div class="controls">
    <ModeToggle v-tooltip="{ text: $t('GEN_SWITCH_MODE'), direction: 'bottom' }" />
    <ListDropdown
      :options="langOptions"
      :defaultSelectedValue="$i18n.locale"
      :closeOnInteraction="true"
      @@optionSelected="changeLanguage($event)"
    />
  </div>
</template>

<script setup lang="ts">
import ModeToggle from "@/components/molecules/ModeToggle.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import { ref } from "vue";
import type { IOption } from "@/types/MusicalDataTypes";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });

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
@import "@/assets/variables.scss";

.controls {
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: $mobile) {
    gap: 30px;
  }
}
@media screen and (max-width: $mobile) {
  .navigation-controls .controls {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
}
</style>
