<template>
  <div class="group">
    <header class="group-header">
      <div
        class="group-header-icon"
        :class="{ flipped: props.accordion && !closed }"
        @click="toggleAccordion"
      >
        <span class="icon-chevron_down" v-if="props.accordion"></span>
      </div>
      <div class="group-header-text">
        <h2 class="group-header-text-title">{{ title }}</h2>
        <div class="group-header-text-subtitle">{{ subtitle }}</div>
      </div>
      <CheckboxInput
        v-if="hasCheckbox"
        value="bruh"
        v-model="settings"
        class="group-header-checkbox"
      />
    </header>
    <div
      class="group-content"
      :class="{ closed: props.accordion && closed }"
      ref="accContent"
    >
      <div class="group-content-inner">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckboxInput from "@/components/molecules/CheckboxInput.vue";
import { ref } from "@vue/reactivity";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  accordion: {
    type: Boolean,
    default: false
  },
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  checkboxLabel: {
    type: String,
  }
});

const accContent = ref(null);

// TODO replace w/ real settings, edit checkbox?
const settings = ref([]);
const closed = ref(true);

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
      }
    }

    &-checkbox {
      margin-top: 5px;
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