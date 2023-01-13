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

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String
  }
});

const emit = defineEmits(["update:modelValue"]);

function toggle(e) {
  emit("update:modelValue", e.target.value);
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
        color: var(--intensified-bg);
        background-color: var(--accent);
      }
    }
  }
}
</style>