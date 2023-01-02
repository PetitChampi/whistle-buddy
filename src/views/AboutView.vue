<template>
  <div class="about">
    <h1 class="about-title">About us</h1>
    <div class="about-text">
      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco</p>
      <p>Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco</p>
      <p>Velit officia consequat duis about us enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis mollit non deserunt ullamco. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Consequat duis mollit non deserunt ullamco. Velit officia consequat duis about us enim velit mollit.</p>
    </div>
    <div class="about-image">
      <img src="https://png2.cleanpng.com/sh/68b326e258a0f7e08e5742baac4eb1ad/L0KzQYq3V8A6N6F4jZH0aYP2gLBuTfZwfaMyhNdqZj3mfLF9hgIue5lmheR4Y3uwc73wkL1ieqUyjORqZnbsc375gfNqdpgyTdY7NEa5RoiBVcU4P2gzTak8MEO0SYm4VcYzPmc7TasENUS5QnB3jvc=/kisspng-four-leaf-clover-shamrock-clip-art-traffic-racing-5d246667855777.5730319815626665995462.png" alt="" class="placeholder-contain">
    </div>
    <p class="about-thanks">Thank you!</p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  margin: 60px auto 0;
  max-width: 660px;

  &-title {
    text-align: center;
    font-size: 3rem;
    color: var(--text-intense);
    margin-bottom: 30px;
  }

  &-text {
    p {
      margin-bottom: 30px;
      font-size: 1.125rem;
      line-height: 160%;
    }
  }

  &-image {
    max-width: 300px;
    margin: 0 auto 20px;
  }

  &-thanks {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 400;
    font-size: 1.75rem;
  }
}
</style>