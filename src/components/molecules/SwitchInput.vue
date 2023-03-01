<template>
  <label class="switch" @click.prevent="toggle">
    <input type="checkbox" class="switch-checkbox" :checked="modelValue">
    <span class="switch-slider"></span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:modelValue"]);

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 40px;
  transition: filter ease .2s;
  
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
      transform: translateX(30px);
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
      height: 30px;
      width: 30px;
      left: 5px;
      bottom: 5px;
      background-color: var(--text-standard);
      transition: .4s;
      border-radius: 100px;
    }
  }
}
</style>