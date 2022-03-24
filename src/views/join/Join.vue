<template>
  <section class="join">
    <h1 class="page-title">{{ $t('join.greeting') }}</h1>
    <p>{{ $t('join.description') }}</p>
    <hr />
    <form @submit.prevent="submit">
      <!-- 아이디 -->
      <div class="field">
        <label class="label">{{ $t('join.username') }}</label>
        <div class="control">
          <input
            v-model="username"
            class="input"
            type="text"
            :placeholder="$t('join.placeholder.username')"
          />
        </div>
      </div>
      <!-- 닉네임 -->
      <div class="field">
        <label class="label">{{ $t('join.nickname') }}</label>
        <div class="control">
          <input
            v-model="nickname"
            class="input"
            type="text"
            :placeholder="$t('join.placeholder.nickname')"
          />
        </div>
      </div>
      <!-- 이메일 -->
      <div class="field">
        <label class="label">{{ $t('join.email') }}</label>
        <div class="control">
          <input v-model="email" class="input" type="text" :placeholder="$t('join.placeholder.email')" />
        </div>
      </div>
      <!-- 생년월일 -->
      <div class="field">
        <label class="label">{{ $t('join.birth') }}</label>
        <div class="control">
          <input v-model="birth" class="input" type="text" :placeholder="$t('join.placeholder.birth')" />
        </div>
      </div>
      <!-- 성별 -->
      <div class="field">
        <label class="label">{{ $t('join.gender') }}</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="gender">
              <option disabled value="">{{ $t('join.placeholder.gender') }}</option>
              <option value="male">{{ $t('join.placeholder.gender_male') }}</option>
              <option value="female">{{ $t('join.placeholder.gender_female') }}</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 비밀번호 -->
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
      <!-- 비밀번호 확인 -->
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
      <!-- 추천인 코드 -->
      <div class="field">
        <label class="label">{{ $t('join.recommander') }}</label>
        <div class="control">
          <input
            v-model="recommander"
            class="input"
            type="text"
            :placeholder="$t('join.placeholder.recommander')"
          />
        </div>
      </div>
      <button class="button is-primary is-fullwidth mt-5">가입하기</button>
    </form>
  </section>
</template>

<script>
import { join } from '@/api';

export default {
  data() {
    return {
      username: '',
      nickname: '',
      email: '',
      birth: '',
      gender: '',
      password: '',
      passwordConfirm: '',
      recommander: '',
    };
  },
  methods: {
    async submit() {
      // validation
      if (!this.username) {
        alert(this.$t('alert.join.username'));
        return;
      }
      if (!this.nickname) {
        alert(this.$t('alert.join.nickname'));
        return;
      }
      if (!this.email) {
        alert(this.$t('alert.join.email'));
        return;
      }
      if (!this.birth) {
        alert(this.$t('alert.join.birth'));
        return;
      }
      if (!this.gender) {
        alert(this.$t('alert.join.gender'));
        return;
      }
      if (!this.password) {
        alert(this.$t('alert.join.password'));
        return;
      }
      if (!this.passwordConfirm) {
        alert(this.$t('alert.join.passwordConfirm'));
        return;
      }

      // join process
      try {
        const payload = {
          username: this.username,
          nickname: this.nickname,
          email: this.email,
          birth: this.birth,
          gender: this.gender,
          password: this.password,
          recommander: this.recommander,
        };
        const { data } = await join(payload);
        if (data.success) {
          this.$router.push('/join/complete');
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.join {
  p {
    color: $grey;
  }
  form {
    .field {
      margin-bottom: 1.5rem;
      label {
        font-weight: $font-w500;
      }
    }
  }
}
</style>
