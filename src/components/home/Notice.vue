<template>
  <section class="notice">
    <h2 class="home-title">공지사항</h2>
    <ul class="notice-list">
      <li v-for="post in posts" :key="post._id">
        <router-link :to="`/notice/${post._id}`">
          <div class="subject">{{ post.title }}</div>
          <div class="date">{{ post.createdAt | moment('YYYY년 M월 D일') }}</div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { getPostAll } from '@/api';

export default {
  data() {
    return {
      posts: '',
    };
  },
  methods: {
    async fetchPost() {
      try {
        const { data } = await getPostAll('isNotice=true');
        if (data.success) {
          this.posts = data.data;
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
.notice {
  .notice-list {
    li {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 0.8rem;
      a {
        display: block;
        width: 100%;
        color: $black;
        padding: 1rem;
        .subject {
          font-weight: $font-w500;
        }
        .date {
          color: $grey;
          font-size: $font-sm;
        }
      }
    }
  }
}
</style>
