<template>
<div>
<!-- see above parent div for router transition -->
  <GameParams :gameType="'guessing'" v-if="!gameStarted" @@gameStarted="startGame" />
  <div v-if="gameStarted && !gameFinished" class="game">
    <div class="game-metrics-wrapper">
      <div class="game-metrics">
        <div class="score">
          <p class="score-caption">{{ $t("G_GUESS_SCORE") }}</p>
          <p class="score-numbers">
            <span class="score-numbers-current">{{ score }} </span>
            / {{ cardsToGuess.length }}
          </p>
        </div>
        <Timer v-if="guessGameParams.timer" :value="436" :maxValue="600" />
      </div>
    </div>

    <div class="game-text">
      <h2>{{ $t("G_GUESS_HEADING_FTON") }}</h2>
      <p>{{ $t("G_GUESS_SUBHEADING", { key: generalParams.key.name.en.toUpperCase() }) }}</p>
    </div>
    <div class="game-cards">
      <div class="game-cards-toguess">
        <Card
          :note="currCardToGuess"
          class="card-item"
          :noteOnly="guessGameParams.valuesToGuess === 'note'"
          :fingeringOnly="guessGameParams.valuesToGuess === 'fing'"
        />
        <Card
          v-if="showResult && !isCorrect"
          :note="selectedCard || currCardToGuess"
          class="card-item"
          error
          :errorMsg="$t('G_GUESS_ERR_NOTE')"
          :noteOnly="guessGameParams.valuesToGuess === 'note'"
          :fingeringOnly="guessGameParams.valuesToGuess === 'fing'"
        />
      </div>
      <div class="game-cards-choices">
        <ChoiceGrid
          :cards="choiceCards"
          :selectedCard="selectedCard"
          :currCardToGuess="currCardToGuess"
          :showResult="showResult"
          :isCorrect="isCorrect"
          :valuesToShow="guessGameParams.valuesToGuess === 'note' ? 'fingerings' : 'notes'"
          @@selectCard="selectedCard = $event"
        />
      </div>
    </div>
    <div class="btn-container">
      <CustomButton
        :btnText="$t('G_GUESS_NEXT')"
        iconR="chevron_forward"
        :disabled="!selectedCard"
        @click="showResult ? setNewTurn() : checkResults()"
      />
    </div>
  </div>

  <div v-if="gameFinished"  class="finish">
    <h1 class="finish-title">{{ $t("G_GUESS_FINISH_TITLE") }}</h1>
    <p class="finish-subtitle">
      {{ $t("G_GUESS_FINISH_SUB_INTRO") }}
      <span
        class="score"
        :class="{ green: score === cardsToGuess.length }"
      >
        {{ $t("G_GUESS_FINISH_SUB_NUMS", {score, total: cardsToGuess.length}) }}
      </span>
    </p>
    <img v-imgpreload="`${baseUrl}img/flann-happy.png`" alt="Happy mascot">
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
import type { ICard } from "@/types/MusicalDataTypes";
import { watch } from "vue";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";

const baseUrl = import.meta.env.BASE_URL;

const params = useParamsStore();
const { generalParams, guessGameParams, currentCardsDynamic, cardsPerTotalFings } = storeToRefs(params);

const gameStarted = ref<boolean>(false);
const gameFinished = ref<boolean>(false);
const showResult = ref<boolean>(false);
const isCorrect = ref<boolean>(false);
const score = ref<number>(0);
const turn = ref<number>(0);
const selectedCard = ref<ICard | null>(null);

const cardsToGuess = ref<ICard[]>(getCardsToGuess());
const currCardToGuess = ref<ICard>(cardsToGuess.value[0]);
const choiceCards = ref<ICard[]>(getChoiceCards());

function getCardsToGuess(): ICard[] {
  return currentCardsDynamic.value.sort((a, b) => 0.5 - Math.random());
}
function getChoiceCards(): ICard[] {
  const cards = [ { ...currCardToGuess.value, id: 0 } ];
  const falseCards = cardsPerTotalFings.value.filter(c =>
    (c.name.en !== currCardToGuess.value.name.en) && (c.octave === currCardToGuess.value.octave)
  );

  cards.push(...falseCards.slice(0, guessGameParams.value.nbChoices.current - 1));

  return cards.sort((a, b) => 0.5 - Math.random());
}

function startGame() {
  cardsToGuess.value = getCardsToGuess();
  score.value = 0;
  turn.value = 0;
  setNewTurn();
  gameStarted.value = true;
}

function setNewTurn() {
  currCardToGuess.value = cardsToGuess.value[turn.value];
  choiceCards.value = getChoiceCards();
  selectedCard.value = null;
  showResult.value = false;
  isCorrect.value = false;
}

function checkResults() {
  showResult.value = true;
  if (
    selectedCard.value?.name.en === currCardToGuess.value.name.en &&
    selectedCard.value?.octave === currCardToGuess.value.octave
  ) {
    isCorrect.value = true;
    ++score.value;
  }
  if (++turn.value === cardsToGuess.value.length) gameFinished.value = true;
}

function backToSettings() {
  gameStarted.value = false;
  gameFinished.value = false;
}

function replayRound() {
  gameStarted.value = true;
  gameFinished.value = false;
  score.value = 0;
  turn.value = 0;
  setNewTurn();
}

watch(gameStarted, () => window.scrollTo(0, 0))
watch(gameFinished, () => window.scrollTo(0, 0))
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.game {
  position: relative;

  &-metrics {
    position: absolute;
    top: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media screen and (max-width: $mobile) {
      position: unset;
    }

    &-wrapper {
      position: sticky;
      top: 50px;
      z-index: 5;
      @media screen and (max-width: $mobile) {
        top: 70px
      }
    }

    .score {
      font-size: .875rem;
      font-weight: 400;
      box-shadow: 0 2px 5px 2px var(--body-bg);
      background-color: var(--body-bg);
      border-radius: 10px;
      &-caption {
        @media screen and (max-width: $mobile) {
          display: none;
        }
      }
      &-numbers-current {
        font-weight: 800;
        color: var(--accent);
        font-size: 2rem;
        line-height: 100%;
        @media screen and (max-width: $mobile) {
          font-size: 1.5rem;
        }
      }
    }
  }
  &-text {
    padding-top: 50px;
    text-align: center;
    @media screen and (max-width: $mobile) {
      padding-top: 40px;
    }

    h2 {
      font-weight: 500;
      font-size: 2rem;
      margin-bottom: 10px;
      @media screen and (max-width: $mobile) {
        font-size: 1.5rem;
      }
    }
    p {
      font-size: 1.125rem;
      margin-bottom: 20px;
      @media screen and (max-width: $mobile) {
        font-size: 1rem;
      }
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
      @media screen and (max-width: $mobile) {
        gap: 10px;
      }
      .card-item {
        flex-grow: 1;
        flex-basis: 50%;
        max-width: 160px;
        @media screen and (max-width: $mobile) {
          gap: 10px;
        }
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
  @media screen and (max-width: $mobile) {
    text-align: center;
    margin-top: 30px;
  }

  &-title {
    text-align: center;
    margin-bottom: 20px;
    @media screen and (max-width: $mobile) {
      font-size: 2rem;
      margin-bottom: 10px;
    }
  }
  &-subtitle {
    text-align: center;
    font-size: 1.25rem;
    @media screen and (max-width: $mobile) {
      font-size: 1.125rem;
    }

    .score {
      font-weight: 700;
      &.green {
        color: var(--success);
      }
    }
  }

  img {
    max-width: 200px;
    display: block;
    margin: 40px auto;
  }
  .btn-container {
    justify-content: space-between;
    margin: 0;
    @media screen and (max-width: $mobile) {
      flex-direction: column-reverse;
      align-items: center;
      gap: 30px;
    }
  }

  &-links-bottom {
    display: inline-block;
    margin-top: 15px;
    font-size: .75rem;
  }
}
</style>