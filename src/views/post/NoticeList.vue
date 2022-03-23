<template>
  <section class="notice-list">
    <h1 class="page-title">{{ $t('notice.greeting') }}</h1>
    <p v-html="$t('notice.description')"></p>
    <div class="notices">
      <NoticeItem v-for="notice in notices" :key="notice._id" :item="notice" />
    </div>
  </section>
</template>

<script>
import { getPostAll } from '@/api';
import NoticeItem from '@/components/post/NoticeItem.vue';

export default {
  data() {
    return {
      notices: '',
    };
  },
  components: {
    NoticeItem,
  },
  methods: {
    async fetchNotice() {
      try {
        const { data } = await getPostAll('isNotice=true');
        if (data.success) {
          this.notices = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchNotice();
  },
};
</script>

<style lang="scss" scoped>
.notice-list {
  p {
    color: $grey;
  }
  .notices {
    margin-top: 2rem;
  }
}
</style>
