<template>
  <div class="app-wrapper" :class="darkMode && 'dark-mode'">
    <RouterView name="FullPage" />
    <RouterView name="Navigation" />
    <div class="container">
      <RouterView v-slot="{ Component }" name="MainContent">
        <Transition name="fade" mode="out-in" @beforeLeave="transitionStore.transitionDelay = 300">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </div>
    <RouterView name="Footer" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useDarkModeStore } from "@/stores/darkMode";
import { useTransitionStore } from "@/stores/transition";
import { storeToRefs } from "pinia";

const darkModeStore = useDarkModeStore();
const transitionStore = useTransitionStore();
const { darkMode } = storeToRefs(darkModeStore);
</script>

<style lang="scss" scoped>
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity .3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
