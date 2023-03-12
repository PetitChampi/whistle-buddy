<template>
  <div class="sticky-container">
    <nav class="navigation" :class="{ open }">
      <div class="navigation-controls">
        <ListDropdown
          :options="keyOptions"
          :defaultSelectedOption="'d'"
          :closeOnInteraction="true"
        />
        <SettingsDropdown />
      </div>

      <div class="burger" @click="toggleOpen"></div>

      <div class="navigation-menu">
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
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const open = ref<boolean>(false);

const keyOptions = ref<IOption[]>([
  { value: "a", displayValue: "A" },
  { value: "b", displayValue: "B" },
  { value: "c", displayValue: "C" },
  { value: "d", displayValue: "D" }
]);

function toggleOpen() {
  open.value = !open.value;
}

watch(() => route.name, () => {
  open.value && toggleOpen();
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

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

@media screen and (max-width: $mobile) {
  .burger {
    &, &::before, &::after {
      display: block;
      height: 2px;
      width: 30px;
      background-color: var(--text-standard);
      border-radius: 10px;
      transition: .3s;
    }
    &::before {
      content: "";
      transform: translateY(-12px);
    }
    &::after {
      content: "";
      transform: translateY(10px);
    }
  }
  .navigation {
    align-items: center;
    padding: 10px 20px;
    &-menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      padding: 30px 20px 20px;
      background-color: var(--faint);
      visibility: hidden;
      opacity: 0;
      transition: visibility ease .3s, opacity ease .3s;
      .navigation-controls {
        margin-top: 40px;
      }
    }
    &-links {
      position: unset;
      transform: unset;
      flex-direction: column;
      gap: 20px;
      align-items: start;
    }
    &-controls {
      gap: 10px;
    }
  }
  .navigation.open {
    & > .burger {
      background-color: transparent;
      &::before {
        transform: translateY(0) rotate(45deg);
      }
      &::after {
        transform: translateY(-2px) rotate(135deg);
      }
    }
    .navigation-menu {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>