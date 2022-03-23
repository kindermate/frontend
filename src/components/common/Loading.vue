<template>
  <div class="loading">
    <Lottie :options="options" :width="300" :height="300" class="lottie" />
  </div>
</template>

<script>
import Lottie from 'vue-lottie';
import Loader from '@/assets/lottie/loader.json';

export default {
  data() {
    return {
      options: { animationData: '' },
    };
  },
  components: {
    Lottie,
  },
  created() {
    this.options.animationData = Loader;
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #fff, $alpha: 0.9);
  width: 100% !important;
  height: 100% !important;
  z-index: 99;
  display: flex;
  align-items: center;
  .lottie {
    width: 150px !important;
  }
}
</style>
