<template>
  <div class="timer" :style="`--value:${value}; --maxValue:${maxValue}`">
    <span class="timer-bar"></span>
  </div>
</template>

<script setup lang="ts">
export interface IProps {
  value?: number,
  maxValue?: number
}
const props = withDefaults(defineProps<IProps>(), {
  value: 65,
  maxValue: 100
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.timer {
  --size: 50px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: 
    radial-gradient(closest-side, var(--body-bg) 80%, transparent 0 99.9%, var(--body-bg) 0),
    conic-gradient(var(--accent) calc(var(--value) / var(--maxValue) * 100 * 1%), var(--faint) 0);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-standard);
  box-shadow: 0 0 10px 5px var(--body-bg);
  @media screen and (max-width: $mobile) {
    display: flex;
    gap: 5px;
    border-radius: unset;
    width: unset;
    height: unset;
    background: unset;
    box-shadow: unset;
    font-size: .875rem;
  }

  &::after {
    counter-reset: percentage var(--value);
    content: counter(percentage);
    @media screen and (max-width: $mobile) {
      background-color: var(--faint);
      border-radius: 50px;
      padding: 2px 5px;
      box-shadow: 0 0 10px 5px var(--body-bg);
    }
  }

  &-bar {
    display: none;
    @media screen and (max-width: $mobile) {
      display: block;
      border-radius: 50px;
      width: 80px;
      height: 5px;
      background: linear-gradient(to left, var(--accent) calc(var(--value) / var(--maxValue) * 100 * 1%), var(--faint) 0);
      box-shadow: 0 0 10px 5px var(--body-bg);
    }
  }
}
</style>