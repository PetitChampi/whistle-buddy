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

<script setup>
const props = defineProps({
  modelValue: {
    type: String
  },
  groupName: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
  },
  small: {
    type: Boolean,
    default: false
  }
});

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
    gap: 5px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-weight: 500;

    &::before {
      content: "";
      display: inline-block;
      box-sizing: border-box;
      height: 15px;
      width: 15px;
      background-color: var(--intensified-bg);
      outline: 2px solid var(--text-standard);
      border-radius: 50px;
    }
  }

  &.small {
    label {
      font-size: .875rem;
      gap: 5px;
      font-weight: unset;

      &::before {
        height: 13px;
        width: 13px;
        outline: 1px solid var(--text-standard);
      }
    }
  }
}
</style>