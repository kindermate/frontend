<template>
  <section class="home">
    <Greeting :user="userInfo" />
    <Mission :mission="recentMission" />
    <div class="event"></div>
    <div class="result"></div>
    <div class="psy-test"></div>
    <div class="notice"></div>
  </section>
</template>

<script>
import { getUserInfo, getRecentMission } from "@/api";
import Greeting from "@/components/home/Greeting.vue";
import Mission from "@/components/home/Mission.vue";

export default {
  name: "Home",
  data() {
    return {
      userInfo: null,
      recentMission: null,
    };
  },
  components: {
    Greeting,
    Mission,
  },
  methods: {
    async fetchUserInfo() {
      try {
        const { data } = await getUserInfo();
        this.userInfo = data;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchRecentMission() {
      try {
        const { data } = await getRecentMission();
        this.recentMission = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.fetchUserInfo();
    this.fetchRecentMission();
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: $grey-light-x;
}
</style>
