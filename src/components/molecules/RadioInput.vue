<template>
  <div
    class="radio-group"
    :class="{ small }"
    @click.prevent="toggle"
  >
    <input
      type="radio"
      :name="groupName"
      :id="value"
      :checked="modelValue === value"
      :value="value"
    >
    <label :for="value">
      <span class="circle"></span>
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string,
  groupName: string,
  value: string,
  label?: string,
  small?: boolean,
}>();

const emit = defineEmits(["update:modelValue"]);

function toggle() {
  emit("update:modelValue", props.value);
}
</script>

<style lang="scss" scoped>
.radio-group {
  display: inline-block;

  input {
    display: none;

    &:checked + label .circle {
      background-color: var(--accent);
      &::before {
        border-color: var(--accent);
      }
    }
  }

  label {
    display: inline-flex;
    gap: 15px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-weight: 400;

    & .circle {
      position: relative;
      border: 2px solid var(--intensified-bg);
      display: inline-block;
      height: 16px;
      width: 16px;
      background-color: var(--intensified-bg);
      border-radius: 50px;
      &::before {
        content: "";
        position: absolute;
        top: -4px;
        right: -4px;
        bottom: -4px;
        left: -4px;
        border: 2px solid var(--text-standard);
        border-radius: 50px;
      }
    }
  }

  &.small {
    label {
      font-size: .875rem;
      gap: 8px;
      font-weight: unset;
      & .circle {
        height: 14px;
        width: 14px;
        margin: 1px;
        &::before {
          top: -3px;
          right: -3px;
          bottom: -3px;
          left: -3px;
          border-width: 1px;
        }
      }
    }
  }
}
</style>