<template>
  <div v-if="user" class="profile-block">
    <div class="image">
      <ProfileImage :image="user.profile_image" size="40px" />
    </div>
    <div class="text">
      <div class="name">{{ user.name }}</div>
      <div class="info">
        <span class="gender">{{ transGender(user.gender) }}</span>
        <span class="birth">({{ user.birth }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileImage from '@/components/user/ProfileImage.vue';
export default {
  props: {
    user: Object,
  },
  components: {
    ProfileImage,
  },
  methods: {
    transGender(gender) {
      return gender;
    },
  },
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
    .name {
      font-weight: $font-w600;
    }
    .info {
      font-size: $font-xs;
      color: $grey;
      .gender {
        margin-right: 2px;
      }
    }
  }
}
</style>
