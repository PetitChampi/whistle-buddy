<template>
  <div>
    <!-- see above parent div for router transition -->
    <GameParams v-if="!gameStarted" :gameType="'mixmatch'" @@gameStarted="startGame" />
    <div v-if="gameStarted">
      <Transition>
        <div v-if="showOverlay" class="overlay">{{ $t("G_MIXM_INSTRUCTION") }}</div>
      </Transition>

      <div class="game">
        <div class="game-action">
          <h1 class="game-action-title">{{ $t("G_MIXM_INSTRUCTION") }}</h1>
          <div v-if="mixMatchParams.timer" class="game-action-controls">
            <IconButton
              v-tooltip="{ text: tooltipText }"
              :icon="gamePaused ? 'play' : 'pause'"
              @click="togglePause"
            />
            <Timer
              :maxValue="mixMatchParams.timerValues.current * 60"
              :minValue="0"
              :value="timeRemaining"
            />
          </div>
        </div>

        <div class="game-grid">
          <MixMatchGrid
            :cards="cards"
            class="cards"
            :class="{ 'paused-cards': gamePaused }"
            @@allGuessed="finishGame(true)"
          />
          <div v-if="gamePaused" class="pause">
            <p class="pause-title">{{ $t("G_MIXM_PAUSED") }}</p>
            <p class="pause-link" @click="togglePause">{{ $t("G_MIXM_RESUME") }}<span class="icon-play" /></p>
          </div>
        </div>
      </div>

      <Transition>
        <div v-if="gameFinished" class="popup">
          <div class="popup-content">
            <div v-if="victory">
              <h1 class="popup-title">{{ $t("G_MIXM_VICTORY") }}</h1>
              <p v-if="mixMatchParams.timer" class="popup-subtitle">
                {{ $t("G_MIXM_VIC_TIME", {
                  min: Math.floor(timeSpent / 60), sec: timeSpent - Math.floor(timeSpent / 60)
                }) }}
              </p>
            </div>
            <div v-else>
              <h1 class="popup-title">{{ $t("G_MIXM_LOSE") }}</h1>
              <p class="popup-subtitle">{{ $t("G_MIXM_LOSE_SUBTITLE") }}</p>
            </div>

            <img v-if="victory" v-imgpreload="`${baseUrl}img/flann-happy.png`" alt="Mascot">
            <img v-else v-imgpreload="`${baseUrl}img/flann-think.png`" alt="Mascot">

            <div class="btn-container">
              <CustomButton :btnText="$t('G_MIXM_FINISH_BACK_SET')" btnType="secondary" @click="backToSettings" />
              <CustomButton :btnText="$t('G_MIXM_FINISH_REPLAY')" @click="startGame" />
            </div>
            <span class="popup-link">
              <RouterLink :to="{ name: 'fingeringTable' }">
                {{ $t("G_FINISH_BACK_TAB") }}
              </RouterLink>
            </span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import GameParams from "@/components/GameParams.vue";
import IconButton from "@/components/molecules/IconButton.vue";
import Timer from "@/components/molecules/Timer.vue";
import MixMatchGrid from "@/components/MixMatchGrid.vue";
import CustomButton from "@/components/molecules/CustomButton.vue";
import type { ICard } from "@/types/MusicalDataTypes";
import { useI18n } from "vue-i18n";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";

const params = useParamsStore();
const { currentCardsPerFings, mixMatchParams } = storeToRefs(params);

const { t } = useI18n({ useScope: "global" });

const baseUrl = import.meta.env.BASE_URL;

const gameStarted = ref<boolean>(false);
const gamePaused = ref<boolean>(false);
const gameFinished = ref<boolean>(false);
const showOverlay = ref<boolean>(false);
const victory = ref<boolean>(false);

let counter: ReturnType<typeof setInterval>;
const timeRemaining = ref<number>(getTimeRemaining());
const timeSpent = computed<number>(() => {
  return mixMatchParams.value.timerValues.current * 60 - timeRemaining.value;
});

const tooltipText = computed<string>(() => {
  return gamePaused.value ? t("G_MIXM_RESUME") : t("G_MIXM_PAUSE_GAME");
});

const cards = ref<ICard[]>(getCards());

function getCards() {
  return currentCardsPerFings.value.slice(0, mixMatchParams.value.nbOfPairs.current);
}
function getTimeRemaining() { return mixMatchParams.value.timerValues.current * 60 }

function startGame() {
  window.scrollTo(0, 0);
  cards.value = getCards();
  timeRemaining.value = getTimeRemaining();
  gameFinished.value = false;
  victory.value = false;
  gameStarted.value = true;
  showOverlay.value = true;
  setTimeout(() => {
    showOverlay.value = false;
    if (mixMatchParams.value.timer) counter = setInterval(tickTimer, 1000);
  }, 1500);
}

function tickTimer() {
  timeRemaining.value = timeRemaining.value - 1;
  if (timeRemaining.value <= 0) {
    finishGame(false);
    return;
  }
}

function togglePause() {
  gamePaused.value = !gamePaused.value;
  gamePaused.value ? clearInterval(counter) : counter = setInterval(tickTimer, 1000);
}

function finishGame(hasWon: boolean) {
  if (hasWon) victory.value = true;
  gameFinished.value = true;
  clearInterval(counter);
}

function backToSettings() {
  gameStarted.value = false;
  gameFinished.value = false;
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--overlay-bg);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--accent-contraster);
  font-size: 3rem;
  font-weight: 700;
  padding: 20px;
  user-select: none;
  @media screen and (max-width: $mobile) {
    font-size: 2rem;
    text-align: center;
  }
}

.game {
  margin-top: 40px;
  @media screen and (max-width: $mobile) {
    margin-top: 70px;
  }

  &-action {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
    @media screen and (max-width: $mobile) {
      flex-direction: column-reverse;
      align-items: stretch;
      gap: 10px;
    }

    &-title {
      color: var(--text-standard);
      font-weight: 500;
      font-size: 2rem;
      margin: 0;
      text-align: center;
      @media screen and (max-width: $mobile) {
        font-size: 1.5rem;
      }
    }
    &-controls {
      display: flex;
      gap: 20px;
      align-items: flex-end;
      @media screen and (max-width: $mobile) {
        justify-content: space-between;
        position: fixed;
        top: 70px;
        right: 20px;
        left: 20px;
        z-index: 5;
      }
    }
  }
  &-grid {
    position: relative;
    .cards {
      transition: opacity .2s;
    }
    .paused-cards {
      pointer-events: none;
      opacity: .4;
    }
    .pause {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--intensified-bg);
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: var(--card-shadow-desktop);
      text-align: center;
      @media screen and (max-width: $mobile) {
        padding: 15px 20px;
        width: max-content;
      }

      &-title {
        color: var(--text-intense);
        font-size: 2.5rem;
        font-weight: 500;
        @media screen and (max-width: $mobile) {
          font-size: 1.75rem;
        }
      }
      &-link {
        color: var(--accent);
        cursor: pointer;
        margin-top: 10px;
        display: inline-flex;
        align-items: center;
        .icon-play {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 15px;
          width: 15px;
          font-size: .5rem;
          margin: 2px 0 0 5px;
          padding-left: 2px;
          border: 1px solid var(--accent);
          border-radius: 50%;
        }
      }
    }
  }
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--overlay-bg);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media screen and (max-width: $mobile) {
    text-align: center;
  }

  &-content {
    background-color: var(--intensified-bg);
    border-radius: 10px;
    padding: 30px;
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
    font-weight: 500;
    @media screen and (max-width: $mobile) {
      font-size: 1rem;
    }
  }
  img {
    max-width: 100px;
    display: block;
    margin: 30px auto;
  }
  .btn-container {
    display: flex;
    gap: 50px;
    @media screen and (max-width: $mobile) {
      flex-direction: column-reverse;
      align-items: center;
      gap: 30px;
    }
  }
  &-link {
    display: inline-block;
    margin-top: 15px;
    font-size: .75rem;
  }
}

// transition classes
.v {
  &-enter-active,
  &-leave-active {
    transition: opacity .4s ease, transform .4s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(1.5);
  }
}
</style>