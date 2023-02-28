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
</template>

<script setup>
import Card from "@/components/molecules/Card.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true
  }
});
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
</style>