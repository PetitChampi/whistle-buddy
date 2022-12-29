<template>
  <nav class="navigation">
    <ListDropdown :options="carOptions" :closeOnInteraction="true" />
    <div class="navigation-links">
      <RouterLink :to="{ name: 'fingeringTable' }">
        <div class="navigation-links-item">Fingering table</div>
      </RouterLink>
      <RouterLink :to="{ name: 'guessingGame' }">
        <div class="navigation-links-item">Guessing game</div>
      </RouterLink>
      <RouterLink :to="{ name: 'mixOrMatch' }">
        <div class="navigation-links-item">Mix-or-match</div>
      </RouterLink>
    </div>
    <Dropdown>
      <template v-slot:dropdown-title>bruh</template>
      <template v-slot:dropdown-content>
        double bruh
      </template>
    </Dropdown>
  </nav>
</template>

<script setup>
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import Dropdown from "@/components/molecules/Dropdown.vue";
import { ref } from "@vue/reactivity";

const carOptions = ref([
  { value: "tesla", displayValue: "Tesla" },
  { value: "volkswagen", displayValue: "Volkswagen" },
  { value: "mercedes", displayValue: "Mercedes" },
  { value: "mitsubishi", displayValue: "Mitsubishi" }
]);
</script>

<style lang="scss">
.navigation {
  padding: 15px 30px;
  background-color: var(--faint);
  display: flex;
  justify-content: space-between;
  position: relative;

  &-links {
    display: flex;
    gap: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &-item {
      font-size: 1.125rem;
    }
    .router-link-active {
      border-bottom: 2px solid var(--text-standard-half-transparent);
    }
    a {
      text-decoration: none;
      color: var(--text-standard);
      transition: color ease .2s;
      border-bottom: 2px solid transparent;
      &:hover {
        color: var(--text-intense);
      }
    }
  }
}
</style>