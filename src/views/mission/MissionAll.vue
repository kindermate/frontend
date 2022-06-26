<template>
  <section class="all-mission">
    <h1 class="page-title">{{ $t('mission.all.greeting') }}</h1>
    <div class="member">
      <ProfileListBlock :member="member" />
    </div>

    <Loading v-if="!isLoaded" />
    <ul v-else class="mission-list">
      <li v-for="week in mission.week" :key="week" @click="viewDetail(week)">
        <div class="left">{{ week }} 주차 미션</div>
        <div class="right">
          <div class="memo">
            <div class="key">메모</div>
            <div class="value">{{ memos[week - 1].length }}</div>
          </div>
          <div class="rating">
            <div class="key">달성률</div>
            <div class="value">{{ ratings[week - 1] ? ratings[week - 1].rating * 20 : 0 }}%</div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getMemoAll, getRating, getMissionInfo } from '@/api';
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';
import Loading from '@/components/common/Loading.vue';

export default {
  data() {
    return {
      memos: [],
      ratings: [],
      missionSet: [],
      isLoaded: false,
    };
  },
  components: {
    ProfileListBlock,
    Loading,
  },
  computed: {
    ...mapState({
      member: state => state.allMission.currentMember,
      mission: state => state.allMission.currentMission,
    }),
  },
  methods: {
    getGrade(week) {
      // todo: 주차별로 처리해야 함 중복되는 주도 고려
      if (week === 1) return this.member.resultSet['PBT'][0];
      if (week === 2) return this.member.resultSet['PBT'][1];
      if (week === 3) return this.member.resultSet['PBT'][2];
      if (week === 4) return this.member.resultSet['PBT'][3];
      if (week === 5) {
        return [this.member.resultSet['CTT'][0], this.member.resultSet['MAT'][0]];
      }
      if (week === 6) {
        return [this.member.resultSet['CTT'][1], this.member.resultSet['MAT'][1]];
      }
      if (week === 7) {
        return [this.member.resultSet['CTT'][2], this.member.resultSet['MAT'][2]];
      }
      if (week === 8) {
        return [this.member.resultSet['CTT'][3], this.member.resultSet['MAT'][3]];
      }
      if (week === 9) {
        return [this.member.resultSet['CTT'][4], this.member.resultSet['MAT'][4]];
      }
      if (week === 10) {
        return [this.member.resultSet['CTT'][5], this.member.resultSet['MAT'][5]];
      }
      if (week === 11) {
        return this.member.resultSet['MAT'][6];
      }
      if (week === 12) {
        return this.member.resultSet['MAT'][7];
      }
    },
    async fetchMissionInfo(week) {
      const grade = this.getGrade(week);
      console.log(grade);
      if (typeof grade == 'object') {
        // 5주 ~ 10주 까지 미션 2가지 제공
        try {
          const response1 = await getMissionInfo({ code: 'CTT', week: week, grade: grade[0] });
          this.missionSet = [];
          this.missionSet.push(response1.data.data);
          // console.log(index, response1.data.data);
          const response2 = await getMissionInfo({ code: 'MAT', week: week, grade: grade[1] });
          this.missionSet.push(response2.data.data);
          // console.log(index, response2.data.data);
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoaded = true;
        }
      } else {
        // 미션 1개일때 처리
        try {
          if (week < 5) {
            // 5주 미만 일때는 PBT
            const {
              data: { data },
            } = await getMissionInfo({ code: 'PBT', week: week, grade: grade });
            this.missionSet = data;
          } else {
            // 5주 이상(실제로는 11주 이상) 일때는 MAT
            const {
              data: { data },
            } = await getMissionInfo({ code: 'MAT', week: week, grade: grade });
            this.missionSet = data;
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoaded = true;
        }
      }
    },
    async fetchMemoAndRatings() {
      try {
        for (let i = 1; i <= this.mission.week; i++) {
          const { data } = await getMemoAll({ id: this.mission._id, week: i });
          this.memos.push(data.data);
        }
        for (let i = 1; i <= this.mission.week; i++) {
          const { data } = await getRating({ mission: this.mission._id, week: i });
          this.ratings.push(data.data);
        }
        this.isLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    async viewDetail(week) {
      await this.fetchMissionInfo(week);
      const payload = {
        member: {
          name: this.member.name,
          birth: this.member.birth,
          gender: this.member.gender,
          avatar: this.member.avatar,
        },
        mission: {
          items: Array.isArray(this.missionSet) ? [...this.missionSet] : [this.missionSet],
          id: this.mission._id,
          startDate: this.mission.startDate,
          createdAt: this.mission.createdAt,
          isComplete: this.mission.isComplete,
          isFinished: this.mission.isFinished,
        },
      };
      this.$store.commit('SET_MISSION', payload);
      this.$router.push('/mission/detail-weeks');
    },
  },
  async mounted() {
    console.log(this.mission);
    await this.fetchMemoAndRatings();
  },
};
</script>

<style lang="scss" scoped>
section {
  .member {
    margin-top: 2rem;
  }
  .mission-list {
    margin-top: 1.5rem;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 1rem;
      border-radius: 5px;
      margin-bottom: 0.5rem;
      cursor: pointer;
      overflow: hidden;
      .right {
        display: flex;
        font-size: $font-sm;
        color: $grey;
        .memo {
          display: flex;
          margin-right: 10px;
          .value {
            width: 20px;
            margin-left: 5px;
            color: $black;
          }
        }
        .rating {
          display: flex;
          .value {
            margin-left: 5px;
            width: 35px;
            color: $black;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
