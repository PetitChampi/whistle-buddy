<template>
  <div class="grid">
    <Card
      v-for="card in pairs"
      :key="card.uid"
      :note="card.cardData"
      fixedHeight
      :flashcard="!guessedPairs.includes(card)"
      :flipped="guessedPairs.includes(card)"
      :success="guessedPairs.includes(card)"
      class="grid-item"
      :noteOnly="card.cardType === 'note'"
      :fingeringOnly="card.cardType === 'fing'"
      @click="selectCard(card)"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/molecules/Card.vue";
import type { ICard } from "@/types/UiElements";
import { computed } from "vue";
import { ref } from "@vue/reactivity";

const props = defineProps<{
  cards: ICard[],
}>();

const selectedCard = ref<IPairItem | null>(null);
const guessedPairs = ref<IPairItem[]>([]);

interface IPairItem {
  uid: number,
  cardType: string,
  cardData: ICard
}
const pairs = computed<IPairItem[]>(() => {
  let i = 0;

  const fingerings = props.cards.map(card => {
    return { uid: ++i, cardType: "fing", cardData: {...card} }
  });
  const notes = props.cards.map(card => {
    return { uid: ++i, cardType: "note", cardData: {...card} }
  });

  const dedoubledCards = [...fingerings, ...notes];
  // Rudimentary shuffling, not as good as the Fisher Yates algorithm but fits on one line so yah
  return dedoubledCards.sort((a, b) => 0.5 - Math.random());
});

function selectCard(card: IPairItem) {
  if (!selectedCard.value) selectedCard.value = card;
  else if (selectedCard.value.uid === card.uid) selectedCard.value = null;
  else if (selectedCard.value.cardData.id === card.cardData.id) {
    guessedPairs.value.push(selectedCard.value, card);
    selectedCard.value = null;
  } else {
    // TODO reflip both cards
    selectedCard.value = null;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -10px;
  @media screen and (max-width: $mobile) {
    gap: 10px;
    margin: 0;
  }
  .grid-item {
    flex-basis: calc((100% / 6) - 20px);
    @media screen and (max-width: $mobile) {
      flex-basis: calc((100% / 4) - 10px);
      flex-grow: 1;
    }
  }
}
</style>