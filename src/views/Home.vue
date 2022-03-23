<template>
  <section class="home">
    <Greeting :user="userInfo" />
    <Mission :mission="recentMission" />
    <Promotion />
    <Notice />
    <div class="result"></div>
    <div class="psy-test"></div>
    <div class="notice"></div>
    <Loading v-if="!isLoaded" />
  </section>
</template>

<script>
import { getRecentMission } from '@/api';
import Greeting from '@/components/home/Greeting.vue';
import Mission from '@/components/home/Mission.vue';
import Promotion from '@/components/home/Promotion.vue';
import Notice from '@/components/home/Notice.vue';
import Loading from '@/components/common/Loading.vue';

export default {
  name: 'Home',
  data() {
    return {
      userInfo: this.$store.state.currentUser,
      recentMission: null,
      isLoaded: false,
    };
  },
  components: {
    Greeting,
    Mission,
    Promotion,
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
        const { data } = await getRecentMission();
        console.log(data);
        this.recentMission = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.fetchRecentMission();
  },
  mounted() {
    this.isLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
.home {
}
</style>
