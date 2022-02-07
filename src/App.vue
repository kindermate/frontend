<template>
  <div id="app">
    <AppBar />
    <router-view />
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
