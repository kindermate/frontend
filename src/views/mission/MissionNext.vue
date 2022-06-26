<template>
  <section class="mission-detail">
    <div class="mission-info">
      <ProfileListBlock :member="member" :dark="true" />
      <div class="day">
        <div class="week">
          <b>{{ mission.week }}주차</b> / 12주
        </div>
        <div class="date">
          {{ mission.startDate | moment('add', '1 weeks', 'YYYY.MM.DD hh:mm 까지') }}
        </div>
      </div>
    </div>
    <div v-if="!isLastMission" class="mission-content">
      <div class="image">
        <img src="@/assets/img/theo-build.svg" />
      </div>
      <div class="process">
        <div class="bar" ref="bar"></div>
      </div>
      <div class="week">
        {{ mission.week }}주차 미션 달성률 <b>{{ getPercentage() }}%</b>
      </div>
      <div class="comment">{{ message }}</div>
      <div class="next">
        다음 주차 미션은<br /><b>{{ mission.startDate | moment('add', '7 days', 'YYYY.M.D hh:mm 이후') }}</b
        >에 시작됩니다.
      </div>
      <div class="buttons mt-5">
        <a v-if="availableNextMission" @click="nextMission" class="button is-fullwidth is-primary"
          >다음 미션으로 이동</a
        >
      </div>
    </div>
    <div v-else class="mission-content">
      <div class="image">
        <img src="@/assets/img/theo-build.svg" />
      </div>
      <div class="process">
        <div class="bar" ref="bar"></div>
      </div>
      <div class="week">
        {{ mission.week }}주차 미션 달성률 <b>{{ getPercentage() }}%</b>
      </div>
      <div class="comment">{{ message }}</div>
      <div class="next">12주차의 모든 미션을 달성하셨습니다.</div>
      <div class="buttons mt-5">
        <a @click="finishMission" class="button is-fullwidth is-primary">12주 미션 완료!</a>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { updateMissionWeek, getMessage } from '@/api';
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';

export default {
  data() {
    return {
      message: '',
      availableNextMission: false,
      isLastMission: false,
    };
  },
  components: {
    ProfileListBlock,
  },
  computed: {
    ...mapState({
      mission: state => state.mission.currentMission,
      member: state => state.mission.currentMember,
    }),
  },
  methods: {
    checkAvailableNextMission() {
      const d = new Date();
      const today = moment(d);
      const diff = today.diff(this.mission.startDate, 'days', true);
      if (diff > 7) {
        this.availableNextMission = true;
      }
    },
    getPercentage() {
      return this.mission.rating * 20;
    },
    async nextMission() {
      try {
        const { data } = await updateMissionWeek(this.mission.id);
        console.log(data);
        if (data.success) {
          this.$router.push('/mission');
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    finishMission() {
      this.$router.push('/mission/finish');
    },
    async fetchMessage() {
      const score = Math.ceil(this.mission.rating);
      try {
        const { data } = await getMessage(score);
        if (data.success) {
          this.message = data.data.message;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.bar.style.width = this.mission.rating * 20 + '%';
    }, 300);
    this.checkAvailableNextMission();
    this.fetchMessage();
    // rating 판단 후 클로드 멘트 로드
    // 마지막 미션 처리
    if (this.mission.items[0].week === 12) {
      this.isLastMission = true;
    }
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
    .day {
      color: #fff;
      text-align: right;
      .week {
        font-size: $font-md;
        line-height: 1.2;
      }
      .date {
        font-size: $font-sm;
      }
    }
  }
  .mission-content {
    flex: 1;
    background-color: #fff;
    padding: 2rem 2rem 120px;
    border-radius: 2rem 2rem 0 0;

    .image {
      width: 60%;
      margin: 4rem auto;
    }
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
      font-size: $font-lg;
      padding: 2rem;
      text-align: center;
      word-break: keep-all;
      font-weight: $font-w700;
    }
    .next {
      text-align: center;
      b {
        color: $orange;
      }
    }
  }
}
</style>
