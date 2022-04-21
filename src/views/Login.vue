<template>
  <section class="login">
    <h1 class="page-title">{{ $t('login.greeting') }}</h1>
    <form @submit.prevent="submit">
      <!-- 아이디 -->
      <div class="field">
        <div class="control">
          <input
            v-model="username"
            class="input"
            type="text"
            :placeholder="$t('login.placeholder.username')"
          />
        </div>
      </div>
      <!-- 비밀번호 -->
      <div class="field">
        <div class="control">
          <input
            v-model="password"
            class="input"
            type="password"
            :placeholder="$t('login.placeholder.password')"
          />
        </div>
      </div>
      <button class="button is-fullwidth is-warning">{{ $t('login.loginButton') }}</button>
    </form>
    <router-link to="/agreement" class="join button is-dark mt-6">{{ $t('login.joinButton') }}</router-link>
    <div class="find-account mt-6">
      <router-link to="/find-account" class="button is-fullwidth is-text"
        >아이디/비밀번호를 잊으셨나요?</router-link
      >
    </div>
  </section>
</template>

<script>
import { login, getCurrentUser } from '@/api';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async submit() {
      if (!this.username) {
        alert(this.$t('alert.login.username'));
        return;
      }
      if (!this.password) {
        alert(this.$t('alert.login.password'));
        return;
      }

      try {
        const { data } = await login({ username: this.username, password: this.password });
        console.log(data);

        if (data.success) {
          this.$store.commit('SET_TOKEN', data.data.token);
        }
      } catch (error) {
        const {
          response: { data },
        } = error;
        if (!data.success) {
          alert(this.$t('alert.login.fail'));
        }
      }

      try {
        const { data } = await getCurrentUser();
        if (data.success) {
          this.$store.commit('SET_USER', data.data);
          this.$router.replace('/');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  form {
    .button {
      font-weight: $font-w600;
    }
  }
}
</style>
