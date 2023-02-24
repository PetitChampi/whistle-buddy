<template>
  <GameParams :gameType="'mixmatch'" v-if="!gameStarted" @gameStarted="gameStarted = true" />
  <div v-else>Game on!</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import GameParams from "@/components/GameParams.vue";

const gameStarted = ref(false);
</script>