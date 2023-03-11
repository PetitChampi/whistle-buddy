<template>
<div>
<!-- see above parent div for router transition -->
  <GameParams :gameType="'guessing'" v-if="!gameStarted" @@gameStarted="gameStarted = true" />
  <div v-if="gameStarted && !gameFinished" class="game">
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
      <CustomButton :btnText="$t('G_GUESS_NEXT')" iconR="chevron_forward" @click="gameFinished = true" />
    </div>
  </div>

  <div v-if="gameFinished"  class="finish">
    <h1 class="finish-title">{{ $t("G_GUESS_FINISH_TITLE") }}</h1>
    <p class="finish-subtitle">
      {{ $t("G_GUESS_FINISH_SUB_INTRO") }}
      <span class="score" :class="{ green: false }">{{ $t("G_GUESS_FINISH_SUB_NUMS", {score: 13, total: 14}) }}</span>
    </p>
    <img src="" alt="Happy mascot">
    <div class="finish-links">
      <div class="btn-container">
        <CustomButton :btnText="$t('G_GUESS_FINISH_BACK_SET')" btnType="secondary" @click="backToSettings" />
        <CustomButton :btnText="$t('G_GUESS_FINISH_REPLAY')" @click="replayRound" />
      </div>
      <span class="finish-links-bottom">
        <RouterLink :to="{ name: 'fingeringTable' }">
          {{ $t("G_FINISH_BACK_TAB") }}
        </RouterLink>
      </span>
    </div>
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
import { watch } from "vue";

const gameStarted = ref<boolean>(false);
const gameFinished = ref<boolean>(false);
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
]);

function backToSettings() {
  gameStarted.value = false;
  gameFinished.value = false;
}
function replayRound() {
  gameStarted.value = true;
  gameFinished.value = false;
}

watch(gameStarted, () => {
  window.scrollTo(0, 0);
})
watch(gameFinished, () => {
  window.scrollTo(0, 0);
})
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

.finish {
  max-width: 660px;
  margin: 50px auto 0;
  background-color: var(--intensified-bg);
  padding: 30px 30px 20px;
  border-radius: 10px;

  &-title {
    text-align: center;
    margin-bottom: 20px;
  }
  &-subtitle {
    text-align: center;
    font-size: 1.25rem;

    .score {
      font-weight: 700;
      &.green {
        color: var(--success);
      }
    }
  }

  img {
    width: 200px;
    display: block;
    margin: 30px auto;
  }
  .btn-container {
    justify-content: space-between;
    margin: 0;
  }

  &-links-bottom {
    display: inline-block;
    margin-top: 15px;
    font-size: .75rem;
  }
}
</style>