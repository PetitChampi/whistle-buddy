<template>
  <div class="app-wrapper" :class="darkMode && 'dark-mode'">
    <RouterView name="FullPage" />
    <RouterView name="Navigation" />
    <div class="container">
      <RouterView name="MainContent" />
    </div>
    <RouterView name="Footer" />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useDarkModeStore } from "@/stores/darkMode";
import { storeToRefs } from 'pinia'

const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);
</script>
