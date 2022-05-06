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
              @keydown.space.prevent
            />
          </div>
          <div class="control">
            <a @click="checkUsername" class="button is-success">중복체크</a>
          </div>
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
          <input
            v-model="email"
            class="input"
            type="email"
            :placeholder="$t('join.placeholder.email')"
            @keydown.space.prevent
          />
        </div>
      </div>
      <!-- 생년월일 -->
      <div class="field">
        <label class="label">{{ $t('join.birth') }}</label>
        <div class="control">
          <input
            v-model="birth"
            class="input"
            type="text"
            :placeholder="$t('join.placeholder.birth')"
            @blur="checkBirth"
          />
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
            @blur="checkPassword"
            @keydown.space.prevent
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
            @keydown.space.prevent
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
      <!-- 회원 타입 -->
      <div class="field">
        <label class="label">{{ $t('join.type') }}</label>
        <div class="control">
          <div class="select">
            <select v-model="type">
              <option disabled value="">선택하세요</option>
              <option value="playfacto">수학학원에서 배워요.</option>
              <option value="ekinder">영어학원에서 배워요.</option>
              <option value="kinder">유치원, 어린이집에서 배워요.</option>
              <option value="school">학교에서 배워요.</option>
              <option value="home">집에서 공부해요.</option>
              <option value="none">회원이 아니에요.</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 킨더메이트를 알게된 경로 -->
      <div class="field">
        <label class="label">{{ $t('join.findOut') }}</label>
        <div class="control">
          <div class="select">
            <select v-model="findOut">
              <option disabled value="">선택하세요</option>
              <option value="teacher">학원, 유치원, 어린이집 선생님 소개</option>
              <option value="recommend">지인 소개, 후기 추천</option>
              <option value="online ad">온라인광고 (네이버, 구글 등)</option>
              <option value="sns">SNS (인스타그램, 블로그)</option>
              <option value="cafe">지역카페, 맘카페</option>
              <option value="playfacto">플레이팩토 카페, 홈페이지</option>
              <option value="searching">검색 (포털, 스토어 등)</option>
              <option value="etc">기타</option>
            </select>
          </div>
        </div>
        <div v-if="showFindOutEtcText" class="control mt-2">
          <input
            type="text"
            v-model="findOutEtcText"
            class="input"
            :placeholder="$t('join.placeholder.findOutEtcText')"
          />
        </div>
      </div>
      <button class="button is-primary is-fullwidth mt-5">가입하기</button>
    </form>
  </section>
</template>

<script>
import { join, checkUsername } from '@/api';
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      username: '',
      validateUsername: false,
      nickname: '',
      email: '',
      birth: '',
      validateBirth: '',
      gender: '',
      password: '',
      passwordConfirm: '',
      validatePassword: false,
      address1: '',
      address2: '',
      addressList1: '',
      addressList2: [],
      type: '',
      findOut: '',
      findOutEtcText: '',
      showFindOutEtcText: false,
    };
  },
  watch: {
    findOut() {
      if (this.findOut === 'etc') {
        this.showFindOutEtcText = true;
      }
    },
  },
  methods: {
    async checkUsername() {
      if (!this.username) {
        alert(this.$t('alert.join.noUsername'));
        return;
      }
      if (this.username.length < 5) {
        alert(this.$t('alert.join.tooShortUsername'));
        return;
      }
      try {
        const { data } = await checkUsername(this.username);
        if (data.success) {
          alert(this.$t('alert.join.availableUsername'));
          this.validateUsername = true;
        }
      } catch (error) {
        if (error.response.data.success === false) {
          alert(this.$t('alert.join.duplicateUsername'));
          this.validateUsername = false;
        }
      }
    },
    checkBirth() {
      const regex = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (!regex.test(this.birth)) {
        alert(this.$t('alert.join.unavailableBirth'));
        this.validateBirth = false;
      } else {
        this.validateBirth = true;
      }
      const today = moment(new Date());
      const diff = today.diff(moment(this.birth), 'years');
      if (diff <= 10) {
        alert(this.$t('alert.join.myDateofBirth'));
        this.birth = '';
      }
    },
    checkPassword() {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!regex.test(this.password)) {
        alert(this.$t('alert.join.unavailablePassword'));
        this.validatePassword = false;
      } else {
        this.validatePassword = true;
      }
    },
    async fetchAddress1() {
      try {
        const response = await axios.get(
          'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000',
        );
        if (response.status === 200) {
          this.addressList1 = response.data.regcodes;
          this.addressList1.splice(7, 0, { code: '3600000000', name: '세종특별자치시' });
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
            if (this.address1 === '세종특별자치시') {
              this.addressList2.push(item.name);
            } else {
              this.addressList2.push(item.name.split(' ')[1]);
            }
          });
          this.addressList2.sort();
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
      if (!this.validateUsername) {
        alert(this.$t('alert.join.checkUsername'));
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
      if (!this.validateBirth) {
        alert(this.$t('alert.join.unavailableBirth'));
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
      if (this.password !== this.passwordConfirm) {
        alert(this.$t('alert.join.diffPassword'));
        return;
      }
      if (!this.validatePassword) {
        alert(this.$t('alert.join.notFormatPassword'));
        return;
      }
      if (!this.address1 || !this.address2) {
        alert(this.$t('alert.join.address'));
        return;
      }
      if (!this.type) {
        alert(this.$t('alert.join.type'));
        return;
      }
      if (!this.findOut) {
        alert(this.$t('alert.join.findOut'));
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
          type: this.type,
          findOut: this.findOutEtcText ? this.findOut + ':' + this.findOutEtcText : this.findOut,
        };
        const { data } = await join(payload);
        if (data.success) {
          this.$router.push('/join/complete');
        }
      } catch (error) {
        console.log(error.response.data.message);
        if (error.response.data.message === 'Email already exists.') {
          alert(this.$t('join.placeholder.existEmail'));
        }
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
