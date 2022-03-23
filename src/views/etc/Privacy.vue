<template>
  <section class="privacy">
    <div class="content" v-html="post.content"></div>
  </section>
</template>

<script>
import { getPost } from '@/api';
export default {
  data() {
    return {
      post: '',
    };
  },
  methods: {
    async fetchPost() {
      try {
        const { data } = await getPost('6239f55f16a92a2f9b1e5fb4');
        if (data.success) {
          this.post = data.data;
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
.privacy {
  h1 {
    margin-bottom: 2rem;
  }
  .content {
    font-size: $font-sm;
  }
}
</style>
