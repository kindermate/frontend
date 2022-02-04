<template>
  <div id="app">
    <router-view />
    <BottomNavBar />
  </div>
</template>

<script>
import BottomNavBar from "@/components/common/BottomNavBar.vue";
export default {
  components: {
    BottomNavBar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
