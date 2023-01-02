<template>
  <div class="card" @click="goToLink">
    <div class="card-image">
      <img src="https://png2.cleanpng.com/sh/68b326e258a0f7e08e5742baac4eb1ad/L0KzQYq3V8A6N6F4jZH0aYP2gLBuTfZwfaMyhNdqZj3mfLF9hgIue5lmheR4Y3uwc73wkL1ieqUyjORqZnbsc375gfNqdpgyTdY7NEa5RoiBVcU4P2gzTak8MEO0SYm4VcYzPmc7TasENUS5QnB3jvc=/kisspng-four-leaf-clover-shamrock-clip-art-traffic-racing-5d246667855777.5730319815626665995462.png" alt="" class="placeholder-contain">
    </div>
    <h2 class="card-title">{{ props.cardTitle }}</h2>
  </div>
</template>

<script setup>
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