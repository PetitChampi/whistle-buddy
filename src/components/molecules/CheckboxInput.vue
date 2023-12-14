<template>
  <div
    class="checkbox-group"
    :class="{ small: size === 's', large: size === 'l' }"
    @click.prevent="tickBox"
  >
    <input
      :id="value"
      type="checkbox"
      :checked="checkedCond"
      :value="value"
    >
    <label :for="value">
      <span class="tick" />
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string[] | boolean,
  value: string,
  label?: string,
  size?: string
}>();

const emit = defineEmits(["update:modelValue"]);

const checkedCond = computed<boolean>(() => {
  return typeof props.modelValue === "boolean" ?
    props.modelValue :
    props.modelValue.includes(props.value);
});

function tickBox() {
  if (typeof props.modelValue === "boolean") {
    emit("update:modelValue", !props.modelValue);
    return;
  }
  // rudimentary deep copy instead of shallow just in case
  let newArray = JSON.parse(JSON.stringify(props.modelValue));
  if (!props.modelValue.includes(props.value)) newArray.push(props.value);
  else newArray = newArray.filter((item: string) => item !== props.value);
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
  &.large {
    label {
      .tick {
        height: 24px;
        width: 24px;
        border: 2px solid var(--text-standard);
        border-radius: 5px;

        &::before {
          width: 12px;
          top: 35%;
        }
      }
    }
  }
}
</style>