<template>
  <div :class="{ large }" class="group">
    <header class="group-header">
      <div
        class="group-header-text"
        :class="{ pointer: props.accordion }" 
        @click="toggleAccordion"
      >
        <h2 class="group-header-text-title">
          {{ title }}
          <div
            v-if="props.accordion"
            class="group-header-icon"
            :class="{ flipped: props.accordion && !closed }"
          >
            <span class="icon-chevron_down"></span>
          </div>
        </h2>
        <div class="group-header-text-subtitle">{{ subtitle }}</div>
      </div>
      <div class="group-header-checkbox">
        <label>{{ props.checkboxLabel }}</label>
        <CheckboxInput
          v-if="hasCheckbox"
          value="bruh"
          v-model="settings"
          :size="large ? 'l' : undefined"
        />
      </div>
    </header>
    <div class="group-content" :class="{ accordion }" ref="accContent">
      <div class="group-content-inner" v-if="!!slots['content']">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckboxInput from "@/components/molecules/CheckboxInput.vue";
import { ref } from "@vue/reactivity";
import { onMounted, useSlots } from "@vue/runtime-core";

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
  large: {
    type: Boolean,
    default: false
  }
});

const slots = useSlots();

const accContent = ref<any>(null);

// TODO replace w/ real settings, edit checkbox?
const settings = ref<any[]>([]);
const closed = ref<boolean>(!props.openByDefault);

function toggleAccordion() {
  if (!props.accordion) return;
  closed.value = !closed.value;
  if (!closed.value) accContent.value.style.maxHeight = `${accContent.value.scrollHeight}px`;
  else accContent.value.style.maxHeight = "0";
}

onMounted(() => {
  // Manually added padding of .group-content-inner, since its presence is assessed after onMounted
  if (!props.accordion || !closed.value) accContent.value.style.maxHeight = `calc(${accContent.value.scrollHeight}px + 15px)`
  else {
    accContent.value.style.maxHeight = "0";
    accContent.value.style.overflow = "hidden";
  };
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

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

      .icon-chevron_down {
        display: inline-block;
        transition: transform .2s ease;
      }
      &.flipped .icon-chevron_down {
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
    &.accordion {
      overflow: hidden;
      transition: max-height 0.2s ease;
    }

    &-inner {
      padding-top: 10px;
    }
  }
  .pointer {
    cursor: pointer;
  }
}

.large {
  .group {
    &-header {
      &-icon {
        padding: 12px 0 0;
        color: var(--text-standard);
        position: unset;
        order: 1;
        flex-grow: 1;
        font-size: 1rem;
        @media screen and (max-width: $mobile) {
          font-size: .75rem;
        }
      }
      &-text {
        &-title {
          font-weight: 400;
          font-size: 1.75rem;
          display: flex;
          gap: 10px;
          @media screen and (max-width: $mobile) {
            font-size: 1.5rem;
          }
        }
      }
      &-checkbox {
        order: 2;
      }
    }
    &-content {
      &-inner {
        padding-top: 20px;
      }
    }
  }
}
</style>