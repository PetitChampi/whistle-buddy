<template>
  <div role="progressbar" :style="`--value:${value}; --maxValue:${maxValue}`"></div>
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
div[role="progressbar"] {
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
}

div[role="progressbar"]::before {
  counter-reset: percentage var(--value);
  content: counter(percentage);
}
</style>