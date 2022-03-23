<template>
  <section class="usage">
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
        const { data } = await getPost('6238b7c733bc3d0cd4958e44');
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
.usage {
  h1 {
    margin-bottom: 2rem;
  }
  .content {
    font-size: $font-sm;
  }
}
</style>
