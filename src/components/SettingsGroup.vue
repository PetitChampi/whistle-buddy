<template>
  <div class="group">
    <header class="group-header">
      <div
        v-if="props.accordion"
        class="group-header-icon"
        :class="{ flipped: props.accordion && !closed }"
        @click="toggleAccordion"
      >
        <span class="icon-chevron_down"></span>
      </div>
      <div class="group-header-text">
        <h2 class="group-header-text-title">{{ title }}</h2>
        <div class="group-header-text-subtitle">{{ subtitle }}</div>
      </div>
      <div class="group-header-checkbox">
        <label>{{ props.checkboxLabel }}</label>
        <CheckboxInput
          v-if="hasCheckbox"
          value="bruh"
          v-model="settings"
        />
      </div>
    </header>
    <div
      class="group-content"
      :class="{ closed: props.accordion && closed }"
      ref="accContent"
    >
      <div class="group-content-inner" v-if="!!slots['content']">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckboxInput from "@/components/molecules/CheckboxInput.vue";
import { ref } from "@vue/reactivity";
import { useSlots } from "@vue/runtime-core";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  accordion: {
    type: Boolean,
    default: false
  },
  openByDefault: {
    type: Boolean,
    default: false
  },
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  checkboxLabel: {
    type: String
  },
  checkboxLabel: {
    type: String,
  }
});

const slots = useSlots();

const accContent = ref(null);

// TODO replace w/ real settings, edit checkbox?
const settings = ref([]);
const closed = ref(!props.openByDefault);

function toggleAccordion() {
  closed.value = !closed.value;
  if (!closed.value) accContent.value.style.maxHeight = `${accContent.value.scrollHeight}px`;
  else accContent.value.style.maxHeight = null;
}
</script>

<style lang="scss" scoped>
.group {
  &-header {
    position: relative;
    display: flex;
    gap: 20px;
    justify-content: space-between;

    &-icon {
      position: absolute;
      left: -30px;
      top: 0;
      padding: 7px 10px;
      color: var(--text-standard-half-transparent);
      font-size: .75rem;
      cursor: pointer;
      transition: transform .2s ease;

      &.flipped {
        transform: rotate(-180deg);
      }
    }

    &-text {
      &-title {
        font-size: 1.25rem;
      }
      &-subtitle {
        font-size: .875rem;
        line-height: 140%;
      }
    }

    &-checkbox {
      margin-top: 5px;
      display: flex;
      gap: 8px;
    }
  }
  &-content {
    overflow: hidden;
    transition: max-height 0.2s ease;

    &.closed {
      max-height: 0;
    }

    &-inner {
      padding-top: 10px;
    }
  }
}
</style>