<template>
  <main class="main" :class="{ light: !darkMode, dark: darkMode }">
    <div class="main-controls">
      <NonMusicalControls />
    </div>
    <div class="main-items">
      <div class="main-items-header">
        <h1 class="main-items-title">Whistle Buddy</h1>
        <p class="main-items-subtitle">{{ $t("SPLASH_SUBTITLE") }}</p>
      </div>
      <RouterLink :to="{ name: 'select' }">
        <button class="start-btn">
          <img v-imgpreload="`${baseUrl}img/flann-greet.png`" alt="Happy mascot">
          {{ $t('SPLASH_START') }}
        </button>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import NonMusicalControls from "@/components/NonMusicalControls.vue";
import { useDarkModeStore } from "@/stores/darkMode";
import { storeToRefs } from "pinia";

const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);

const baseUrl = import.meta.env.BASE_URL;
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.main {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
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

    &-header {
      text-align: center;
      margin: 20px 10px;
    }

    &-title {
      font-size: 6.25rem;
      line-height: 100%;
      color: var(--text-intense);
      text-shadow:
        var(--accent-contraster) 0 0 20px,
        var(--accent-contraster) 0 0 20px,
        var(--accent-contraster) 0 0 20px;
    }

    &-subtitle {
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: .5px;
      text-shadow:
        var(--accent-contraster) 0 0 5px,
        var(--accent-contraster) 0 0 10px,
        var(--accent-contraster) 0 0 15px,
        var(--accent-contraster) 0 0 20px,
        var(--accent-contraster) 0 0 25px;
    }

    a {
      border: none;
    }

    .start-btn {
      display: flex;
      gap: 15px;
      align-items: center;
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

      & img {
        width: 50px;
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

@media screen and (max-width: $mobile) {
  .main {
    &-controls {
      padding: 10px 20px;
    }
    &-items {
      padding-bottom: 100px;
      &-title {
        font-size: 3rem;
        text-align: center;
      }
      &-subtitle {
        font-size: 1.125rem;
      }
    }
    .start-btn {
      font-size: 1.25rem;
      padding: 15px 30px;
    }
  }
}
</style>