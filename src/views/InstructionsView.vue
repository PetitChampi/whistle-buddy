<template>
  <div class="instructions">
    <h1 class="instructions-title">{{ $t('GEN_INSTRUCTIONS') }}</h1>
    <div class="instructions-text">
      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco</p>
      <p>Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco</p>
      <p>Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit.</p>
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