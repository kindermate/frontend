<template>
  <section class="promotion">
    <h2 class="home-title">프로모션</h2>
    <div class="event">
      <router-link to="/">
        <img src="@/assets/img/banner_1.png" alt="" />
        <dl>
          <dt>킨더메이트를 손에 넣어라!</dt>
          <dd>2월 1일 ~ 2월 28일 까지</dd>
        </dl>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.promotion {
  margin-bottom: 4rem;
  .event {
    img {
      display: block;
      border-radius: 1rem;
      overflow: hidden;
    }
    dl {
      margin-top: 1rem;
      color: $black;
      padding: 0 1rem;
      dt {
        font-size: $font-md;
        font-weight: $font-w600;
      }
      dd {
        color: $grey;
      }
    }
  }
}
</style>
