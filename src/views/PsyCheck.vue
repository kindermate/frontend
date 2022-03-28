<template>
  <section class="psy-check">
    <div class="temp">
      <img src="@/assets/img/theo-cogs.svg" />
      <h1>심리케어 검사(18종)</h1>
      <p>서비스를 열심히 준비 중입니다.<br />완성되면 알려드릴게요!</p>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.psy-check {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px - 3rem);
  color: $grey;
  font-weight: $font-w700;
  .temp {
    text-align: center;
    img {
      margin-bottom: 2rem;
      width: 250px;
    }
    h1 {
      font-size: $font-xxl;
      margin-bottom: 1rem;
      font-weight: $font-w600;
      color: $black;
    }
    p {
      font-weight: $font-w400;
    }
  }
}
</style>
