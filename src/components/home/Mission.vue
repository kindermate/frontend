<template>
  <div v-if="mission" class="mission box">
    <div class="info">
      <div class="child">
        <ProfileBlock :user="mission.child" />
      </div>
      <div class="status">{{ mission.week }}주차</div>
    </div>
    <div class="list">
      <div class="subject">부모양육행동검사 - 지지성</div>
      <div class="items"></div>
    </div>
    <div class="buttons mt-5">
      <router-link to="/" class="button is-fullwidth is-primary"
        >미션 전체 보기</router-link
      >
    </div>
  </div>
</template>

<script>
import ProfileBlock from "@/components/user/ProfileBlock.vue";

export default {
  props: {
    mission: Object,
  },
  components: {
    ProfileBlock,
  },
};
</script>

<style lang="scss" scoped>
.mission {
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    .status {
      font-size: $font-sm;
      font-weight: $font-w600;
      // color: $blue;
    }
  }
}
</style>
