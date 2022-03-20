<template>
  <div class="icon" :style="cssVar">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#F2F4F3',
    },
  },
  computed: {
    cssVar() {
      return {
        '--bgColor': this.bgColor,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  background-color: var(--bgColor);
  border-radius: 50%;
  padding: 5px;
  margin-right: 0.3rem;
  img {
    display: block;
  }
}
</style>
