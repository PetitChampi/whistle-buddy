<template>
  <div class="mode-toggle" @click="switchMode">
    <span class="mode-toggle-sun" v-if="darkMode">sun</span>
    <span class="mode-toggle-moon" v-else>moon</span>
  </div>
</template>

<script setup>
import { useDarkModeStore } from "@/stores/darkMode";
import { storeToRefs } from 'pinia'

const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);
const { switchMode } = darkModeStore;
</script>

<style>

</style>