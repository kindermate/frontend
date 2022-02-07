<template>
  <nav>
    <router-link to="/">
      <div class="icon"></div>
      <span>홈</span>
    </router-link>
    <router-link to="/">
      <div class="icon"></div>
      <span>검사</span>
    </router-link>
    <router-link to="/">
      <div class="icon"></div>
      <span>미션</span>
    </router-link>
    <router-link to="/">
      <div class="icon"></div>
      <span>결과</span>
    </router-link>
    <router-link to="/">
      <div class="icon"></div>
      <span>전체</span>
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  background-color: $yellow;
  height: 60px;
  justify-content: space-around;
  align-items: center;

  a {
    color: $black;
    font-size: $font-sm;
  }
}
</style>
