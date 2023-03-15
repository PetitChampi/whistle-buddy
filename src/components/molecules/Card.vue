<template>
  <article class="card" :class="{ flashcard }" @click="handleCardClick(note)">
    <div
      class="card-inner"
      :class="{ flipped: flashcard && isFlipped, selected: isSelected, error, success, fixed: fixedHeight }"
    >
      <div class="front">
        <div v-if="!noteOnly" class="card-fingering" :class="{ oct2: note.octave === 2 }">
          <span
            class="card-fingering-hole"
            v-for="(hole, index) in note.fingering"
            :key="index"
            :class="{ full: hole === 2, half: hole === 1 }"
          ></span>
        </div>
        <div class="card-note" v-if="
          ((route.name === 'fingeringTable' && !flashcard) ||
          route.name !== 'fingeringTable') &&
          !fingeringOnly
        ">
          <div class="card-note-title">
            <p class="card-note-en">{{ note.name.en }}</p>
            <span
              class="icon-volume"
              v-if="route.name === 'fingeringTable'"
              @click.stop="playSound"
            ></span>
          </div>
          <p class="card-note-fr" v-if="generalParams.frNotation">{{ note.name.fr }}</p>
        </div>
      </div>

      <div class="back">
        <div class="card-note" v-if="route.name === 'fingeringTable'">
          <div class="card-note-title">
            <p class="card-note-en">{{ note.name.en }}</p>
            <span
              class="icon-volume"
              v-if="route.name === 'fingeringTable'"
              @click.stop="playSound"
            ></span>
          </div>
          <p class="card-note-fr" v-if="generalParams.frNotation">{{ note.name.fr }}</p>
        </div>
        <div v-else>back of the card</div>
      </div>
    </div>

    <span v-if="hasTick" class="tick" :class="{ error, success }"></span>
    <p class="error-msg" v-if="errorMsg">{{ errorMsg }}</p>
  </article>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { ICard } from "@/types/UiElements";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";

export interface IProps {
  note: ICard,
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
  selected: false
});

const paramsStore = useParamsStore();
const { generalParams } = storeToRefs(paramsStore);

const route = useRoute();
const emit = defineEmits(["@cardClicked"]);

const isFlipped = ref<boolean>(props.flipped);
const isSelected = ref<boolean>(props.selected);

function handleCardClick(card: ICard) {
  if (props.flashcard) isFlipped.value = !isFlipped.value;
  if (props.selectable) isSelected.value = !isSelected.value;
  emit("@cardClicked", isSelected.value ? card : null);
}

function playSound() {
  // todo replace with actual sound
  console.log(`${props.note.name.en} played`);
}

watch(() => props.selected, (newVal) => {
  isSelected.value = newVal;
});
watch(() => props.flipped, (newVal) => {
  isFlipped.value = newVal;
});
watch(() => props.flashcard, (newVal) => {
  if (!newVal) isFlipped.value = newVal;
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.card {
  position: relative;
  // flashcard styles
  perspective: 1000px;
  transition: transform ease .2s;

  &-inner {
    background-color: var(--intensified-bg);
    border-radius: 10px;
    box-shadow: var(--card-shadow-desktop);
    padding: 18px;
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: border ease .2s, transform ease .3s;
    transform-style: preserve-3d;
    @media screen and (max-width: $mobile) {
      padding: 15px 5px;
      box-shadow: var(--card-shadow-mobile);
    }

    &.flipped {
      transform: rotateY(180deg);
    }
    &.selected {
      border: 2px solid var(--accent);
    }
    &.error {
      border: 2px solid var(--error);
    }
    &.success {
      border: 2px solid var(--success);
    }
    &.fixed {
      height: 140px;
    }
  }

  .front {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .front, .back {
    backface-visibility: hidden;
  }
  .back {
    position: absolute;
    transform: rotateY(180deg);
  }

  &-note {
    text-align: center;

    &-title {
      display: flex;
      align-items: center;
      gap: 7px;

      .icon-volume {
        color: var(--text-standard-half-transparent);
        font-size: .875rem;
        cursor: pointer;
      }
    }
    &-en {
      font-size: 1.5rem;
      font-weight: 700;
      @media screen and (max-width: $mobile) {
        font-size: 1.25rem;
      }
    }
    &-fr {
      font-size: .875rem;
    }
  }

  &-fingering {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    position: relative;

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