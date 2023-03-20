<template>
  <button class="btn" :class="{ secondary: btnType === 'secondary', disabled }" :disabled="disabled">
    <span v-if="props.iconL" class="icon-chevron_forward icon-l"></span>
    {{ btnText }}
    <span v-if="props.iconR" class="icon-chevron_forward icon-r"></span>
  </button>
</template>

<script setup lang="ts">
export interface IProps {
  btnType?: string,
  btnText: string,
  iconR?: string,
  iconL?: string,
  disabled?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  btnType: "primary",
  btnText: "Button text"
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.btn {
  font-family: inherit;
  font-weight: 600;
  font-size: 1rem;
  color: var(--accent-contraster);
  background-color: var(--accent);
  border: none;
  box-shadow: var(--button-shadow);
  border-radius: $button-radius-desktop;
  padding: 10px 20px;
  cursor: pointer;
  transition: filter .2s ease;
  @media screen and (max-width: $mobile) {
    font-weight: 500;
  }

  &:hover {
    filter: brightness(1.3);
  }

  &.secondary {
    color: var(--accent);
    background-color: var(--accent-contraster);

    &:hover {
      filter: brightness(.95);
    }
  }
  &.disabled {
    filter: var(--disabled-filter);
    cursor: not-allowed;
  }
}
.icon {
  &-r, &-l {
    font-size: .8rem;
  }
  &-r {
    margin-left: 10px;
  }
  &-l {
    margin-right: 10px;
  }
}
</style>