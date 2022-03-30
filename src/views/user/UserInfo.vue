<template>
  <section class="user-info">
    <h1 class="page-title">{{ $t('userInfo.pageTitle') }}</h1>
    <p>{{ $t('userInfo.description') }}</p>
    <ul class="info-list">
      <li>
        <div class="key">{{ $t('join.username') }}</div>
        <div class="value">{{ user.username }}</div>
      </li>
      <li>
        <div class="key">{{ $t('join.nickname') }}</div>
        <div class="value">{{ user.nickname }}</div>
      </li>
      <li>
        <div class="key">{{ $t('join.email') }}</div>
        <div class="value">{{ user.email }}</div>
      </li>
      <li>
        <div class="key">{{ $t('join.birth') }}</div>
        <div class="value">{{ user.birth }}</div>
      </li>
      <li>
        <div class="key">{{ $t('join.address') }}</div>
        <div class="value">{{ user.address1 }} {{ user.address2 }}</div>
      </li>
    </ul>
    <div class="buttons">
      <router-link to="/check-password?next=password" class="button is-primary is-outlined is-fullwidth">{{
        $t('userInfo.buttons.password')
      }}</router-link>
      <router-link to="/check-password?next=user" class="button is-primary is-fullwidth">{{
        $t('userInfo.buttons.update')
      }}</router-link>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      user: state => state.currentUser,
    }),
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  p {
    color: $grey;
  }
  .info-list {
    border-top: 1px solid $grey-light;
    padding-top: 1rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    li {
      display: flex;
      padding: 0.4rem 0;
      .key {
        width: 100px;
        color: $grey;
      }
    }
  }
  a {
    font-size: 1.05rem;
    margin-bottom: 0.8rem;
  }
}
</style>
