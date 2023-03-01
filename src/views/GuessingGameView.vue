<template>
  <GameParams :gameType="'guessing'" v-if="!gameStarted" @@gameStarted="gameStarted = true" />
  <div v-else>Game on!</div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import GameParams from "@/components/GameParams.vue";

const gameStarted = ref<boolean>(false);
</script>