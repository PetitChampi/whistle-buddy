<template>
  <div
    class="grid"
    :class="{
      'grid-3': (cards.length <= 6 && cards.length !== 4),
      'grid-4': (cards.length === 4 || cards.length >= 7),
      'grid-5': cards.length >= 9,
      'grid-6': cards.length >= 11,
    }"
  >
    <Card v-for="note in cards" :key="note.id" :note="note" class="grid-item" />
  </div>
  <div class="pagination">
    <div class="pagination-prev" @click="prev">
      <span class="icon-arrow_left"></span>
    </div>
    <div class="pagination-page">99 <span class="separator">/</span> 99</div>
    <div class="pagination-next" @click="next">
      <span class="icon-arrow_right"></span>
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/molecules/Card.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true
  }
});

// todo implement page navigation
function prev() {
  console.log("go prev");
}
function next() {
  console.log("go next");
}
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -10px;

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