<template>
  <header class="app-bar">
    <router-link :to="$router.back()" class="back">뒤로가기</router-link>
    <div class="page-title"></div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-bar {
}
</style>
