<template>
  <footer class="footer">
    <div class="footer-title">
      <RouterLink :to="{ name: 'splashPage' }">
        Whistle Buddy
      </RouterLink>
    </div>
    <div class="footer-credits">
      <div class="footer-credits-links">
        <RouterLink :to="{ name: 'about' }">{{ $t("GEN_ABOUT_US") }}</RouterLink>
      </div>
      <p class="footer-credits-item">
        {{ $t("FOOTER_CREDIT_CCDP") }} <span class="footer-credits-item-name">
          <a href="https://cv.esbauz.me" target="_blank">Esther&nbsp;Bauzou</a>
        </span>
      </p>
      <p class="footer-credits-item">
        {{ $t("FOOTER_CREDIT_CC") }} <span class="footer-credits-item-name">
          <a href="https://arthurozennecoursfluteetwhistle.carrd.co/" target="_blank">Arthur&nbsp;Ozenne</a>
        </span>
      </p>
      <p class="footer-credits-item">
        {{ $t("FOOTER_CREDIT_I") }} <span class="footer-credits-item-name">
          <a href="https://inknanoart.carrd.co" target="_blank">Nano</a>
        </span>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: var(--faint);
  text-align: center;
  padding: 30px 20px;
  margin-top: 100px;

  &-title {
    font-size: 1.25rem;
    a {
      font-weight: 700;
      color: var(--text-intense);
      border: none;
      &:hover {
        border: none;
      }
    }
  }

  &-credits {
    font-size: .875rem;
    line-height: 160%;

    &-links {
      display: inline-flex;
      gap: 30px;
      margin-bottom: 15px;
    }
    
    &-item {
      margin: 0;

      &-name {
        font-weight: 700;
        a {
          font-weight: 700;
          color: var(--text-standard);
          &:hover {
            border-color: var(--text-standard);
          }
        }
      }
    }
  }
}
</style>