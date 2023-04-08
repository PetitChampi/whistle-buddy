<template>
  <div class="instructions">
    <h1 class="instructions-title">{{ $t('GEN_INSTRUCTIONS') }}</h1>
    <div class="instructions-text">
      <p>Hang tight, the user's guide is coming soon...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.instructions {
  margin: 50px auto 0;
  max-width: 660px;

  &-title {
    text-align: center;
  }

  &-text {
    p {
      margin-bottom: 30px;
      font-size: 1.125rem;
      line-height: 160%;
    }
  }
}
</style>