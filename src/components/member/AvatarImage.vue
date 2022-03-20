<template>
  <img :src="require(`@/assets/img/member_${gender}_${avatarNumber}.svg`)" />
</template>

<script>
export default {
  props: {
    gender: String,
    avatarNumber: {
      default: () => {
        return Math.floor(Math.random() * 10);
      },
      type: Number,
    },
  },
};
</script>
