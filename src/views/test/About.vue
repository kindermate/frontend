<template>
  <section class="test-about">
    <Lottie :options="options" :width="300" :height="300" class="lottie" />
    <h1>{{ $t('test.about.title') }}</h1>
    <p class="description" v-for="(item, index) in $t('test.about.description')" :key="index">
      {{ item }}
    </p>
    <ul class="type">
      <li v-for="(type, index) in $t('test.about.type')" :key="index">
        <img v-if="index === 0" src="@/assets/img/smile.svg" alt="" />
        <img v-else-if="index === 1" src="@/assets/img/square.svg" alt="" />
        <img v-else-if="index === 2" src="@/assets/img/heart.svg" alt="" />
        <span>{{ type.label }}</span>
      </li>
    </ul>
    <ul class="information">
      <li v-for="(item, index) in $t('test.about.info')" :key="index">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
      </li>
    </ul>
    <router-link to="/test/select" class="button is-fullwidth is-primary">{{
      $t('test.about.testButton')
    }}</router-link>
  </section>
</template>

<script>
import Lottie from 'vue-lottie';
import animationData from '@/assets/lottie/puzzle.json';

export default {
  data() {
    return {
      options: { animationData: animationData },
      images: ['@/assets/img/smile.svg'],
    };
  },
  components: {
    Lottie,
  },
  methods: {},
  created() {
    this.$store.commit('RESET_ANSWER');
  },
};
</script>

<style lang="scss" scoped>
.test-about {
  .lottie {
    margin-bottom: 2rem !important;
  }
  h1 {
    font-size: $font-xxl;
    font-weight: $font-w600;
    margin-bottom: 1rem;
  }
  p.description {
    color: $grey;
    font-size: $font-md;
    margin-bottom: 1rem;
    line-height: 1.5;
    word-break: break-all;
  }
  .type {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 3rem 0;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: $font-w600;
      text-align: center;
      height: 110px;
      border-radius: 10px;
      img {
        display: block;
        width: 20%;
        margin-bottom: 0.5rem;
      }
      &:nth-of-type(1) {
        background-color: $orange;
      }
      &:nth-of-type(2) {
        background-color: $green;
      }
      &:nth-of-type(3) {
        background-color: $blue;
      }
    }
  }
  .information {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-bottom: 2rem;
    .label {
      font-weight: normal;
    }
    .value {
      font-size: $font-lg;
    }
  }
}
</style>
