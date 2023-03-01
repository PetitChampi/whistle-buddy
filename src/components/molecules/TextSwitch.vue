<template>
  <span class="switch">
    <label
      class="switch-option"
      v-for="option in options"
      :key="option"
    >
      <input
        class="switch-option-radio"
        type="radio"
        name="textswitch"
        :value="option"
        :checked="modelValue === option"
        @click="toggle($event)"
      >
      <span class="switch-option-label">{{ option }}</span>
    </label>
  </span>
</template>

<script setup lang="ts">
export interface IProps {
  options: string[],
  modelValue: string
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => ["opt 1", "opt 2", "opt 3"]
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