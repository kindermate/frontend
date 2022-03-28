<template>
  <section class="user-info">
    <h1 class="page-title">{{ $t('userInfo.pageTitle') }}</h1>
    <p>{{ $t('userInfo.description') }}</p>
    <ul class="info-list">
      <li>
        <div class="key">아이디</div>
        <div class="value">{{ user.username }}</div>
      </li>
      <li>
        <div class="key">닉네임</div>
        <div class="value">{{ user.nickname }}</div>
      </li>
      <li>
        <div class="key">이메일</div>
        <div class="value">{{ user.email }}</div>
      </li>
      <li>
        <div class="key">생년월일</div>
        <div class="value">{{ user.birth }}</div>
      </li>
      <li>
        <div class="key">주소</div>
        <div class="value">{{ user.address1 }} {{ user.address2 }}</div>
      </li>
    </ul>
    <div class="buttons">
      <a href="" class="button is-dark is-outlined is-fullwidth">회원정보 수정</a>
      <a href="" class="button is-primary is-outlined is-fullwidth">비밀번호 변경</a>
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
