<template>
  <span class="switch">
    <label
      class="switch-option"
      v-for="option in options"
      :key="option.value"
    >
      <input
        class="switch-option-radio"
        type="radio"
        name="textswitch"
        :value="option.value"
        :checked="modelValue === option.value"
        @click="toggle($event)"
      >
      <span class="switch-option-label">{{ option.displayValue }}</span>
    </label>
  </span>
</template>

<script setup lang="ts">
import type { IOption } from "@/types/UiElements";

export interface IProps {
  options: IOption[],
  modelValue: string
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => [
    { value: "opt1", displayValue: "Opt 1" },
    { value: "opt2", displayValue: "Opt 2" },
    { value: "opt3", displayValue: "Opt 3" },
  ]
});

const emit = defineEmits(["update:modelValue"]);

function toggle(e: MouseEvent) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
.switch {
  background-color: var(--intensified-bg);
  box-shadow: var(--button-shadow);
  border-radius: 50px;
  font-weight: 500;
  font-size: .875rem;
  display: inline-block;

  &-option {
    &-label {
      display: inline-block;
      padding: 5px 15px 7px;
      border-radius: 50px;
      cursor: pointer;
    }

    &-radio {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .switch-option-label {
        color: var(--accent-contraster);
        background-color: var(--accent);
      }
    }
  }
}
</style>