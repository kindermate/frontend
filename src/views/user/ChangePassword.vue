<template>
  <section class="change-password">
    <h1 class="page-title">{{ $t('changePassword.pageTitle') }}</h1>
    <p>{{ $t('changePassword.description') }}</p>
    <hr />
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">{{ $t('join.password') }}</label>
        <div class="control">
          <input
            v-model="password"
            class="input"
            type="password"
            :placeholder="$t('join.placeholder.password')"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ $t('join.passwordConfirm') }}</label>
        <div class="control">
          <input
            v-model="passwordConfirm"
            class="input"
            type="password"
            :placeholder="$t('join.placeholder.passwordConfirm')"
          />
        </div>
      </div>
      <button class="button is-primary is-fullwidth mt-6">{{ $t('changePassword.button') }}</button>
    </form>
  </section>
</template>

<script>
import { changePassword } from '@/api';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      password: '',
      passwordConfirm: '',
    };
  },
  computed: {
    ...mapState({
      user: state => state.currentUser,
    }),
  },
  methods: {
    async submit() {
      // 비밀번호 동일 여부 판단
      if (this.password !== this.passwordConfirm) {
        alert(this.$t('changePassword.alert.wrong'));
        return;
      }
      try {
        const payload = {
          id: this.user.id,
          password: this.password,
        };
        const { data } = await changePassword(payload);
        if (data.success) {
          alert(this.$t('changePassword.alert.success'));
          this.$router.push('/user-info');
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.change-password {
  p {
    color: $grey;
  }
  form {
    .field {
      margin-bottom: 1.5rem;
      label {
        font-weight: $font-w500;
      }
      .button {
        font-size: 1rem;
      }
      .is-address {
        .select {
          margin-right: 10px;
        }
      }
      input:disabled {
        background-color: $grey-light-x;
        border: 1px solid $grey-light;
      }
    }
  }
}
</style>
