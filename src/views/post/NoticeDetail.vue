<template>
  <section class="notice-detail">
    <div class="subject">{{ notice.title }}</div>
    <div class="date">{{ notice.createdAt | moment('YYYY년 M월 D일') }}</div>
    <div class="content" v-html="notice.content"></div>
    <a @click="$router.go(-1)" class="button is-fullwidth">{{ $t('notice.backButton') }}</a>
  </section>
</template>

<script>
import { getPost } from '@/api';

export default {
  data() {
    return {
      notice: '',
    };
  },
  methods: {
    async fetchPost() {
      try {
        const { data } = await getPost(this.$route.params.id);
        console.log(data);
        if (data.success) {
          this.notice = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchPost();
  },
};
</script>

<style lang="scss" scoped>
.notice-detail {
  .subject {
    font-size: $font-md;
    font-weight: $font-w600;
  }
  .date {
    color: $grey;
  }
  .content {
    padding: 1rem 0;
  }
}
</style>
