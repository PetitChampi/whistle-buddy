<template>
  <Dropdown :closeOnInteraction="props.closeOnInteraction" type="list">
    <template #dropdown-title>
      <span class="select-title">{{ buttonText }}</span>
    </template>
    <template #dropdown-content>
      <div class="list-container">
        <span
          v-for="option in options"
          :key="option.value"
          class="select-option"
          :class="option.value === selectedOption && 'selected'"
          @click="selectOption(option)"
        >
          {{ option.displayValue }}
        </span>
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from "@/components/molecules/Dropdown.vue";
import { ref, onMounted, watch } from "vue";
import type { IOption } from "@/types/MusicalDataTypes";
import { useI18n } from "vue-i18n";

export interface IProps {
  options: IOption[],
  defaultSelectedValue?: string,
  defaultButtonText?: string,
  closeOnInteraction?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  defaultSelectedValue: "",
  defaultButtonText: "Choose...",
});

const { t } = useI18n({ useScope: "global" });

const emit = defineEmits(["@optionSelected"]);

const selectedOption = ref<string | undefined>(props.defaultSelectedValue);
const buttonText = ref<string | undefined>(props.defaultButtonText || t("GEN_CHOOSE"));

function selectOption(opt: IOption) {
  selectedOption.value = opt?.value;
  buttonText.value = opt?.displayValue;
  emit("@optionSelected", opt);
}

function refreshSelection() {
  if (props.defaultSelectedValue) {
    const defaultOpt = props.options.find(opt => opt.value === props.defaultSelectedValue);
    buttonText.value = defaultOpt?.displayValue;
  }
}

onMounted(() => refreshSelection());

watch(() => props.defaultSelectedValue, () => refreshSelection());
watch(() => props.options, () => refreshSelection());
</script>

<style lang="scss" scoped>
.select-title {
  user-select: none;
}
.list-container {
  border-radius: 10px;
  max-height: 150px;
  overflow-y: auto;
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