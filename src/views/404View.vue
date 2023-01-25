<template>
  <div class="notfound">
    <h1 class="notfound-title">404</h1>
    <h2 class="notfound-subtitle">This page doesn't exist.</h2>
    <p class="notfound-paragraph">Go back to the
      <RouterLink :to="{ name: 'select' }">
        start page
      </RouterLink></p>
  </div>
</template>

<style lang="scss" scoped>
.notfound {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-title {
    font-size: 6.25rem;
    color: var(--text-intense);
  }
  &-subtitle {
    margin-bottom: 10px;
  }
}
</style>