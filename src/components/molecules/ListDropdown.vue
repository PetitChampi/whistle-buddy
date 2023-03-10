<template>
  <Dropdown :closeOnInteraction="props.closeOnInteraction">
    <template v-slot:dropdown-title>
      <span class="select-title">{{ buttonText }}</span>
    </template>
    <template v-slot:dropdown-content>
      <span
        class="select-option"
        :class="option.value === selectedOption && 'selected'"
        @click="selectOption(option)"
        v-for="option in options"
        :key="option.value"
      >
        {{ option.displayValue }}
      </span>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from "@/components/molecules/Dropdown.vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import type { IOption } from "@/types/UiElements";
import { useI18n } from "vue-i18n";

export interface IProps {
  options: IOption[],
  defaultSelectedOption?: string,
  defaultButtonText?: string,
  closeOnInteraction?: boolean
}
const props = withDefaults(defineProps<IProps>(), {});

const { t } = useI18n({ useScope: "global" });

const emit = defineEmits(["@optionSelected"]);

const selectedOption = ref<string | undefined>(props.defaultSelectedOption);
const buttonText = ref<string | undefined>(props.defaultButtonText || t("GEN_CHOOSE"));

function selectOption(opt: IOption | undefined) {
  selectedOption.value = opt?.value;
  buttonText.value = opt?.displayValue;
  emit("@optionSelected", opt);
}

onMounted(() => {
  if (props.defaultSelectedOption) {
    const defaultOpt = props.options.find(opt => opt.value === props.defaultSelectedOption);
    selectOption(defaultOpt);
  }
});
</script>

<style lang="scss" scoped>
.select-title {
  user-select: none;
}

.select-option {
  display: block;
  padding: 10px 15px;
  cursor: pointer;
  transition: color .2s, background-color .2s;
  min-width: max-content;
  width: 100%;

  &:first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--text-standard-half-transparent);
    color: var(--text-intense);
  }
  &.selected {
    background-color: var(--accent);
    color: var(--accent-contraster);
  }
}
</style>