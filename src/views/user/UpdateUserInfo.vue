<template>
  <section class="join">
    <h1 class="page-title">{{ $t('updateUserInfo.pageTitle') }}</h1>
    <p>{{ $t('updateUserInfo.description') }}</p>
    <hr />
    <form @submit.prevent="submit">
      <!-- 아이디 -->
      <div class="field">
        <label class="label">{{ $t('join.username') }}</label>
        <div class="control">
          <input
            :value="user.username"
            class="input"
            type="text"
            :placeholder="$t('join.placeholder.username')"
            disabled
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
      <!-- 주소 -->
      <div class="field">
        <label class="label">{{ $t('join.address') }}</label>
        <div class="control is-address">
          <div class="select">
            <select ref="address1" v-model="address1" @change="selectAddress1">
              <option disabled value="">{{ $t('join.placeholder.address') }}</option>
              <option v-for="item in addressList1" :key="item.code" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="select">
            <select ref="address2" v-model="address2">
              <option disabled value="">{{ $t('join.placeholder.address') }}</option>
              <option v-for="(item, index) in addressList2" :key="index" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <button class="button is-primary is-fullwidth mt-6">수정완료</button>
    </form>
  </section>
</template>

<script>
import { updateUserInfo } from '@/api';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      nickname: '',
      email: '',
      birth: '',
      gender: '',
      address1: '',
      address2: '',
      // recommander: '',
      addressList1: [],
      addressList2: [],
      initValues: {},
    };
  },
  computed: {
    ...mapState({
      user: state => state.currentUser,
    }),
  },
  methods: {
    async fetchAddress1() {
      try {
        const response = await axios.get(
          'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000',
        );
        if (response.status === 200) {
          this.addressList1 = response.data.regcodes;
          await this.$nextTick();
          // address1 선택
          this.$refs.address1.childNodes.forEach(item => {
            if (this.user.address1 === item.value) {
              item.selected = true;
              this.address1 = item.value;
              this.selectAddress1();
            }
          });
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
        await this.$nextTick();
        // address2 선택
        this.$refs.address2.childNodes.forEach(item => {
          if (this.user.address2 === item.value) {
            item.selected = true;
            this.address2 = item.value;
          }
        });
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    selectAddress1() {
      console.log('select');
      const address = this.addressList1.find(item => item.name === this.address1);
      this.fetchAddress2(address.code);
    },
    async submit() {
      // 수정된 value 검출
      let changedValues = [];
      for (const key of Object.keys(this.initValues)) {
        if (this[key] !== this.initValues[key]) {
          changedValues.push(key);
        }
      }
      if (changedValues.length === 0) {
        alert(this.$t('updateUserInfo.alert.noChanged'));
        return;
      }

      // 수정할 payload 만들기
      const payload = {};
      changedValues.forEach(item => {
        payload[item] = this[item];
      });
      payload['id'] = this.user.id;

      // Update process
      try {
        const { data } = await updateUserInfo(payload);
        if (data.success) {
          this.$store.commit('SET_USER', data.data);
          alert(this.$t('updateUserInfo.alert.success'));
          this.$router.go(-1);
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeModal() {
      this.showModal = false;
    },
  },
  created() {
    this.fetchAddress1();

    this.username = this.user.username;
    this.nickname = this.user.nickname;
    this.email = this.user.email;
    this.birth = this.user.birth;
    this.gender = this.user.gender;
    this.address1 = this.user.address1;
    this.address2 = this.user.address2;

    // 수정 전 Values
    this.initValues = {
      username: this.username,
      nickname: this.nickname,
      email: this.email,
      birth: this.birth,
      gender: this.gender,
      address1: this.address1,
      address2: this.address2,
    };
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
