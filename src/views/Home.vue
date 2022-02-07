<template>
  <section class="home">
    <Greeting />
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
  components: {
    Greeting,
  },
  methods: {
    async fetchUserInfo() {
      try {
        const data = await getUserInfo();
        console.log(data);
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
  padding: 2rem;
}
</style>
