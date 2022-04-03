<template>
  <nav>
    <router-link to="/home">
      <div class="icon">
        <img src="@/assets/img/home.svg" />
      </div>
      <span>{{ $t('menu.home') }}</span>
    </router-link>
    <router-link to="/test">
      <div class="icon">
        <img src="@/assets/img/puzzle.svg" />
      </div>
      <span>{{ $t('menu.test') }}</span>
    </router-link>
    <router-link to="/mission">
      <div class="icon">
        <img src="@/assets/img/check.svg" />
      </div>
      <span>{{ $t('menu.mission') }}</span>
    </router-link>
    <router-link to="/result">
      <div class="icon">
        <img src="@/assets/img/graph.svg" />
      </div>
      <span>{{ $t('menu.result') }}</span>
    </router-link>
    <router-link to="/psycheck">
      <div class="icon">
        <img src="@/assets/img/face.svg" />
      </div>
      <span>{{ $t('menu.psycheck') }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  // position: absolute;
  position: fixed;
  // left: 0;
  // right: 0;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  background-color: $yellow;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.5rem;
  z-index: 9;

  a {
    flex: 1;
    height: 60px;
    color: $black;
    font-size: $font-xs;
    font-weight: $font-w600;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.4;
    .icon {
      display: flex;
      justify-content: center;
      img {
        display: block;
        width: 18px;
        margin-bottom: 7px;
        pointer-events: none;
      }
    }
    span {
      line-height: 1;
    }
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
