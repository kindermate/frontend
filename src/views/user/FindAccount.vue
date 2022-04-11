<template>
  <section class="find-account">
    <div class="find-username">
      <h1 class="page-title">{{ $t('findAccount.sectionTitle1') }}</h1>
      <p v-html="$t('findAccount.description1')"></p>
      <div class="field mt-4">
        <div class="control">
          <input
            v-model="findUsernameForEmail"
            class="input"
            type="email"
            :placeholder="$t('join.placeholder.email')"
          />
          <p class="help is-danger">{{ message1 }}</p>
        </div>
        <div class="control mt-3">
          <a @click.prevent="findUsername" class="button is-fullwidth is-primary"
            >이메일로 아이디 전송 받기</a
          >
        </div>
      </div>
    </div>
    <hr />
    <div class="reset-password">
      <h1 class="page-title">{{ $t('findAccount.sectionTitle2') }}</h1>
      <p v-html="$t('findAccount.description2')"></p>
      <div class="field mt-4">
        <div class="control">
          <input
            v-model="resetPasswordForEmail"
            class="input"
            type="email"
            :placeholder="$t('join.placeholder.email')"
          />
          <p class="help is-danger">{{ message2 }}</p>
        </div>
        <div class="control mt-3">
          <a @click.prevent="resetPassword" class="button is-fullwidth is-primary"
            >이메일로 임시 비밀번호 전송 받기</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { findUsernameWithEmail, resetPasswordWithEmail } from '@/api';

export default {
  data() {
    return {
      findUsernameForEmail: '',
      resetPasswordForEmail: '',
      validEmail1: false,
      validEmail2: false,
      message1: '',
      message2: '',
    };
  },
  watch: {
    findUsernameForEmail(value) {
      // 이메일 형식 유효성 검사
      const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (regex.test(value) || this.findUsernameForEmail === '') {
        this.message1 = '';
        this.validEmail1 = true;
      } else {
        this.message1 = '이메일 형식이 아닙니다.';
        this.validEmail1 = false;
      }
    },
    resetPasswordForEmail(value) {
      // 이메일 형식 유효성 검사
      const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (regex.test(value) || this.resetPasswordForEmail === '') {
        this.message2 = '';
        this.validEmail2 = true;
      } else {
        this.message2 = '이메일 형식이 아닙니다.';
        this.validEmail2 = false;
      }
    },
  },
  methods: {
    async findUsername() {
      if (!this.validEmail1) {
        alert(this.$t('findAccount.alert.empty'));
        return;
      }
      try {
        const { data } = await findUsernameWithEmail(this.findUsernameForEmail);
        if (data.success) {
          alert(data.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error.response);
      }
    },
    async resetPassword() {
      if (!this.validEmail2) {
        alert(this.$t('findAccount.alert.empty'));
        return;
      }
      try {
        const { data } = await resetPasswordWithEmail(this.resetPasswordForEmail);
        if (data.success) {
          alert(data.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.find-account {
  hr {
    background-color: #ccc;
    height: 1px;
    margin: 3rem 0;
  }
}
</style>
