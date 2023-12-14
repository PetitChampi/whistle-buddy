<template>
  <label class="switch" @click.prevent="toggle">
    <input type="checkbox" class="switch-checkbox" :checked="modelValue">
    <span class="switch-slider" />
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>();

const emit = defineEmits(["update:modelValue"]);

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.switch {
  --height: 40px;
  position: relative;
  display: inline-block;
  width: calc(var(--height) * 1.75);
  height: var(--height);
  transition: filter ease .2s;
  @media screen and (max-width: $mobile) {
    --height: 36px;
  }
  
  &:hover {
    filter: brightness(1.3);
  }

  &-checkbox {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .switch-slider {
      background-color: var(--accent);
    }
    &:checked + .switch-slider:before {
      transform: translateX(calc(var(--height) - 10px));
      background-color: var(--accent-contraster);
    }
  }

  &-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--intensified-bg);
    transition: .4s;
    border-radius: 100px;
    box-shadow: var(--button-shadow);

    &:before {
      position: absolute;
      content: "";
      height: calc(var(--height) - 10px);
      width: calc(var(--height) - 10px);
      left: 5px;
      bottom: 5px;
      background-color: var(--text-standard);
      transition: .4s;
      border-radius: 100px;
    }
  }
}
</style>