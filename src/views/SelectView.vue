<template>
  <div>
    <!-- Parent div wrapper for eventual transitions -->
    <div class="controls-bar">
      <NonMusicalControls />
    </div>
    <main class="main">
      <div class="container">
        <div class="main-header">
          <img
            v-imgpreload="`${baseUrl}img/flann-greet.png`"
            alt="Happy mascot"
            class="main-header-img"
          >
          <h1 class="main-title">Whistle Buddy</h1>
        </div>
        <div class="main-text">
          <p>{{ $t("SELECT_INTRO_P1") }}</p>
          <p>{{ $t("SELECT_INTRO_P2") }}</p>
          <br>
          <span>{{ $t("SELECT_INTRO_P3") }}</span>
          <br><br>
          <p>{{ $t("SELECT_INTRO_P4") }}</p>
        </div>
        <div class="main-cards">
          <FeatureCard
            :cardTitle="$t('GEN_FINGERING_TABLE')"
            toPageName="fingeringTable"
            :imgSrc="`${baseUrl}img/table_${imgSuffix}.png`"
            class="main-cards-item"
          />
          <FeatureCard
            :cardTitle="$t('GEN_GUESSING_GAME')"
            toPageName="guessingGame"
            :imgSrc="`${baseUrl}img/qcm_${imgSuffix}.png`"
            class="main-cards-item"
          />
          <FeatureCard
            :cardTitle="$t('GEN_MIX_OR_MATCH')"
            toPageName="mixOrMatch"
            :imgSrc="`${baseUrl}img/mixm_${imgSuffix}.png`"
            class="main-cards-item"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NonMusicalControls from "@/components/NonMusicalControls.vue";
import FeatureCard from "@/components/molecules/FeatureCard.vue";
import { useDarkModeStore } from "@/stores/darkMode";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);

const baseUrl = import.meta.env.BASE_URL;
const imgSuffix = computed(() => darkMode.value ? "dark" : "light");
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.controls-bar {
  display: flex;
  justify-content: flex-end;
  padding: 15px 30px 0;
  @media screen and (max-width: $mobile) {
    padding: 10px 20px 0;
  }
}
.main {
  margin-top: 20px;
  text-align: center;

  &-header {
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: baseline;
    margin-bottom: 30px;
    @media screen and (max-width: $mobile) {
      align-items: center;
    }

    &-img {
      width: 80px;
      @media screen and (max-width: $mobile) {
        width: 50px;
      }
    }
  }

  &-title {
    font-size: 4rem;
    font-weight: 800;
    color: var(--text-intense);
    margin-bottom: 0;
    @media screen and (max-width: $mobile) {
      font-size: 2.25rem;
      margin-top: 20px;
    }
  }

  &-text {
    font-size: 1.125rem;
    line-height: 160%;
    margin: 20px auto 60px;
    max-width: 660px;
  }

  &-cards {
    display: flex;
    gap: 20px;
    @media screen and (max-width: $mobile) {
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }

    &-item {
      @media screen and (max-width: $mobile) {
        flex-basis: calc(50% - 5px);
      }
    }
  }
}
</style>
