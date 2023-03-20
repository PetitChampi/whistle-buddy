<template>
  <div class="about">
    <h1 class="about-title">{{ $t('GEN_ABOUT_US') }}</h1>
    <div class="about-text">
      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco</p>
      <p>Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco</p>
      <p>Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit.</p>
    </div>
    <div class="about-image">
      <img :src="`${baseUrl}img/merci_${imgSuffix}.png`" alt="" class="placeholder-contain">
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