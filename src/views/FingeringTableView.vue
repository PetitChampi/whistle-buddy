<template>
  <div class="fingering-table-view">
    <FingeringTableControls />
    <div class="card-grid">
      <CardGrid :cards="cards" pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import FingeringTableControls from "@/components/FingeringTableControls.vue";
import CardGrid from "@/components/CardGrid.vue";
import { ref } from "vue";
import type { ICard } from "@/types/UiElements";

const cards = ref<ICard[]>([
  { id: 1, name: {en: 'A', fr: 'La'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 2, name: {en: 'B', fr: 'Si'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 3, name: {en: 'Gb', fr: 'Sol b'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 4, name: {en: 'C', fr: 'Do'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 5, name: {en: 'D#', fr: 'Ré #'}, fingering: [2, 2, 1, 0, 0, 0], octave: 2 },
  { id: 6, name: {en: 'E', fr: 'Mi'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 7, name: {en: 'Gb', fr: 'Sol b'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 8, name: {en: 'F', fr: 'Fa'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 9, name: {en: 'Gb', fr: 'Sol b'}, fingering: [2, 2, 1, 0, 0, 0], octave: 2 },
  { id: 10, name: {en: 'Gb', fr: 'Sol b'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
  { id: 11, name: {en: 'Gb', fr: 'Sol b'}, fingering: [2, 2, 1, 0, 0, 0], octave: 2 },
  { id: 12, name: {en: 'Gb', fr: 'Sol b'}, fingering: [2, 2, 1, 0, 0, 0], octave: 1 },
]);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.fingering-table-view {
  margin-top: 40px;
  @media screen and (max-width: $mobile) {
    margin-top: 30px;
  }
  .card-grid {
    margin-top: 50px;
  }
}
</style>