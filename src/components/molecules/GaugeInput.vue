<template>
  <div class="gauge-wrapper" :class="{ disabled }">
    <div class="indicators">
      <span class="indicators-min">
        {{ min }}{{ unit }}
      </span>
      <span class="indicators-max">
        {{ max }}{{ unit }}
      </span>
    </div>
    <div class="gauge">
      <span class="gauge-button minus" @click="decrement">
        <span class="gauge-button-text">-</span>
      </span>
      <div class="gauge-input-container">
        <span ref="thumb" class="gauge-thumb">{{ modelValue }}{{ unit }}</span>
        <input
          id=""
          ref="slider"
          type="range"
          class="gauge-slider"
          :min="min"
          :max="max"
          :value="modelValue"
          :disabled="disabled"
          @input="updateThumb"
        >
      </div>
      <span class="gauge-button plus" @click="increment">
        <span class="gauge-button-text">+</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

const props = defineProps<{
  min: number,
  max: number,
  unit?: string,
  modelValue: number | string,
  disabled?: boolean
}>();

const emit = defineEmits(["update:modelValue"]);

const thumb = ref<HTMLElement | null>(null);
const slider = ref<HTMLInputElement | null>(null);

function updateThumb() {
  if (!slider.value || !thumb.value) return;

  emit("update:modelValue", slider.value.value);
  const percentage = ((Number(slider.value.value) - props.min) / (props.max - props.min)) * 100;
  const thumbWidth = getComputedStyle(thumb.value).width;
  const thumbWidthAsNb = Number(thumbWidth.substring(0, thumbWidth.length - 2));
  const thumbWidthChunk = (thumbWidthAsNb / 100) * percentage;
  thumb.value.style.left = `calc(${percentage}% - ${thumbWidthChunk}px)`;
}

function increment() {
  if (!slider.value) return;
  let currentValue = Number(slider.value.value);
  if (currentValue < props.max) {
    currentValue++;
    slider.value.value = currentValue.toString();
  }
  updateThumb();
}

function decrement() {
  if (!slider.value) return;
  let currentValue = Number(slider.value.value);
  if (currentValue > props.min) {
    currentValue--;
    slider.value.value = currentValue.toString();
  }
  updateThumb();
}

onMounted(() => { updateThumb() });
</script>

<style lang="scss" scoped>
.disabled {
  opacity: .5;
  pointer-events: none;
  user-select: none;
}

.indicators {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  font-size: .875rem;
}

.gauge {
  display: flex;
  align-items: center;

  &-wrapper {
    transition: opacity ease .2s;
  }
  &-input-container {
    position: relative;
    flex-grow: 1;
    height: 20px;
  }
  &-button {
    background-color: var(--faint);
    z-index: 1;
    user-select: none;

    &-text {
      border-radius: 50px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      background: var(--intensified-bg);
      box-shadow: var(--button-shadow);
      cursor: pointer;
      line-height: 110%;
    }

    &.minus {
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }
    &.plus {
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    }
  }
  &-slider {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0;
    width: 100%;
    height: 20px;
    background: var(--faint);
    outline: none;
    cursor: pointer;

    // For Safari mobile
    input[type="range"]::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      border-radius: 0;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 40px;
      height: 40px;
      border-radius: 50px;
      cursor: grab;
    }
    &::-moz-range-thumb {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      cursor: grab;
    }
  }

  &-thumb {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transform: translateY(-25%);
    z-index: 1;
    pointer-events: none;
    border-radius: 50px;
    background: var(--intensified-bg);
    box-shadow: var(--button-shadow);
    font-weight: 500;
    z-index: 2;
    transition: left .1s;
  }
}
</style>