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
  valuesToShow: "notes"
});

const selectedCard = ref<ICard | null>(null);
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;

  &-item {
    max-width: min-content;
    cursor: pointer;
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
    max-width: 500px;
  }
}
</style>