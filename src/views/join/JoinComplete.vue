<template>
  <section class="join-complete">
    <NotificationPage>
      <template #image>
        <img src="@/assets/img/theo-celebrate.png" :alt="$t('joinComplete.greeting')" />
      </template>
      <template #title>{{ $t('joinComplete.greeting') }}</template>
      <template #description>
        <p v-html="$t('joinComplete.description')"></p>
      </template>
    </NotificationPage>
    <router-link to="/login" class="button is-primary is-fullwidth mt-5">로그인</router-link>
  </section>
</template>

<script>
import NotificationPage from '@/components/common/NotificationPage.vue';

export default {
  components: {
    NotificationPage,
  },
};
</script>

<style lang="scss" scoped>
.join-complete {
  margin: auto;
  h1 {
    text-align: center;
    font-size: $font-lg;
    font-weight: $font-w600;
  }
  img {
    display: block;
    object-fit: cover;
  }
}
</style>
