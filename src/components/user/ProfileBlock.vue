<template>
  <div v-if="user" class="profile-block">
    <div class="image">
      <ProfileImage :image="user.profile_image" size="45px" />
    </div>
    <div class="text">
      <div class="name">{{ user.name }}</div>
      <div class="info">
        <span class="gender">{{ user.gender }}</span>
        <span> / </span>
        <span class="birth">{{ user.birth | toAge }}</span>
      </div>
    </div>
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
  computed: {},
};
</script>

<style lang="scss" scoped>
.profile-block {
  display: flex;
  align-items: center;
  .image {
    margin-right: 0.5rem;
  }
  .text {
    font-size: $font-sm;
    .name {
      font-weight: $font-w600;
    }
    .info {
      color: $grey;
    }
  }
}
</style>
