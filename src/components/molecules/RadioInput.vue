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
    <label :for="value">{{ label }}</label>
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

    &:checked + label::before {
      border: 2px solid var(--intensified-bg);
      background-color: var(--accent);
      outline-color: var(--accent);
    }
  }

  label {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-weight: 400;

    &::before {
      content: "";
      display: inline-block;
      box-sizing: border-box;
      height: 15px;
      width: 15px;
      background-color: var(--intensified-bg);
      outline: 2px solid var(--text-standard);
      border-radius: 50px;
      margin: 2px;
    }
  }

  &.small {
    label {
      font-size: .875rem;
      gap: 7px;
      font-weight: unset;

      &::before {
        height: 13px;
        width: 13px;
        outline: 1px solid var(--text-standard);
        margin: 1px;
      }
    }
  }
}
</style>