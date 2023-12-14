<template>
  <article class="card" :class="{ flashcard }" @click.stop="handleCardClick(note)">
    <div
      class="card-inner"
      :class="{ faceDown, flipped: props.flipped, selected: props.selected, error, success, fixed: fixedHeight }"
    >
      <div class="front">
        <div v-if="!noteOnly" class="card-fingerings">
          <div
            v-for="fing in note.fingerings"
            :key="fing.id"
            class="card-fingerings-item"
            :class="{ oct2: note.octave === 2 }"
          >
            <span
              v-for="(hole, index) in fing.holes"
              :key="index"
              class="card-fingerings-item-hole"
              :class="{ full: hole === 2, half: hole === 1 }"
            />
          </div>
        </div>
        <div
          v-if="
            ((route.name === 'fingeringTable' && !flashcard) ||
              route.name !== 'fingeringTable') &&
              !fingeringOnly
          "
          class="card-note"
        >
          <div class="card-note-title">
            <p class="card-note-en" :class="{ oct2: note.octave === 2 }">
              {{ formattedNameEn.charAt(0) }}
              <span class="alteration">{{ formattedNameEn.slice(1) }}</span>
            </p>
            <span
              v-if="route.name === 'fingeringTable'"
              v-tooltip="{ text: $t('GEN_PLAY_NOTE') }"
              class="icon-volume"
              @click.stop="playSound"
            />
          </div>
          <p v-if="generalParams.frNotation" class="card-note-fr">{{ formattedNameFr }}</p>
        </div>
      </div>

      <div class="back">
        <div v-if="route.name === 'fingeringTable'" class="card-note">
          <div class="card-note-title">
            <p class="card-note-en" :class="{ oct2: note.octave === 2 }">
              {{ formattedNameEn.charAt(0) }}
              <span class="alteration">{{ formattedNameEn.slice(1) }}</span>
            </p>
            <span
              v-if="route.name === 'fingeringTable'"
              v-tooltip="{ text: $t('GEN_PLAY_NOTE') }"
              class="icon-volume"
              @click.stop="playSound"
            />
          </div>
          <p v-if="generalParams.frNotation" class="card-note-fr">{{ formattedNameFr }}</p>
        </div>
        <div v-else class="filigrane">
          <div
            v-for="corner in ['tr', 'tl', 'br', 'bl']"
            :key="corner"
            class="corner"
            :class="corner"
            :style="{
              backgroundImage: `url('/img/knot-angle_${darkMode ? 'dark' : 'light'}.svg')`
            }"
          />
          <div
            class="center"
            :style="{
              backgroundImage: `url('/img/knot-center_${darkMode ? 'dark' : 'light'}.svg')`
            }"
          />
        </div>
      </div>
    </div>

    <span v-if="hasTick" class="tick" :class="{ error, success }" />
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import type { ICard } from "@/types/MusicalDataTypes";
import { useParamsStore } from "@/stores/params";
import { useDarkModeStore } from "@/stores/darkMode";
import { storeToRefs } from "pinia";

export interface IProps {
  note: ICard,
  faceDown?: boolean,
  flipped?: boolean,
  fingerings?: number,
  flashcard?: boolean,
  noteOnly?: boolean,
  fingeringOnly?: boolean,
  fixedHeight?: boolean,
  selectable?: boolean,
  selected?: boolean,
  success?: boolean,
  error?: boolean,
  hasTick?: boolean,
  errorMsg?: string
}
const props = withDefaults(defineProps<IProps>(), {
  fingerings: 1,
  flashcard: false,
  flipped: false,
  selected: false,
  errorMsg: ""
});

const paramsStore = useParamsStore();
const { generalParams } = storeToRefs(paramsStore);
const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);

const route = useRoute();
const emit = defineEmits(["@select", "@flip"]);

const formattedNameEn = computed(() => (
  props.note.name.en.charAt(0).toUpperCase() + props.note.name.en.slice(1)
));
const formattedNameFr = computed(() => (
  props.note.name.fr.charAt(0).toUpperCase() + props.note.name.fr.slice(1)
));

function handleCardClick(card: ICard) {
  if (props.flashcard) emit("@flip", !props.flipped);
  if (props.selectable) emit("@select", { selected: props.selected, card });
}

function playSound() {
  let sound = new Audio(
    `./sounds/${generalParams.value.instrument}/${encodeURIComponent(props.note.soundUrl)}`
  );
  sound.play();
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.card {
  position: relative;
  // flashcard styles
  perspective: 1000px;
  transition: transform ease .2s;

  &-inner {
    border-radius: 10px;
    transform-style: preserve-3d;
    border: 2px solid transparent;
    transition: transform ease .2s;
    &.faceDown, &.flipped {
      transform: rotateY(180deg);
    }
    &.faceDown.flipped {
      transform: rotateY(0deg);
    }
    &.selected {
      border: 2px solid var(--accent);
      transition: border ease .2s, transform ease .3s;
    }
    &.error {
      border: 2px solid var(--error);
    }
    &.success {
      border: 2px solid var(--success);
    }
    &.fixed {
      height: 140px;
      @media screen and (max-width: $mobile) {
        height: 110px;
      }
    }
  }

  .front {
    gap: 20px;
  }
  .front, .back {
    width: 100%;
    height: 100%;
    background-color: var(--intensified-bg);
    border-radius: 8px;
    box-shadow: var(--card-shadow-desktop);
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
    @media screen and (max-width: $mobile) {
      padding: 15px 5px;
      box-shadow: var(--card-shadow-mobile);
    }
  }
  .back {
    position: absolute;
    top: 0;
    transform: rotateY(180deg);
  }

  &-note {
    text-align: center;

    &-title {
      display: flex;
      align-items: center;
      gap: 5px;

      .icon-volume {
        color: var(--text-standard-half-transparent);
        font-size: .875rem;
        cursor: pointer;
      }
    }
    &-en {
      font-size: 1.5rem;
      font-weight: 700;
      display: flex;
      @media screen and (max-width: $mobile) {
        font-size: 1.25rem;
      }
      & .alteration {
        font-size: .7em;
      }
    }
    &-fr {
      font-size: .875rem;
    }
    & .oct2::after {
      content: "+";
      font-size: .6em;
      font-weight: normal;
      align-self: center;
    }
  }

  &-fingerings {
    display: flex;
    gap: 20px;
    justify-content: center;
    @media screen and (max-width: $mobile) {
      gap: 15px;
    }

    &-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
      position: relative;
      @media screen and (max-width: $mobile) {
        gap: 3px;
      }

      &.oct2::after {
        content: "+";
        font-size: .875rem;
        position: absolute;
        bottom: -14px;
        @media screen and (max-width: $mobile) {
          font-size: .75rem;
          bottom: -12px;
        }
      }

      &-hole {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        border: 1px solid var(--text-standard);
        overflow: hidden;
        position: relative;
        @media screen and (max-width: $mobile) {
          height: 9px;
          width: 9px;
        }

        &.full {background-color: var(--text-standard);}
        &.half::before {
          content: "";
          position: absolute;
          background-color: var(--text-standard);
          height: 100%;
          width: 50%;
        }
      }
    }
  }
}
.filigrane {
  --corner-size: 25%;
  --center-size: 50%;
  --corner-offset: 4%;
  .corner {
    position: absolute;
    width: var(--corner-size);
    aspect-ratio: 1;
    background-image: url("/img/knot-angle_light.svg");
    background-size: cover;
    opacity: .1;
  }
  .tr { top: var(--corner-offset); right: var(--corner-offset); }
  .tl { top: var(--corner-offset); left: var(--corner-offset); transform: rotate(270deg); }
  .br { bottom: var(--corner-offset); right: var(--corner-offset); transform: rotate(90deg); }
  .bl { bottom: var(--corner-offset); left: var(--corner-offset); transform: rotate(180deg); }
  .center {
    position: absolute;
    width: var(--center-size);
    aspect-ratio: 1;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    background-size: cover;
    opacity: .1;
  }
}
.flashcard {
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    @media screen and (max-width: $mobile) {
      transform: unset;
    }
  }
}

.error-msg {
  color: var(--error);
  font-size: .875rem;
  margin-top: 5px;
}
.tick {
  &.success, &.error {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 2px solid var(--intensified-bg);
    border-radius: 50%;
    position: absolute;
    top: -5px;
    right: -5px;
  }
  &.success {
    background-color: var(--success);
    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 4px;
      border-bottom: 2px solid var(--intensified-bg);
      border-left: 2px solid var(--intensified-bg);
      transform: rotate(-45deg);
      position: absolute;
      left: 25%;
      top: 30%;
    }
  }
  &.error {
    background-color: var(--error);
    &::before, &::after {
      content: "";
      display: inline-block;
      width: 12px;
      height: 2px;
      border-radius: 10px;
      background-color: var(--intensified-bg);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>