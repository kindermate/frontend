<template>
  <div class="notification-page">
    <div class="image is-square">
      <slot name="image" />
    </div>
    <h1>
      <slot name="title" />
    </h1>
    <slot name="description" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notification-page {
  margin: auto;
  min-width: 250px;
  h1 {
    text-align: center;
    font-size: $font-lg;
    font-weight: $font-w600;
    margin-bottom: 1rem;
  }
  img {
    display: block;
    object-fit: cover;
  }
  p {
    text-align: center;
    color: $grey;
  }
}
</style>
