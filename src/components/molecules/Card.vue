<template>
  <article class="card" :class="{ flashcard }" @click="flipCard">
    <div class="card-inner" :class="{ flipped: isFlipped }">
      <div class="front">
        <div class="card-fingering" :class="{ oct2: note.octave === 2 }">
          <span
            class="card-fingering-hole"
            v-for="(hole, index) in note.fingering"
            :key="index"
            :class="{ full: hole === 2, half: hole === 1 }"
          ></span>
        </div>
        <div class="card-note" v-if="
          (route.name === 'fingeringTable' && !flashcard) ||
          route.name !== 'fingeringTable'
        ">
          <div class="card-note-title">
            <p class="card-note-en">{{ note.name.en }}</p>
            <span class="icon-volume" @click="playSound"></span>
          </div>
          <p class="card-note-fr">{{ note.name.fr }}</p>
        </div>
      </div>
      <div class="back" v-if="flashcard">
        <div class="card-note" v-if="route.name === 'fingeringTable'">
          <p class="card-note-en">{{ note.name.en }}</p>
          <p class="card-note-fr">{{ note.name.fr }}</p>
        </div>
        <div v-else>back</div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  note: {
    type: Object,
    required: true
  },
  flipped: {
    type: Boolean,
    default: false
  },
  fingerings: {
    type: Number,
    default: 1
  },
  flashcard: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();

const isFlipped = ref<boolean>(props.flipped);

function flipCard() {
  if (!props.flashcard) return;
  isFlipped.value = !isFlipped.value;
}

function playSound() {
  // todo replace with actual sound
  console.log(`${props.note.name.en} played`);
}
</script>

<style lang="scss" scoped>
.card {
  &-inner {
    background-color: var(--intensified-bg);
    border-radius: 10px;
    box-shadow: var(--card-shadow-desktop);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .front {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    }

    &-hole {
      height: 12px;
      width: 12px;
      border-radius: 50%;
      border: 1px solid var(--text-standard);
      overflow: hidden;
      position: relative;

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
  perspective: 1000px;
  cursor: pointer;
  transition: transform ease .2s;

  .card-inner {
    transition: transform ease .3s;
    transform-style: preserve-3d;
  }
  .card-inner.flipped {
    transform: rotateY(180deg);
  }

  .front, .back {
    backface-visibility: hidden;
  }
  .back {
    position: absolute;
    transform: rotateY(180deg);
  }

  &:hover {
    transform: translateY(-3px);
  }
}
</style>