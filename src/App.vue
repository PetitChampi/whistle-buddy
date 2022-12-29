<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-wrapper">
    <RouterView name="FullPage" />
    <RouterView name="Navigation" />
    <div class="container">
      <RouterView name="MainContent" />
    </div>
    <RouterView name="Footer" />
  </div>
</template>
