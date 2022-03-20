<template>
  <section class="page-not-found">
    <div class="image is-square">
      <img src="@/assets/img/theo-crossroad.png" alt="Page not found." />
    </div>
    <h1>{{ $t('404.message') }}</h1>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-not-found {
  margin: auto;
  h1 {
    text-align: center;
    font-size: $font-lg;
    font-weight: $font-w600;
  }
  img {
    display: block;
    object-fit: cover;
  }
}
</style>
