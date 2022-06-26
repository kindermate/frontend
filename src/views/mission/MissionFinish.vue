<template>
  <section class="mission-detail">
    <div class="mission-info">
      <ProfileListBlock :member="member" />
    </div>
    <Loading v-if="!isLoaded" />
    <div v-else class="mission-content">
      <Lottie :options="options" :width="300" :height="300" class="lottie" />
      <div class="process">
        <div class="bar" ref="bar"></div>
      </div>
      <div class="week">
        {{ mission.week }}전체 미션 달성률 <b>{{ totalScore }}%</b>
      </div>
      <div class="comment">{{ message }}</div>
      <div class="buttons">
        <a @click="finish" class="button is-fullwidth is-primary">킨더메이트 미션 종료</a>
      </div>
    </div>
  </section>
</template>

<script>
import Lottie from 'vue-lottie';
import Loading from '@/components/common/Loading.vue';
import animationData from '@/assets/lottie/thumbup.json';
import { mapState } from 'vuex';
import { getMessageForFinish, getRating, finishMission } from '@/api';
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';

export default {
  data() {
    return {
      message: '정말 수고하셨습니다!',
      ratings: [],
      totalScore: '',
      options: { animationData: animationData },
      isLoaded: false,
    };
  },
  components: {
    ProfileListBlock,
    Lottie,
    Loading,
  },
  computed: {
    ...mapState({
      mission: state => state.mission.currentMission,
      member: state => state.mission.currentMember,
    }),
  },
  methods: {
    getPercentage() {
      return this.mission.rating * 20;
    },
    async getTotalScore() {
      for (let i = 1; i <= 12; i++) {
        const { data } = await getRating({ mission: this.mission.id, week: i });
        this.ratings.push(data.data);
      }
      let score = 0;
      this.ratings.forEach(rating => {
        if (rating) {
          score = score + rating.rating;
        }
      });
      this.totalScore = Math.round((100 * score) / 60);
      this.isLoaded = true;
    },
    async finish() {
      try {
        const { data } = await finishMission(this.mission.id);
        if (data.data === 'Success') {
          this.$router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchMessage() {
      try {
        const { data } = await getMessageForFinish(this.totalScore);
        console.log(data);
        if (data.success) {
          this.message = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getTotalScore();
    setTimeout(() => {
      this.$refs.bar.style.width = this.totalScore + '%';
    }, 300);
    // this.fetchMessage();
  },
};
</script>

<style lang="scss" scoped>
.mission-detail {
  display: flex;
  flex-direction: column;
  .mission-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1.5rem 1.5rem;
  }
  .mission-content {
    flex: 1;
    background-color: #fff;
    padding: 2rem 2rem 120px;
    border-radius: 2rem 2rem 0 0;

    .process {
      background-color: $grey-light-xx;
      width: 200px;
      height: 20px;
      margin: 0 auto 0.8rem;
      border-radius: 20px;
      overflow: hidden;
      .bar {
        background-color: $orange;
        width: 0;
        height: 100%;
        border-radius: 20px;
        transition: all 1s ease-in-out;
      }
    }
    .week {
      text-align: center;
      font-size: $font-lg;
    }
    .comment {
      font-size: $font-xl;
      padding: 2rem 0;
      text-align: center;
      word-break: keep-all;
      font-weight: $font-w600;
      white-space: pre-wrap;
    }
  }
}
</style>
