<template>
  <div class="mission">
    <h2 class="home-title">진행중인 미션</h2>
    <div v-for="(member, index) in members" :key="index" class="box">
      <div class="info">
        <div class="child">
          <ProfileBlock
            :member="{ name: member.name, birth: member.birth, gender: member.gender, avatar: member.avatar }"
          />
        </div>
        <div class="status">
          <CircleIcon>
            <img src="@/assets/img/calendar.svg" />
          </CircleIcon>
          <span>{{ member.missions[0].week }}주차</span>
        </div>
      </div>
      <!-- <div v-for="(mission, index) in mission.missions" :key="index" class="list">
        <div class="subject">{{ mission.subject }}</div>
        <div class="item">
          <div class="name">
            <div class="area tag is-success mr-2">
              {{ mission.section }}
            </div>
            <div class="task">{{ mission.task.name }}</div>
          </div>
          <div class="status">
            <div class="text">
              <img src="@/assets/img/refresh.svg" />
              <span>{{ mission.task.period }}일</span>
            </div>
            <div class="text">
              <img src="@/assets/img/gauge.svg" />
              <span>{{ mission.task.progress }}%</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="buttons mt-5">
      <router-link to="/mission" class="button is-fullwidth is-primary">미션 전체 보기</router-link>
    </div>
    <!-- <div v-else class="empty box">현재 진행중인 미션이 없습니다.</div> -->
  </div>
</template>

<script>
import ProfileBlock from '@/components/user/ProfileBlock.vue';
import CircleIcon from '@/components/common/CircleIcon.vue';

export default {
  props: {
    members: Array,
  },
  components: {
    ProfileBlock,
    CircleIcon,
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.mission {
  margin-bottom: 4rem;
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-bottom: 1.3rem;
    .status {
      display: flex;
      align-items: center;
      font-size: $font-sm;
      font-weight: $font-w600;
    }
  }
  .list {
    .subject {
      margin-bottom: 0.3rem;
      color: $grey;
      font-size: $font-sm;
    }
    .item {
      display: flex;
      justify-content: space-between;
      background-color: $grey-light-xx;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 1rem;
      .name {
        display: flex;
        font-weight: $font-w600;
      }
      .status {
        display: flex;
        .text {
          display: flex;
          align-items: center;
          margin-right: 0.7rem;
          &:last-child {
            margin-right: 0;
          }
          img {
            display: block;
            width: 15px;
            margin-right: 3px;
          }
          span {
            font-size: $font-sm;
            font-weight: $font-w500;
          }
        }
      }
    }
  }
  .empty {
    text-align: center;
    color: $grey;
  }
}
</style>
