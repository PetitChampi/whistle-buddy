<template>
  <div class="grid">
    <Card
      v-for="card in pairs"
      :key="card.uid"
      :note="card.cardData"
      faceDown
      fixedHeight
      :flashcard="!guessedPairs.includes(card)"
      :flipped="card.isFlipped"
      @@flip="card.isFlipped = $event"
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
import type { ICard } from "@/types/MusicalDataTypes";
import { watch } from "vue";
import { ref } from "@vue/reactivity";

const props = defineProps<{
  cards: ICard[],
}>();

const emit = defineEmits(["@allGuessed"]);

const selectedCard = ref<IPairItem | null>(null);
const guessedPairs = ref<IPairItem[]>([]);

interface IPairItem {
  uid: number,
  cardType: string,
  isFlipped: boolean,
  cardData: ICard
}
const pairs = ref<IPairItem[]>(getPairs(props.cards));

function getPairs(cards: ICard[]): IPairItem[] {
  let i = 0;

  const fingerings = cards.map(card => {
    return { uid: ++i, cardType: "fing", isFlipped: false, cardData: {...card} }
  });
  const notes = cards.map(card => {
    return { uid: ++i, cardType: "note", isFlipped: false, cardData: {...card} }
  });

  const dedoubledCards = [...fingerings, ...notes];
  // Rudimentary shuffling, not as good as the Fisher Yates algorithm but fits on one line so yah
  return dedoubledCards.sort((a, b) => 0.5 - Math.random());
}

function selectCard(card: IPairItem) {
  if (!selectedCard.value) selectedCard.value = card;
  else if (selectedCard.value.uid === card.uid) selectedCard.value = null;
  else if (selectedCard.value.cardData.id === card.cardData.id) {
    guessedPairs.value.push(selectedCard.value, card);
    selectedCard.value = null;
    if (guessedPairs.value.length === pairs.value.length) {
      emit("@allGuessed");
      guessedPairs.value = [];
    };
  } else {
    const currCard = pairs.value.find(card => card.uid === selectedCard.value?.uid) as IPairItem;
    setTimeout(() => {
      currCard.isFlipped = false;
      card.isFlipped = false;
    }, 400);
    selectedCard.value = null;
  }
}

watch(() => props.cards, (newCards) => {
    pairs.value = getPairs(newCards);
  }
);
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
    margin: -5px;
  }
  .grid-item {
    flex-basis: calc((100% / 6) - 20px);
    @media screen and (max-width: $mobile) {
      flex-basis: calc((100% / 4) - 10px);
    }
  }
}
</style>