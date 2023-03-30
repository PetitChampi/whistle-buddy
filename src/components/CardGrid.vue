<template>
  <div
    class="grid"
    :class="{
      // desktop
      'grid-3': (paginatedCards.length <= 6 && paginatedCards.length !== 4),
      'grid-4': (paginatedCards.length === 4 || paginatedCards.length >= 7),
      'grid-5': paginatedCards.length >= 9,
      'grid-6': paginatedCards.length >= 11,
      // mobile
      'grid-mob-2': [1, 2].includes(paginatedCards.length),
      'grid-mob-3': [3, 5, 6, 9].includes(paginatedCards.length)
    }"
  >
    <Card
      v-for="note in paginatedCards"
      :key="note.id"
      :note="note"
      class="grid-item"
      :flashcard="fingTableParams.flashcardMode"
      :flipped="fingTableParams.flashcardMode && fingTableParams.flashcardSide === 'notes'"
    />
  </div>
  <div class="pagination" v-if="pagination">
    <div class="pagination-prev" @click="prev">
      <span class="icon-arrow_left"></span>
    </div>
    <div class="pagination-page">{{ currentPage }} <span class="separator">/</span> {{ lastPage }}</div>
    <div class="pagination-next" @click="next">
      <span class="icon-arrow_right"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/molecules/Card.vue";
import type { ICard } from "@/types/MusicalDataTypes";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";
import { ref, computed, watch } from "vue";

const props = defineProps<{
  cards: ICard[],
  pagination?: boolean
}>();

const paramsStore = useParamsStore();
const { fingTableParams } = storeToRefs(paramsStore);

const cards = computed<ICard[]>(() => props.cards);
const currentPage = ref<number>(1);
const cardsPerPage = computed<number>(() => fingTableParams.value.cardsPerPage);
const lastPage = computed<number>(() => Math.ceil(props.cards.length / cardsPerPage.value));

const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * cardsPerPage.value;
  const end = start + cardsPerPage.value;
  return cards.value.slice(start, end);
});

function prev() {
  if (currentPage.value > 1) currentPage.value--;
  else currentPage.value = lastPage.value;
}
function next() {
  if (currentPage.value < lastPage.value) currentPage.value++;
  else currentPage.value = 1;
}

watch(() => lastPage.value, (newLastPage, oldLastPage) => {
  if (
    currentPage.value > newLastPage && oldLastPage > newLastPage
  ) currentPage.value = newLastPage;
});
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
    gap: 15px 10px;
    margin: 0 -5px;
  }

  &-3 .grid-item {
    flex-basis: calc((100% / 3) - 20px);
  }
  &-4 .grid-item {
    flex-basis: calc((100% / 4) - 20px);
  }
  &-5 .grid-item {
    flex-basis: calc((100% / 5) - 20px);
  }
  &-6 .grid-item {
    flex-basis: calc((100% / 6) - 20px);
  }

  @media screen and (max-width: $mobile) {
    &-3 .grid-item, &-4 .grid-item, &-5 .grid-item, &-6 .grid-item {
      flex-basis: unset;
    }
    .grid-item {
      flex-basis: calc((100% / 4) - 10px);
    }
    &-mob-2 .grid-item {
      flex-basis: calc((100% / 2) - 10px);
    }
    &-mob-3 .grid-item {
      flex-basis: calc((100% / 3) - 10px);
    }
  }
}

.pagination {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  &-prev, &-next {
    background-color: var(--intensified-bg);
    border-radius: 10px;
    padding: 10px 15px;
    box-shadow: var(--button-shadow);
    cursor: pointer;
    transition: filter ease .2s;
  
    &:hover {
      filter: brightness(1.3);
    }
  }

  &-page {
    width: 100px;
    display: flex;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 500;

    .separator {
      display: inline-block;
      margin: 0 10px;
      font-weight: 200;
    }
  }
}
</style>