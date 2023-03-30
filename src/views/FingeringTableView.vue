<template>
  <div class="fingering-table-view">
    <FingeringTableControls />
    <div class="card-grid">
      <CardGrid
        :cards="reactiveToShuffleCards"
        :pagination="currentCardsDynamic.length > fingTableParams.cardsPerPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FingeringTableControls from "@/components/FingeringTableControls.vue";
import CardGrid from "@/components/CardGrid.vue";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import type { ICard } from "@/types/MusicalDataTypes";

const paramsStore = useParamsStore();
const { fingTableParams, currentCardsDynamic } = storeToRefs(paramsStore);

const reactiveToShuffleCards = computed<ICard[]>(() => {
  const cardsToShuffle = currentCardsDynamic.value.slice();
  return fingTableParams.value.shuffle ?
    cardsToShuffle.sort(() => Math.random() - 0.5) :
    currentCardsDynamic.value;
});
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