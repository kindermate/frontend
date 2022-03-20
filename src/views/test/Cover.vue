<template>
  <section class="cover">
    <Lottie :options="options" :width="300" :height="300" class="lottie" />
    <h1>{{ testInfo.title }}</h1>
    <h2>{{ testInfo.subTitle }}</h2>
    <p class="description">{{ testInfo.description }}</p>
    <div class="notice">
      {{ testInfo.notice }}
    </div>
    <ul class="information">
      <li>
        <div class="label">{{ $t('test.cover.info.count') }}</div>
        <div class="value">{{ questions.length }}{{ $t('test.cover.info.question') }}</div>
      </li>
      <li>
        <div class="label">{{ $t('test.cover.info.time') }}</div>
        <div class="value">{{ testInfo.time }}{{ $t('test.cover.info.minute') }}</div>
      </li>
    </ul>
    <router-link to="/test/question" class="button is-fullwidth is-primary">{{
      $t('test.about.testButton')
    }}</router-link>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getTestInfo, getQuestion } from '@/api';
import Lottie from 'vue-lottie';
import Magnet from '@/assets/lottie/magnet.json';
import Chart from '@/assets/lottie/charts.json';
import Success from '@/assets/lottie/success.json';

export default {
  data() {
    return {
      testInfo: '',
      questions: [],
      options: { animationData: '' },
    };
  },
  components: {
    Lottie,
  },
  computed: {
    ...mapState({
      currentTest: state => state.test.current,
    }),
  },
  methods: {
    async fetchTestInfo(code) {
      try {
        const { data } = await getTestInfo(code);
        console.log(data);
        if (data.success) {
          this.testInfo = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchQuestion(code) {
      try {
        const { data } = await getQuestion(code);
        if (data.success) {
          this.questions = data.data;
          this.$store.commit('SET_QUESTION', data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.currentTest === '' || this.currentTest === 'CTT') {
      this.$store.commit('SET_CURRENT_TEST', 'CTT');
      this.options.animationData = Magnet;
      this.fetchTestInfo('CTT');
      this.fetchQuestion('CTT');
    } else if (this.currentTest === 'MAT') {
      this.options.animationData = Chart;
      this.fetchTestInfo('MAT');
      this.fetchQuestion('MAT');
    } else if (this.currentTest === 'PBT') {
      this.options.animationData = Success;
      this.fetchTestInfo('PBT');
      this.fetchQuestion('PBT');
    }
  },
};
</script>

<style lang="scss" scoped>
.cover {
  h1 {
    font-size: $font-xxl;
    font-weight: $font-w600;
    text-align: center;
  }
  h2 {
    font-size: $font-md;
    text-align: center;
  }
  p.description {
    text-align: center;
    margin: 2rem 0;
    color: $grey;
    font-size: $font-md;
    line-height: 1.5;
  }
  .notice {
    background-color: $grey-light-xx;
    padding: 1.5rem;
  }
  .information {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 2rem;
    .label {
      font-size: $font-sm;
      font-weight: $font-w500;
    }
    .value {
      font-size: $font-md;
      font-weight: $font-w600;
    }
  }
  a.button {
    margin-top: 2rem;
  }
}
</style>
