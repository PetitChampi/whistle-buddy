<template>
  <main class="main" :class="{ light: !darkMode, dark: darkMode }">
    <div class="main-controls">
      <NonMusicalControls />
    </div>
    <div class="main-items">
      <h1 class="main-items-title">Whistle Buddy</h1>
      <RouterLink :to="{ name: 'select' }">
        <button class="start-btn">Start here</button>
      </RouterLink>
    </div>
  </main>
</template>

<script setup>
import NonMusicalControls from "@/components/NonMusicalControls.vue";
import { useDarkModeStore } from "@/stores/darkMode";
import { storeToRefs } from 'pinia'

const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: background-image .5s ease;

  &.light {
    background-image: url("../assets/img/backdrop-light.png");
  }
  &.dark {
    background-image: url("../assets/img/backdrop-dark.png");
  }

  &-controls {
    display: flex;
    justify-content: flex-end;
    padding: 15px 30px;
  }
  &-items {
    flex-grow: 1;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 6.25rem;
      line-height: 100%;
      color: var(--text-intense);
      text-shadow:
        var(--accent-contraster) 0 0 20px,
        var(--accent-contraster) 0 0 20px,
        var(--accent-contraster) 0 0 20px;
    }

    a {
      border: none;
    }

    .start-btn {
      font-family: inherit;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
      background-color: #fff;
      border-radius: 50px;
      padding: 20px 30px;
      border: none;
      box-shadow: #fff 0 2px 15px 2px;
      cursor: pointer;
      animation: float 5s ease infinite;
      transition: box-shadow .2s ease;

      &:hover {
        box-shadow: #fff 0 2px 20px 5px;
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>