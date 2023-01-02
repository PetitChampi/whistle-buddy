<template>
  <ModeToggle />
  <ListDropdown
    :options="langOptions"
    :defaultSelectedOption="'en'"
    :closeOnInteraction="true"
  />
</template>

<script setup>
import ModeToggle from "@/components/molecules/ModeToggle.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import { ref } from "@vue/reactivity";

// Todo: replace w/ state
const langOptions = ref([
  { value: "en", displayValue: "EN" },
  { value: "fr", displayValue: "FR" }
]);
</script>

<style>

</style>