<template>
  <section class="check-password">
    <h1 class="page-title">{{ $t('checkPassword.pageTitle') }}</h1>
    <p>{{ $t('checkPassword.description') }}</p>
    <form @submit.prevent="checkPassword">
      <div class="field">
        <div class="control">
          <input ref="input" v-model="password" type="password" class="input" />
        </div>
      </div>
      <button class="button is-primary is-fullwidth">{{ $t('checkPassword.button') }}</button>
    </form>
  </section>
</template>

<script>
import { checkPassword } from '@/api';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      password: '',
    };
  },
  computed: {
    ...mapState({
      username: state => state.currentUser.username,
    }),
  },
  methods: {
    async checkPassword() {
      if (!this.password) {
        alert(this.$t('checkPassword.alert.empty'));
        return;
      }
      try {
        const payload = {
          username: this.username,
          password: this.password,
        };
        const { data } = await checkPassword(payload);
        if (data.data) {
          // console.log(data.data);
          if (this.$route.query.next === 'user') {
            this.$router.replace('/update-user-info');
          } else {
            this.$router.replace('/change-password');
          }
        }
      } catch (error) {
        // console.log(error.response);
        if (!error.response.data.success) {
          alert(this.$t('checkPassword.alert.wrong'));
        }
      }
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>

<style lang="scss" scoped>
.check-password {
  p {
    color: $grey;
  }
  .field {
    margin-top: 2rem;
  }
}
</style>
