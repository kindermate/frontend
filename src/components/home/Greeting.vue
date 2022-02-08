<template>
  <div v-if="user" class="greeting">
    <div class="text">
      <span class="username">{{ user.nickname }}</span>
      <span class="greetings" v-html="$t('home.greeting')"></span>
    </div>
    <ProfileImage
      @click.native="$router.push('/users/profile')"
      :image="user.profile_image"
      :username="user.nickname"
    />
  </div>
</template>

<script>
import ProfileImage from "@/components/user/ProfileImage.vue";

export default {
  props: {
    user: Object,
  },
  components: {
    ProfileImage,
  },
};
</script>

<style lang="scss" scoped>
.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .text {
    font-size: $font-lg;
    .username {
      font-weight: $font-w600;
    }
  }
}
</style>
