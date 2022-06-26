<template>
  <section class="privacy">
    <div class="content" v-html="page.content"></div>
  </section>
</template>

<script>
import { getPage } from '@/api';
export default {
  data() {
    return {
      page: '',
    };
  },
  methods: {
    async fetchPage() {
      try {
        const { data } = await getPage('62b37019fc04de4052b642c9');
        if (data.success) {
          this.page = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchPage();
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
