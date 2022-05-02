<template>
  <section class="mission">
    <h1 class="page-title">{{ $t('mission.greeting') }}</h1>
    <p v-html="$t('mission.description')"></p>
    <ul v-if="isLoaded" class="member-list">
      <li v-for="(member, index) in members" :key="member.id" @click="viewDetail(index)">
        <div class="head">
          <ProfileListBlock :member="member" />
          <div v-if="member.missionSet" class="week">
            <CircleIcon>
              <img src="@/assets/img/time.svg" />
            </CircleIcon>
            <!-- 단일 미션 주차 -->
            <span v-if="!Array.isArray(member.missionSet)">{{ member.missionSet.week }}주차</span>
            <!-- 복수 미션 주차 -->
            <span v-else>{{ member.missionSet[0].week }}주차</span>
          </div>
        </div>
        <div v-if="member.missionSet" class="mission-container">
          <!-- 단일 미션 주차 -->
          <div v-if="!Array.isArray(member.missionSet)" class="mission">
            <div class="head">
              {{ $t(`mission.code.${member.missionSet.code}`) }} - {{ member.missionSet.name }}
            </div>
            <div class="task">
              <div class="name" v-for="task in member.missionSet.tasks" :key="task._id">{{ task.title }}</div>
            </div>
          </div>
          <!-- 복수 미션 주차 -->
          <div v-else class="missions">
            <div class="help">
              5~10주차 미션은 기질검사(CTT)와 다면적성검사(MAT)의 미션이 동시에 진행됩니다.
            </div>
            <div v-for="(mission, index) in member.missionSet" :key="index" class="mission">
              <div class="head">{{ $t(`mission.code.${mission.code}`) }} - {{ mission.name }}</div>
              <div class="task">
                <div class="name" v-for="task in mission.tasks" :key="task._id">{{ task.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getMembersWithMissions, getMissionInfo } from '@/api';
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';
import CircleIcon from '@/components/common/CircleIcon.vue';

export default {
  data() {
    return {
      members: [],
      isLoaded: false,
    };
  },
  components: {
    ProfileListBlock,
    CircleIcon,
  },
  computed: {
    ...mapState({
      userId: state => state.currentUser.id,
    }),
  },
  methods: {
    async fetchMembers() {
      try {
        const { data } = await getMembersWithMissions(this.userId);
        this.members = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    makeResultGrades() {
      this.members.map((item, index) => {
        if (item.missions.length > 0) {
          const resultSet = {
            CTT: [],
            MAT: [],
            PBT: [],
          };
          item.missions[0].result.results.map(result => {
            result.part.map(part => {
              if (result.test === 'CTT') {
                resultSet.CTT.push(part.score.grade);
              }
              if (result.test === 'MAT') {
                resultSet.MAT.push(part.score.grade);
              }
              if (result.test === 'PBT') {
                resultSet.PBT.push(part.score.grade);
              }
            });
          });
          // console.log(resultSet);
          this.members[index]['resultSet'] = resultSet;
        }
      });
    },
    getGrade(week, index) {
      // todo: 주차별로 처리해야 함 중복되는 주도 고려
      if (week === 1) return this.members[index].resultSet['PBT'][0];
      if (week === 2) return this.members[index].resultSet['PBT'][1];
      if (week === 3) return this.members[index].resultSet['PBT'][2];
      if (week === 4) return this.members[index].resultSet['PBT'][3];
      if (week === 5) {
        return [this.members[index].resultSet['CTT'][0], this.members[index].resultSet['MAT'][0]];
      }
      if (week === 6) {
        return [this.members[index].resultSet['CTT'][1], this.members[index].resultSet['MAT'][1]];
      }
      if (week === 7) {
        return [this.members[index].resultSet['CTT'][2], this.members[index].resultSet['MAT'][2]];
      }
      if (week === 8) {
        return [this.members[index].resultSet['CTT'][3], this.members[index].resultSet['MAT'][3]];
      }
      if (week === 9) {
        return [this.members[index].resultSet['CTT'][4], this.members[index].resultSet['MAT'][4]];
      }
      if (week === 10) {
        return [this.members[index].resultSet['CTT'][5], this.members[index].resultSet['MAT'][5]];
      }
      if (week === 11) {
        return this.members[index].resultSet['MAT'][6];
      }
      if (week === 12) {
        return this.members[index].resultSet['MAT'][7];
      }
    },
    async fetchMissionInfo() {
      let count = 0;
      this.members.forEach(async (member, index) => {
        if (member.missions.length > 0) {
          const week = member.missions[0].week;
          const grade = this.getGrade(week, index);

          if (typeof grade == 'object') {
            // 5주 ~ 10주 까지 미션 2가지 제공
            try {
              const response1 = await getMissionInfo({ code: 'CTT', week: week, grade: grade[0] });
              this.members[index]['missionSet'] = [];
              this.members[index]['missionSet'].push(response1.data.data);
              console.log(index, response1.data.data);
              const response2 = await getMissionInfo({ code: 'MAT', week: week, grade: grade[1] });
              this.members[index]['missionSet'].push(response2.data.data);
              console.log(index, response2.data.data);
            } catch (error) {
              console.log(error);
            } finally {
              count = count + 1;
              if (count === this.members.length) {
                this.isLoaded = true;
              }
            }
          } else {
            // 미션 1개일때 처리
            try {
              if (week < 5) {
                // 5주 미만 일때는 PBT
                const {
                  data: { data },
                } = await getMissionInfo({ code: 'PBT', week: week, grade: grade });
                this.members[index]['missionSet'] = data;
              } else {
                // 5주 이상(실제로는 11주 이상) 일때는 MAT
                const {
                  data: { data },
                } = await getMissionInfo({ code: 'MAT', week: week, grade: grade });
                this.members[index]['missionSet'] = data;
              }
            } catch (error) {
              console.log(error);
            } finally {
              count = count + 1;
              if (count === this.members.length) {
                this.isLoaded = true;
              }
            }
          }
        } else {
          count = count + 1;
          if (count === this.members.length) {
            this.isLoaded = true;
          }
        }
      });
    },
    viewDetail(index) {
      if (!this.members[index].missionSet) {
        alert(this.$t('mission.alert.noMission'));
        return;
      }
      const payload = {
        member: {
          name: this.members[index].name,
          birth: this.members[index].birth,
          gender: this.members[index].gender,
          avatar: this.members[index].avatar,
        },
        mission: {
          items: Array.isArray(this.members[index].missionSet)
            ? [...this.members[index].missionSet]
            : [this.members[index].missionSet],
          id: this.members[index].missions[0]._id,
          startDate: this.members[index].missions[0].startDate,
          createdAt: this.members[index].missions[0].createdAt,
          isComplete: this.members[index].missions[0].isComplete,
          isFinished: this.members[index].missions[0].isFinished,
        },
      };
      this.$store.commit('SET_MISSION', payload);
      this.$router.push('/mission/detail');
    },
  },
  async created() {
    await this.fetchMembers();
    this.makeResultGrades();
    this.fetchMissionInfo();
  },
};
</script>

<style lang="scss" scoped>
.mission {
  p {
    color: $grey;
  }
  .member-list {
    margin-top: 2rem;
    li {
      background-color: #fff;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      cursor: pointer;

      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding-top: 0.5rem;
        .week {
          display: flex;
          align-items: center;
          font-weight: $font-w600;
        }
      }

      .mission-container {
        .help {
          border-top: 1px solid $grey-light;
          margin-top: 0.8rem;
          padding: 0.8rem 0.5rem;
          word-break: keep-all;
          line-height: 1.3;
          color: $grey;
        }
        .mission {
          margin-top: 1.2rem;
          .head {
            font-size: $font-sm;
            color: $grey;
            margin-bottom: 0.4rem;
          }
          .task {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
            margin-bottom: 0.5rem;
            border-radius: 5px;
            font-size: $font-xs;

            &:last-child {
              margin-bottom: 0;
            }

            .name {
              display: block;
              padding: 0.5rem 0.6rem;
              border-radius: 4px;
              border: 1px solid $grey-light;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
