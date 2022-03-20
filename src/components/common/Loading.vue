<template>
  <Lottie :options="options" :width="300" :height="300" class="lottie" />
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

<style lang="scss" scoped></style>
