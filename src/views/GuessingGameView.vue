<template>
  <GameParams :gameType="'guessing'" v-if="gameStarted" @@gameStarted="gameStarted = true" />
  <div v-else class="game">
    <div class="game-metrics-wrapper">
      <div class="game-metrics">
        <div class="score">
          <p>{{ $t("G_GUESS_SCORE") }}</p>
          <p class="score-numbers">
            <span class="score-numbers-current">3 </span>
            / 14
          </p>
        </div>
        <Timer :value="436" :maxValue="600" />
      </div>
    </div>

    <div class="game-text">
      <h2>{{ $t("G_GUESS_HEADING_FTON") }}</h2>
      <p>{{ $t("G_GUESS_SUBHEADING", { key: "Gb" }) }}</p>
    </div>
    <div class="game-cards">
      <div class="game-cards-toguess">
        <Card :note="note" class="card-item" fingeringOnly />
        <Card :note="note" class="card-item" error :errorMsg="$t('G_GUESS_ERR_NOTE')" fingeringOnly />
      </div>
      <div class="game-cards-choices">
        <ChoiceGrid :cards="cards" />
      </div>
    </div>
    <div class="btn-container">
      <CustomButton :btnText="$t('G_GUESS_NEXT')" iconR="chevron_forward" disabled />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import GameParams from "@/components/GameParams.vue";
import Timer from "@/components/molecules/Timer.vue";
import Card from "@/components/molecules/Card.vue";
import ChoiceGrid from "@/components/ChoiceGrid.vue";
import CustomButton from "@/components/molecules/CustomButton.vue";
import type { ICard } from "@/types/UiElements";

const gameStarted = ref<boolean>(false);
const note = ref<ICard>({
  id: 1,
  name: {en: 'Gb', fr: 'Sol b'},
  fingering: [2, 2, 1, 0, 0, 0],
  octave: 1
});
const cards = ref<ICard[]>([
  {
    id: 1,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 2,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 3,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 4,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 5,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 6,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 7,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 8,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 9,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 10,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 11,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
  {
    id: 12,
    name: {en: 'Gb', fr: 'Sol b'},
    fingering: [2, 2, 1, 0, 0, 0],
    octave: 1
  },
]);
</script>

<style lang="scss" scoped>
.game {
  position: relative;

  &-metrics {
    position: absolute;
    top: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    &-wrapper {
      position: sticky;
      top: 50px;
      z-index: 5;
    }

    .score {
      font-size: .875rem;
      font-weight: 400;
      &-numbers-current {
        font-weight: 800;
        color: var(--accent);
        font-size: 2rem;
        line-height: 100%;
      }
    }
  }
  &-text {
    padding-top: 50px;
    text-align: center;

    h2 {
      font-weight: 500;
      font-size: 2rem;
      margin-bottom: 10px;
    }
    p {
      font-size: 1.125rem;
      margin-bottom: 20px;
    }
  }
  &-cards {
    display: flex;
    flex-direction: column;
    gap: 50px;

    &-toguess {
      display: flex;
      justify-content: center;
      gap: 20px;
      .card-item {
        flex-grow: 1;
        max-width: 160px;
      }
    }
  }
}
.btn-container {
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
}
</style>