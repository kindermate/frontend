<template>
  <div class="profile-image" :style="cssVar">
    <img src="https://placekitten.com/300/300" alt="" />
    <!-- <img :src="image" :alt="username" /> -->
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    username: String,
    size: {
      type: String,
      default: '60px',
    },
  },
  computed: {
    cssVar() {
      return {
        '--size': this.size,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-image {
  img {
    display: block;
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
