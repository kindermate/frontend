<template>
  <section class="test-complete">
    <NotificationPage>
      <template #image>
        <img src="@/assets/img/theo-finish-line.png" :alt="$t('test.complete.greeting')" />
      </template>
      <template #title>{{ $t('test.complete.greeting') }}</template>
      <template #description>
        <p v-html="$t('test.complete.description')"></p>
      </template>
    </NotificationPage>
    <router-link to="/result" class="button is-primary is-fullwidth mt-5">{{
      $t('test.complete.resultButton')
    }}</router-link>
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
.test-complete {
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
