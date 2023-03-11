<template>
<div>
<!-- see above parent div for router transition -->
  <GameParams :gameType="'mixmatch'" v-if="!gameStarted" @@gameStarted="startGame" />
  <div v-if="gameStarted">
    <Transition>
      <div class="overlay" v-if="showOverlay">{{ $t("G_MIXM_INSTRUCTION") }}</div>
    </Transition>

    <div class="game">
      <div class="game-action">
        <h1 class="game-action-title">{{ $t("G_MIXM_INSTRUCTION") }}</h1>
        <div class="game-action-controls">
          <IconButton :icon="gamePaused ? 'play' : 'pause'" @click="togglePause" />
          <Timer />
        </div>
      </div>

      <div class="game-grid">
        <MixMatchGrid :cards="cards" class="cards" :class="{ 'paused-cards': gamePaused }" />
        <div v-if="gamePaused" class="pause">
          <p class="pause-title">{{ $t("G_MIXM_PAUSED") }}</p>
          <p class="pause-link" @click="togglePause">{{ $t("G_MIXM_RESUME") }}<span class="icon-play"></span></p>
        </div>
      </div>
    </div>

    <div class="popup" v-if="gameFinished">
      <div class="popup-content">
        <div v-if="victory">
          <h1 class="popup-title">{{ $t("G_MIXM_VICTORY") }}</h1>
        <p class="popup-subtitle" v-if="victory">{{ $t("G_MIXM_VIC_TIME", {min: 3, sec: 25}) }}</p>
        </div>
        <div v-else>
          <h1 class="popup-title">{{ $t("G_MIXM_LOSE") }}</h1>
          <p class="popup-subtitle">{{ $t("G_MIXM_LOSE_SUBTITLE") }}</p>
        </div>

        <img src="" alt="Mascot">
        <div class="btn-container">
          <CustomButton :btnText="$t('G_MIXM_FINISH_BACK_SET')" btnType="secondary" @click="backToSettings" />
          <CustomButton :btnText="$t('G_MIXM_FINISH_REPLAY')" @click="replay" />
        </div>
        <span class="popup-link">
          <RouterLink :to="{ name: 'fingeringTable' }">
            {{ $t("G_FINISH_BACK_TAB") }}
          </RouterLink>
        </span>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import GameParams from "@/components/GameParams.vue";
import IconButton from "@/components/molecules/IconButton.vue";
import Timer from "@/components/molecules/Timer.vue";
import MixMatchGrid from "@/components/MixMatchGrid.vue";
import CustomButton from "@/components/molecules/CustomButton.vue";
import type { ICard } from "@/types/UiElements";

const gameStarted = ref<boolean>(true);
const gamePaused = ref<boolean>(false);
const gameFinished = ref<boolean>(true);

const showOverlay = ref<boolean>(false);
const victory = ref<boolean>(false);

const cards = ref<ICard[]>([
  { id: 1, name: {en: 'A', fr: 'La'}, fingering: [2, 2, 2, 2, 2, 2], octave: 1 },
  { id: 2, name: {en: 'B', fr: 'Si'}, fingering: [2, 2, 2, 2, 2, 0], octave: 1 },
  { id: 3, name: {en: 'C', fr: 'Do'}, fingering: [2, 2, 2, 2, 0, 0], octave: 1 },
  { id: 4, name: {en: 'D', fr: 'Ré'}, fingering: [2, 2, 2, 0, 0, 0], octave: 1 },
  { id: 5, name: {en: 'E', fr: 'Mi'}, fingering: [2, 2, 0, 0, 0, 0], octave: 1 },
  { id: 6, name: {en: 'F', fr: 'Fa'}, fingering: [2, 0, 0, 0, 0, 0], octave: 1 },
  { id: 7, name: {en: 'G', fr: 'Sol'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 8, name: {en: 'G#', fr: 'Sol #'}, fingering: [0, 2, 2, 0, 0, 0], octave: 1 },
]);

function startGame() {
  gameStarted.value = true;
  showOverlay.value = true;
  setTimeout(() => {
    showOverlay.value = false;
  }, 2000)
}

function togglePause() {
  gamePaused.value = !gamePaused.value;
}

function backToSettings() {
  gameStarted.value = false;
  gameFinished.value = false;
}
function replay() {
  gameStarted.value = true;
  gameFinished.value = false;
}
</script>

<style lang="scss" scoped>
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
  user-select: none;
}

.game {
  margin-top: 40px;
  &-action {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;

    &-title {
      color: var(--text-standard);
      font-weight: 500;
      font-size: 2rem;
      margin: 0;
    }
    &-controls {
      display: flex;
      gap: 20px;
      align-items: flex-end;
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

      &-title {
        color: var(--text-intense);
        font-size: 2.5rem;
        font-weight: 500;
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

  &-content {
    background-color: var(--intensified-bg);
    border-radius: 10px;
    padding: 30px;
  }
  &-title {
    text-align: center;
    margin-bottom: 20px;
  }
  &-subtitle {
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
  }
  img {
    margin: 30px auto;
  }
  .btn-container {
    display: flex;
    gap: 50px;
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