<template>
  <section class="join">
    <h1 class="page-title">{{ $t('join.greeting') }}</h1>
    <p>{{ $t('join.description') }}</p>
    <hr />
    <form @submit.prevent="submit">
      <!-- 아이디 -->
      <div class="field">
        <label class="label">{{ $t('join.username') }}</label>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              v-model="username"
              class="input"
              type="text"
              :placeholder="$t('join.placeholder.username')"
            />
          </div>
          <!-- <div class="control">
            <a @click="checkUsername" class="button is-success">중복체크</a>
          </div> -->
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
      <!-- 주소 -->
      <div class="field">
        <label class="label">{{ $t('join.address') }}</label>
        <div class="control is-address">
          <div class="select">
            <select v-model="address1" @change="selectAddress1">
              <option disabled value="">{{ $t('join.placeholder.address') }}</option>
              <option v-for="item in addressList1" :key="item.code" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="select">
            <select v-model="address2">
              <option disabled value="">{{ $t('join.placeholder.address') }}</option>
              <option v-for="(item, index) in addressList2" :key="index" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
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
import axios from 'axios';

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
      address1: '',
      address2: '',
      recommander: '',
      addressList1: '',
      addressList2: [],
    };
  },
  methods: {
    checkUsername() {
      if (!this.username) {
        alert(this.$t('alert.join.noUsername'));
        return;
      }
      console.log(this.username);
    },
    async fetchAddress1() {
      try {
        const response = await axios.get(
          'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000',
        );
        if (response.status === 200) {
          this.addressList1 = response.data.regcodes;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAddress2(code) {
      const first = code.substring(0, 2);
      try {
        let response;
        if (
          first === '41' ||
          first === '43' ||
          first === '44' ||
          first === '45' ||
          first === '47' ||
          first === '48'
        ) {
          response = await axios.get(
            `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${first}*000000&is_ignore_zero=true`,
          );
        } else {
          response = await axios.get(
            `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${first}*00000&is_ignore_zero=true`,
          );
        }
        if (response.status === 200) {
          this.addressList2 = [];
          response.data.regcodes.forEach(item => {
            this.addressList2.push(item.name.split(' ')[1]);
          });
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    selectAddress1() {
      const address = this.addressList1.find(item => item.name === this.address1);
      this.fetchAddress2(address.code);
    },
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
      if (!this.address1 || !this.address2) {
        alert(this.$t('alert.join.address'));
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
          address1: this.address1,
          address2: this.address2,
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
  created() {
    this.fetchAddress1();
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
      .button {
        height: 3rem;
        font-size: 1rem;
      }
      .is-address {
        .select {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
