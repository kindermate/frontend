<template>
  <section class="usage">
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
        const { data } = await getPage('62b3704ffc04de4052b642e4');
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
.usage {
  h1 {
    margin-bottom: 2rem;
  }
  .content {
    font-size: $font-sm;
  }
}
</style>
