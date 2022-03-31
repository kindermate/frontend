<template>
  <router-link :to="to" class="big-button">
    <span>다음</span>
  </router-link>
</template>

<script>
export default {
  props: {
    to: String,
  },
};
</script>

<style lang="scss" scoped>
a {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $black;
  font-weight: $font-w700;
  font-size: $font-md;
  background-color: $yellow;
}
</style>
