<template>
  <div class="sticky-container">
    <nav class="navigation">
      <div class="navigation-controls">
        <ListDropdown
          :options="keyOptions"
          :defaultSelectedOption="'d'"
          :closeOnInteraction="true"
        />
        <SettingsDropdown />
      </div>
      <div class="navigation-links">
        <RouterLink :to="{ name: 'fingeringTable' }">
          <div class="navigation-links-item">{{ $t('GEN_FINGERING_TABLE') }}</div>
        </RouterLink>
        <RouterLink :to="{ name: 'guessingGame' }">
          <div class="navigation-links-item">{{ $t('GEN_GUESSING_GAME') }}</div>
        </RouterLink>
        <RouterLink :to="{ name: 'mixOrMatch' }">
          <div class="navigation-links-item">{{ $t('GEN_MIX_OR_MATCH') }}</div>
        </RouterLink>
      </div>
      <div class="navigation-controls">
        <NonMusicalControls />
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import SettingsDropdown from "@/components/molecules/SettingsDropdown.vue";
import NonMusicalControls from "@/components/NonMusicalControls.vue";
import { ref } from "@vue/reactivity";
import type { IOption } from "@/types/UiElements";

// Todo: replace w/ state
const keyOptions = ref<IOption[]>([
  { value: "a", displayValue: "A" },
  { value: "b", displayValue: "B" },
  { value: "c", displayValue: "C" },
  { value: "d", displayValue: "D" }
]);
</script>

<style lang="scss" scoped>
.sticky-container {
  position: sticky;
  top: 0;
  z-index: 10;
}
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
      font-weight: 400;
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

  &-controls {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>