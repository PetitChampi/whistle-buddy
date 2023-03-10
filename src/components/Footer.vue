<template>
  <footer class="footer">
    <div class="footer-title">Whistle Buddy</div>
    <div class="footer-credits">
      <RouterLink :to="{ name: 'about' }">
        {{ $t("GEN_ABOUT_US") }}
      </RouterLink>
      <p class="footer-credits-item">
        {{ $t("FOOTER_CREDIT_CCDP") }} <span class="footer-credits-item-name">Esther Bauzou</span>
      </p>
      <p class="footer-credits-item">
        {{ $t("FOOTER_CREDIT_CC") }} <span class="footer-credits-item-name">Arthur Ozenne</span>
      </p>
      <p class="footer-credits-item">
        {{ $t("FOOTER_CREDIT_I") }} <span class="footer-credits-item-name">Noémie Levenson</span>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--faint);
  text-align: center;
  padding: 30px 20px;
  margin-top: 100px;

  &-title {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--text-intense);
  }

  &-credits {
    font-size: .875rem;
    line-height: 160%;
    
    &-item {
      margin: 0;

      &-name {
        font-weight: 700;
      }
    }
  }
}
</style>