<template>
  <div id="app">
    <AppBar />
    <main ref="main">
      <transition name="page" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </main>
    <BottomNavBar v-show="$route.meta.isBottomNav" />
  </div>
</template>

<script>
import AppBar from '@/components/common/AppBar.vue';
import BottomNavBar from '@/components/common/BottomNavBar.vue';

export default {
  components: {
    AppBar,
    BottomNavBar,
  },
  updated() {
    // 배경 컬러 설정
    if (this.$route.meta.bgColor) {
      document.body.style.backgroundColor = this.$route.meta.bgColor;
    } else {
      document.body.style.backgroundColor = '#f2f4f3';
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
  transition: transform 0.3s ease, opacity 0.2s ease-out;
}
</style>
