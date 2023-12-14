<template>
  <div class="notfound">
    <h1 class="notfound-title">404</h1>
    <h2 class="notfound-subtitle">{{ $t('404_SUBTITLE') }}</h2>
    <p class="notfound-paragraph">
      {{ $t('404_PARAGRAPH') }}
      <RouterLink :to="{ name: 'select' }">
        {{ $t('404_LINK') }}
      </RouterLink>
    </p>
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