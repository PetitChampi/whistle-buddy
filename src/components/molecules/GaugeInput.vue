<template>
  <div :class="{ disabled }">
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
        <span class="gauge-thumb" ref="thumb">{{ modelValue }}{{ unit }}</span>
        <input
          type="range"
          ref="slider"
          @input="updateThumb"
          id=""
          class="gauge-slider"
          :min="min"
          :max="max"
          :value="modelValue"
          :disabled="disabled"
        >
      </div>
      <span class="gauge-button plus" @click="increment">
        <span class="gauge-button-text">+</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";

const props = defineProps({
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  unit: {
    type: String
  },
  modelValue: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const thumb = ref(null);
const slider = ref(null);

function updateThumb() {
  emit("update:modelValue", slider.value.value)
  const percentage = ((slider.value.value - props.min) / (props.max - props.min)) * 100;
  const thumbWidth = getComputedStyle(thumb.value).width;
  const thumbWidthAsNb = Number(thumbWidth.substring(0, thumbWidth.length - 2));
  const thumbWidthChunk = (thumbWidthAsNb / 100) * percentage;
  thumb.value.style.left = `calc(${percentage}% - ${thumbWidthChunk}px)`;
}

function increment() {
  if (props.modelValue < props.max) ++slider.value.value;
  updateThumb();
}
function decrement() {
  if (props.modelValue > props.min) --slider.value.value;
  updateThumb();
}

onMounted(() => {
  updateThumb();
});
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
    width: 100%;
    height: 20px;
    background: var(--faint);
    outline: none;
    cursor: pointer;

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
  }
}
</style>