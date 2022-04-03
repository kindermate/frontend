<template>
  <div v-if="member" class="profile-block">
    <div class="image">
      <AvatarImage :gender="member.gender" :avatarNumber="member.avatar" />
    </div>
    <div class="text">
      <div class="name">{{ member.name }}</div>
      <div class="info">
        <span class="gender">{{ transGender(member.gender) }}</span>
        <span class="birth"> / {{ member.birth | moment('YYYY년생') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarImage from '@/components/member/AvatarImage.vue';

export default {
  props: {
    member: Object,
  },
  components: {
    AvatarImage,
  },
  methods: {
    transGender(gender) {
      if (gender === 'male') return this.$t('member.gender.male');
      if (gender === 'female') return this.$t('member.gender.female');
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-block {
  display: flex;
  align-items: center;
  .image {
    margin-right: 10px;
    img {
      display: block;
      width: 40px;
    }
  }
  .text {
    .name {
      font-weight: $font-w600;
      line-height: 1;
      margin-bottom: 5px;
    }
    .info {
      line-height: 1;
      font-size: $font-sm;
      color: $grey;
    }
  }
  &.is-dark {
    color: #fff;
    .info {
      color: #fff;
    }
  }
}
</style>
