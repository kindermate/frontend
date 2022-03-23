<template>
  <router-link :to="`/notice/${item._id}`">
    <div class="title">{{ item.title }}</div>
    <div class="date">{{ item.createdAt | moment('YYYY년 M월 D일') }}</div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style lang="scss" scoped>
a {
  display: block;
  border-top: 1px solid #000;
  padding: 1rem 0;

  &:last-child {
    border-bottom: 1px solid #000;
  }
  .title {
    margin: 0;
    font-size: $font-md;
    line-height: 1.4;
    font-weight: $font-w500;
  }
  .date {
    color: $grey;
    font-size: $font-sm;
  }
}
</style>
