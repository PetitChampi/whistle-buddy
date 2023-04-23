<template>
  <div class="about">
    <h1 class="about-title">{{ $t('GEN_ABOUT_US') }}</h1>
    <div class="about-text">
      <p>{{ $t("ABOUT_P1") }}</p>
      <p>{{ $t("ABOUT_P2") }}</p>
      <p>{{ $t("ABOUT_P3") }}</p>
      <p>{{ $t("ABOUT_P4") }}</p>
      <p>{{ $t("ABOUT_P5") }} <br><a href="https://www.buymeacoffee.com/whistlebuddy" target="_blank">buymeacoffee.com/whistlebuddy</a></p>
      <p>{{ $t("ABOUT_P6") }}<a href="mailto:esther@whistle-buddy.com" target="_blank">message</a></p>
      <p>{{ $t("ABOUT_P7") }}</p>
    </div>
    <div class="about-image">
      <img
        v-imgpreload="`${baseUrl}img/merci_${imgSuffix}.png`"
        alt="Happy mascot"
      >
    </div>
    <p class="about-thanks">{{ $t('GEN_THANKS') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useDarkModeStore } from "@/stores/darkMode";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);

const baseUrl = import.meta.env.BASE_URL;
const imgSuffix = computed(() => darkMode.value ? "dark" : "light");
</script>

<style lang="scss" scoped>
.about {
  margin: 50px auto 0;
  max-width: 660px;

  &-title {
    text-align: center;
  }

  &-text {
    p {
      margin-bottom: 30px;
      font-size: 1.125rem;
      line-height: 160%;
    }
  }

  &-image {
    max-width: 300px;
    margin: 0 auto 20px;
  }

  &-thanks {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 400;
    font-size: 1.75rem;
  }
}
</style>