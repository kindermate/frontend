<template>
  <div class="profile-image">
    <img :src="image" :alt="username" />
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    username: String,
  },
};
</script>

<style lang="scss" scoped>
.profile-image {
  img {
    display: block;
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
