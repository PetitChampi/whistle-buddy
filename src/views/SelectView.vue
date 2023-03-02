<template>
  <div class="controls-bar">
    <NonMusicalControls />
  </div>
  <main class="main">
    <div class="container">
      <h1 class="main-title">Whistle Buddy</h1>
      <p class="main-text">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis 
        <RouterLink :to="{ name: 'about' }">about us</RouterLink> 
      enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt</p>
      <div class="main-cards">
        <FeatureCard
          :cardTitle="$t('GEN_FINGERING_TABLE')"
          toPageName="fingeringTable"
        />
        <FeatureCard
          :cardTitle="$t('GEN_GUESSING_GAME')"
          toPageName="guessingGame"
        />
        <FeatureCard
          :cardTitle="$t('GEN_MIX_OR_MATCH')"
          toPageName="mixOrMatch"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import NonMusicalControls from "@/components/NonMusicalControls.vue";
import FeatureCard from "@/components/molecules/FeatureCard.vue";
</script>

<style lang="scss" scoped>
.controls-bar {
  display: flex;
  justify-content: flex-end;
  padding: 15px 30px 0;
}
.main {
  margin-top: 20px;
  text-align: center;

  &-title {
    font-size: 4rem;
    font-weight: 800;
    color: var(--text-intense);
  }

  &-text {
    font-size: 1.125rem;
    line-height: 160%;
    margin: 20px 0 60px;

    a {
      text-decoration: none;
      display: inline-block;
      line-height: 140%;
      transition: border-bottom ease .2s;
      border-bottom: 1px solid transparent;
      &:hover {
        border-bottom: 1px solid var(--accent);
      }
    }
  }

  &-cards {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
