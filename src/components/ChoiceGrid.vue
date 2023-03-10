<template>
  <div
    class="grid"
    :class="{
      // when showing fingerings only
      'grid-fing-4': valuesToShow === 'fingerings' && cards.length >= 7,
      'grid-fing-5': valuesToShow === 'fingerings' && cards.length >= 9,
      'grid-fing-6': valuesToShow === 'fingerings' && cards.length >= 11,
      // when showing notes only
      'grid-note-2': valuesToShow === 'notes',
      'grid-note-3': valuesToShow === 'notes' && [3, 5, 6, 9].includes(cards.length),
      'grid-note-4': valuesToShow === 'notes' && [7, 8, 10, 11, 12].includes(cards.length),
    }"
  >
    <Card
      v-for="note in cards"
      :key="note.id"
      :note="note"
      :noteOnly="valuesToShow === 'notes'"
      :fingeringOnly="valuesToShow === 'fingerings'"
      selectable
      :selected="selectedCard?.id === note.id"
      @@cardClicked="selectedCard = $event"
      class="grid-item"
      :class="{ 'grid-item-fing': valuesToShow === 'fingerings' }"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/molecules/Card.vue";
import type { ICard } from "@/types/UiElements";
import { ref } from "vue";

export interface IProps {
  cards: ICard[],
  valuesToShow?: "notes" | "fingerings"
}
const props = withDefaults(defineProps<IProps>(), {
  valuesToShow: "fingerings"
});

const selectedCard = ref<ICard | null>(null);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.grid {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  @media screen and (max-width: $mobile) {
    gap: 10px;
    margin: 0 -5px;
  }

  &-item {
    width: 120px;
    cursor: pointer;
    @media screen and (max-width: $mobile) {
      width: unset;
      flex-basis: calc((100% / 4) - 10px);
    }

    &-fing {
      flex-basis: min-content;
      @media screen and (max-width: $mobile) {
        flex-basis: calc((100% / 6) - 10px);
      }
    }
  }

  &-fing-4 {
    max-width: 300px;
  }
  &-fing-5 {
    max-width: 350px;
  }
  &-fing-6 {
    max-width: 450px;
  }

  &-note-2 {
    max-width: 300px;
  }
  &-note-3 {
    max-width: 400px;
  }
  &-note-4 {
    max-width: 550px;
  }
  @media screen and (max-width: $mobile) {
    &-note-2, &-note-3, &-note-4 {
      max-width: unset;
    }
    &-note-2 .grid-item {
      flex-basis: calc((100% / 2) - 10px);
    }
    &-note-3 .grid-item {
      flex-basis: calc((100% / 3) - 10px);
    }
    &-note-4 .grid-item {
      flex-basis: calc((100% / 4) - 10px);
    }
    &-fing-2, &-fing-3, &-fing-4 {
      max-width: unset;
    }
    &-fing-4 .grid-item {
      flex-basis: calc((100% / 4) - 10px);
    }
    &-fing-5 .grid-item {
      flex-basis: calc((100% / 5) - 10px);
    }
    &-fing-6 .grid-item {
      flex-basis: calc((100% / 6) - 10px);
    }
  }
}
</style>