<template>
  <section v-if="test" class="cover">
    <div class="thumbnail">
      <img :src="require(`@/assets/img/psycheck_thumbnail_${test.code}.jpg`)" :alt="test.title" />
    </div>
    <h1>{{ test.title }}</h1>
    <h2>{{ test.subTitle }}</h2>
    <p class="description">{{ test.description }}</p>
    <div class="notice">
      <p class="subject">
        <img src="@/assets/img/check.svg" />
        {{ $t('psycheck.cover.noticeLabel') }}
      </p>
      <p>{{ $t('psycheck.cover.notice') }}</p>
    </div>
    <a @click="selectMember" class="button is-fullwidth is-primary">{{ $t('psycheck.cover.startButton') }}</a>
  </section>
</template>

<script>
import { getSimpleTestOne } from '@/api';

export default {
  data() {
    return {
      test: '',
    };
  },
  methods: {
    async fetchTest(id) {
      try {
        const { data } = await getSimpleTestOne(id);
        if (data.success) {
          this.test = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    selectMember() {
      this.$store.commit('SET_PSYCHECK_CODE', this.test.code);
      this.$router.push('/psycheck/select');
    },
  },
  created() {
    this.fetchTest(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.cover {
  margin-bottom: 2rem;
  .thumbnail {
    img {
      display: block;
      border-radius: 50%;
      width: 200px;
      height: 200px;
      margin: 0 auto 2rem;
      object-fit: cover;
    }
  }
  h1 {
    font-size: $font-xxl;
    font-weight: $font-w600;
    text-align: center;
    margin-bottom: 1rem;
  }
  h2 {
    text-align: center;
    word-break: keep-all;
    width: 80%;
    margin: 0 auto;
  }
  p.description {
    text-align: center;
    margin: 2rem 0;
    color: $grey;
    font-size: $font-sm;
    line-height: 1.6;
  }
  .notice {
    background-color: $grey-light-xx;
    font-size: $font-sm;
    word-break: keep-all;
    padding: 1.5rem;
    .subject {
      display: flex;
      align-items: center;
      font-weight: $font-w600;
      margin-bottom: 7px;
      img {
        display: block;
        width: 16px;
        margin-right: 5px;
      }
    }
  }
  a.button {
    margin-top: 2rem;
  }
}
</style>
