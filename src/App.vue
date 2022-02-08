<template>
  <div id="app">
    <AppBar />
    <main>
      <transition name="page" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </main>
    <BottomNavBar />
  </div>
</template>

<script>
import AppBar from "@/components/common/AppBar.vue";
import BottomNavBar from "@/components/common/BottomNavBar.vue";
export default {
  components: {
    AppBar,
    BottomNavBar,
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
