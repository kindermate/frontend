<template>
  <section class="home">
    <Greeting :user="userInfo" />
    <Mission v-if="membersWithMission.length > 0" :members="membersWithMission" />
    <Result v-if="membersWithResult.length > 0" :members="membersWithResult" />
    <div v-if="membersWithMission.length === 0 && membersWithResult.length === 0" class="empty box">
      <img src="@/assets/img/theo-phone-standing.svg" />
      <h2>아직 검사를<br />진행하지 않으셨나요?</h2>
      <router-link to="/test" class="button is-primary is-fullwidth">검사 바로가기</router-link>
    </div>
    <!-- <Promotion /> -->
    <Notice />
    <div class="result"></div>
    <div class="psy-test"></div>
    <div class="notice"></div>
    <Loading v-if="!isLoaded" />
  </section>
</template>

<script>
import { getRecentMission, getResultAll } from '@/api';
import Greeting from '@/components/home/Greeting.vue';
import Mission from '@/components/home/Mission.vue';
import Result from '@/components/home/Result.vue';
// import Promotion from '@/components/home/Promotion.vue';
import Notice from '@/components/home/Notice.vue';
import Loading from '@/components/common/Loading.vue';

export default {
  name: 'Home',
  data() {
    return {
      userInfo: this.$store.state.currentUser,
      membersWithMission: [],
      membersWithResult: [],
      isLoaded: false,
    };
  },
  components: {
    Greeting,
    Mission,
    Result,
    // Promotion,
    Notice,
    Loading,
  },
  methods: {
    // async fetchUserInfo() {
    //   try {
    //     const { data } = await getUserInfo();
    //     this.userInfo = data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async fetchRecentMission() {
      try {
        const { data } = await getRecentMission(this.userInfo.id);
        if (data.success) {
          this.membersWithMission = data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchResult() {
      try {
        const { data } = await getResultAll(this.userInfo.id);
        // 검사 결과가 있는 member만 가져옴
        const members = data.data.filter(member => {
          if (member.results.length > 0) {
            return member;
          }
        });
        if (data.success) {
          this.membersWithResult = members;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchRecentMission();
    this.fetchResult();
  },
  mounted() {
    this.isLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
.home {
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      display: block;
      width: 40%;
      margin: 1rem 0;
    }

    h2 {
      font-size: $font-xl;
      font-weight: $font-w500;
      margin: 1rem 0 1.5rem;
      line-height: 1.3;
      text-align: center;
    }
  }
}
</style>
