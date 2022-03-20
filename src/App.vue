<template>
  <div id="app">
    <AppBar />
    <main ref="main">
      <transition name="page" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </main>
    <BottomNavBar v-show="$route.meta.isBottomNav" />
    <BigButton v-if="$route.meta.bigButton" />
  </div>
</template>

<script>
import AppBar from '@/components/common/AppBar.vue';
import BottomNavBar from '@/components/common/BottomNavBar.vue';
import BigButton from '@/components/common/BigButton.vue';

export default {
  components: {
    AppBar,
    BottomNavBar,
    BigButton,
  },
  updated() {
    // 배경 컬러 설정
    if (this.$route.meta.bgColor) {
      document.body.style.backgroundColor = this.$route.meta.bgColor;
    } else {
      document.body.style.backgroundColor = '#f2f4f3';
    }
    // main 패딩 설정
    if (this.$route.meta.noPadding) {
      this.$refs.main.classList.add('no-padding');
    } else {
      this.$refs.main.classList.remove('no-padding');
    }
  },
};
</script>

<style lang="scss" scoped>
.page-enter {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
}
.page-enter-active {
  transition: opacity 0.35s ease-out, transform 0.5s ease;
}
</style>
