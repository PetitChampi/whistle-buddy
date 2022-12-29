<template>
  <Dropdown :closeOnInteraction="props.closeOnInteraction">
    <template v-slot:dropdown-title>
      <span>{{ buttonText }}</span>
    </template>
    <template v-slot:dropdown-content>
      <span
        class="select-option"
        :class="option.value === selectedOption && 'selected'"
        @click="selectOption(option)"
        data-value="tesla"
        v-for="option in options"
        :key="option.value"
      >
        {{ option.displayValue }}
      </span>
    </template>
  </Dropdown>
</template>

<script setup>
import Dropdown from "@/components/molecules/Dropdown.vue";
import { ref } from "@vue/reactivity";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  defaultSelectedOption: {
    type: String,
  },
  defaultButtonText: {
    type: String,
    default: "Choose...",
  },
  closeOnInteraction: {
    type: Boolean,
    default: false,
  },
});

const selectedOption = ref(props.defaultSelectedOption);
const buttonText = ref(props.defaultButtonText);

function selectOption(opt) {
  selectedOption.value = opt.value;
  buttonText.value = opt.displayValue;
}
</script>

<style lang="scss">
.select-option {
  display: block;
  padding: 10px 15px;
  cursor: pointer;
  transition: color .2s, background-color .2s;
  &:hover {
    cursor: pointer;
    background-color: var(--text-standard-half-transparent);
    color: var(--text-intense);
  }
  &.selected {
    background-color: var(--text-standard);
    color: var(--intensified-bg);
  }
}
</style>