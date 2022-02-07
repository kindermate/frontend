<template>
  <section class="home">
    <Greeting :user="userInfo" />
    <div class="mission"></div>
    <div class="event"></div>
    <div class="result"></div>
    <div class="psy-test"></div>
    <div class="notice"></div>
  </section>
</template>

<script>
import { getUserInfo } from "@/api";
import Greeting from "@/components/home/Greeting.vue";

export default {
  name: "Home",
  data() {
    return {
      userInfo: null,
    };
  },
  components: {
    Greeting,
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
  },
  created() {
    this.fetchUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: $grey-light-x;
  padding: 1.5rem;
}
</style>
