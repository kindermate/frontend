<template>
  <a @click.prevent="click" class="big-button" href="">
    <span>다음</span>
  </a>
</template>

<script>
import bus from '@/utils/bus';

export default {
  data() {
    return {
      link: this.$route.meta.bigButton.next,
    };
  },
  methods: {
    click() {
      // next 경로는 route.meta에 존재함
      bus.$emit('goNext', this.link);
    },
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
