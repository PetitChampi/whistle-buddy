<template>
  <div class="card" @click="goToLink">
    <div class="card-image">
      <img src="https://via.placeholder.com/500" alt="" class="placeholder-contain">
    </div>
    <h2 class="card-title">{{ props.cardTitle }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps({
  cardTitle: {
    type: String,
    default: "Card title",
  },
  toPageName: {
    type: String,
    required: true,
  },
});

const router = useRouter();

function goToLink() {
  router.push({ name: props.toPageName });
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.card {
  border-radius: $card-radius;
  box-shadow: var(--card-shadow-desktop);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--intensified-bg);
  transition: transform ease .2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  &-title {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 1rem;
  }
}
</style>