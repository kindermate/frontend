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
            <span>{{ member.missionSet.week }}주차</span>
          </div>
        </div>
        <div v-if="member.missionSet" class="mission-container">
          <div class="mission">
            <div class="head">
              {{ $t(`mission.code.${member.missionSet.code}`) }} - {{ member.missionSet.name }}
            </div>
            <div v-for="task in member.missionSet.tasks" :key="task._id" class="task">
              <div class="name">{{ task.title }}</div>
              <div class="term">
                <div class="image">
                  <img src="@/assets/img/calendar.svg" />
                </div>
                <span>{{ $t(`mission.term.${task.term}`) }}</span>
              </div>
              <div class="rating">{{ task.rating }}</div>
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
    },
    async fetchMissionInfo() {
      let count = 0;
      this.members.forEach(async (member, index) => {
        if (member.missions.length > 0) {
          const week = member.missions[0].week;
          const grade = this.getGrade(week, index);
          try {
            const {
              data: { data },
            } = await getMissionInfo({ week: week, grade: grade });
            this.members[index]['missionSet'] = data;
          } catch (error) {
            console.log(error);
          } finally {
            count = count + 1;
            if (count === this.members.length) {
              this.isLoaded = true;
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
          ...this.members[index].missionSet,
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
        .mission {
          margin-top: 1rem;
          .head {
            font-size: $font-sm;
            color: $grey;
            margin-bottom: 0.5rem;
          }
          .task {
            display: flex;
            background-color: $grey-light-xx;
            margin-bottom: 0.5rem;
            padding: 0.8rem;
            border-radius: 5px;

            &:last-child {
              margin-bottom: 0;
            }
            .term {
              display: flex;
              align-items: center;
              margin-left: auto;
              font-size: $font-sm;
              width: 50px;
              opacity: 0.4;
              .image {
                width: 15px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
