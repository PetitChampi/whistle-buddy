<template>
  <div
    class="checkbox-group"
    :class="{ small }"
    @click.prevent="tickBox"
  >
    <input
      type="checkbox"
      :id="value"
      :checked="modelValue.includes(value)"
      :value="value"
    >
    <label :for="value">
      <span class="tick"></span>
      {{ label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array
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

function tickBox() {
  // deep copy instead of shallow just in case
  let newArray = JSON.parse(JSON.stringify(props.modelValue));
  if (!props.modelValue.includes(props.value)) newArray.push(props.value);
  else newArray = newArray.filter(item => item !== props.value);
  emit("update:modelValue", newArray);
}
</script>

<style lang="scss" scoped>
.checkbox-group {
  display: inline-block;

  input {
    display: none;

    &:checked + label .tick {
      background-color: var(--accent);
      border-color: var(--accent);
    }
  }

  label {
    display: flex;
    gap: 7px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-weight: 500;

    .tick {
      display: inline-block;
      box-sizing: border-box;
      height: 18px;
      width: 18px;
      background-color: var(--intensified-bg);
      border: 2px solid var(--text-standard);
      border-radius: 4px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 20%;
        left: 15%;
        display: inline-block;
        width: 8px;
        height: 3px;
        transform: rotate(-45deg);
        border-bottom: 2px solid var(--intensified-bg);
        border-left: 2px solid var(--intensified-bg);
      }
    }
  }

  &.small {
    label {
      font-size: .875rem;
      gap: 7px;
      font-weight: unset;

      .tick {
        height: 15px;
        width: 15px;
        border: 1px solid var(--text-standard);
        border-radius: 3px;

        &::before {
          width: 7px;
          top: 25%;
        }
      }
    }
  }
}
</style>