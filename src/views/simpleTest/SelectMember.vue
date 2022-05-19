<template>
  <section class="select-member">
    <h1 class="page-title">{{ $t('psycheck.selectMember.greeting') }}</h1>
    <ul v-if="members.length" class="member-list">
      <li
        ref="member"
        @click="selectMember($event, index)"
        v-for="(member, index) in members"
        :key="member._id"
        :data-id="member._id"
      >
        <div class="name">
          <img class="ok-off" src="@/assets/img/icon_ok_off.svg" />
          <img class="ok-on" src="@/assets/img/icon_ok_on.svg" />
          <span>{{ member.name }}</span>
        </div>
        <div class="info">
          <div class="top">
            {{ getGender(member.gender) }} / {{ member.birth | moment('YYYY년 MM월 DD일생') }}
          </div>
        </div>
      </li>
    </ul>
    <div class="empty" v-else>{{ $t('noData.member') }}</div>
    <a @click.prevent="showModal = true" class="addButton">
      <img src="@/assets/img/icon_add.svg" />
      <span>{{ $t('psycheck.selectMember.addButton') }}</span>
    </a>
    <div class="buttons mt-6">
      <a @click="nextPage" class="button is-fullwidth is-success" :disabled="!selectComplete">
        {{ $t('psycheck.selectMember.completeButton') }}
      </a>
    </div>
    <hr />
    <div v-if="selectComplete" class="recent-result">
      <h2>최근 결과 보기</h2>
      <ul v-if="recentResults.length > 0">
        <li
          @click="$router.push({ name: 'Psy Check Result', params: { id: result._id } })"
          v-for="result in recentResults"
          :key="result._id"
        >
          <div class="created">{{ result.createdAt | moment('YYYY년 MM월 DD일 a hh:mm') }}</div>
          <div class="score">{{ result.score }}</div>
          <div class="grade">{{ transGrade(result.grade) }}</div>
        </li>
      </ul>
      <div v-else class="empty">{{ $t('psycheck.selectMember.empty') }}</div>
    </div>

    <!-- 대상자 추가 모달 -->
    <ModalBlank v-if="showModal" @close="closeModal">
      <template>
        <h2>{{ $t('test.addMember.modalTitle') }}</h2>
        <form @submit.prevent="addMember">
          <div class="field">
            <label class="label">{{ $t('test.addMember.name') }}</label>
            <div class="control">
              <input
                v-model="name"
                class="input"
                type="text"
                :placeholder="$t('test.addMember.placeholder.name')"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $t('test.addMember.birth') }}</label>
            <div class="control">
              <input
                v-model="birth"
                class="input"
                type="text"
                maxlength="8"
                :placeholder="$t('test.addMember.placeholder.birth')"
                @blur="checkBirth"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $t('test.addMember.gender') }}</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="gender">
                  <option disabled value="">{{ $t('test.addMember.placeholder.gender') }}</option>
                  <option value="male">{{ $t('test.addMember.placeholder.gender_male') }}</option>
                  <option value="female">{{ $t('test.addMember.placeholder.gender_female') }}</option>
                </select>
              </div>
            </div>
          </div>
          <button class="button is-fullwidth is-success mt-5">{{ $t('test.addMember.addButton') }}</button>
        </form>
      </template>
    </ModalBlank>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getMemberAllWithSimpleTestResults, createMember } from '@/api';
import ModalBlank from '@/components/common/ModalBlank.vue';
import moment from 'moment';

export default {
  data() {
    return {
      members: '',
      selectedMemberId: '',
      recentResults: [],
      showModal: false,
      name: '',
      birth: '',
      validateBirth: false,
      gender: '',
      selectComplete: false,
    };
  },
  components: {
    ModalBlank,
  },
  computed: {
    ...mapState({
      code: state => state.psycheck.testCode,
    }),
  },
  watch: {
    selectedMemberId(value) {
      if (value) {
        this.selectComplete = true;
        this.findRecentResult();
      }
    },
    birth() {
      return (this.birth = this.birth.replace(/[^0-9]/g, ''));
    },
  },
  methods: {
    transGrade(value) {
      return this.$t(`result.grade.${value}`);
    },
    findRecentResult() {
      // selectedId 로 member 검색
      const member = this.members.find(member => {
        return member.id === this.selectedMemberId;
      });
      // member의 simpleTests가 존재할 경우
      // 현재 선택된 테스트의 코드와 일치하는 결과를 데이터에 주입
      if (member.simpleTests.length > 0) {
        const results = member.simpleTests.filter(result => {
          return result.code === this.code;
        });
        this.recentResults = results;
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
    },
    getGender(gender) {
      let result;
      if (gender === 'male') {
        result = '남';
      } else {
        result = '여';
      }
      return result;
    },
    getMonths(birth) {
      const today = moment(new Date());
      return today.diff(moment(birth), 'months');
    },
    async fetchMemberAll() {
      try {
        const { data } = await getMemberAllWithSimpleTestResults(this.$store.state.currentUser.id);
        this.members = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    selectMember(event) {
      this.$refs.member.forEach(item => {
        item.classList.remove('is-active');
      });
      // 선택된 요소의 data-id를 store에 저장
      event.currentTarget.classList.add('is-active');
      this.selectedMemberId = event.currentTarget.getAttribute('data-id');
      this.members.forEach(member => {
        if (this.selectedMemberId === member._id) {
          this.$store.commit('SET_PSYCHECK_MEMBER', member);
        }
      });
    },
    async addMember() {
      if (this.birth) {
        const today = moment(new Date());
        const memberBirth = moment(this.birth);
        const diff = today.diff(memberBirth, 'months');
        console.log(diff);
        if (diff > 120) {
          alert(this.$t('alert.addMember.limit'));
          return;
        } else if (diff < 24) {
          alert(this.$t('alert.addMember.limit'));
          return;
        }
      }
      if (!this.name) {
        alert(this.$t('alert.addMember.name'));
        return;
      }
      if (!this.birth) {
        alert(this.$t('alert.addMember.birth'));
        return;
      }
      if (!this.validateBirth) {
        alert(this.$t('alert.join.unavailableBirth'));
        return;
      }
      if (!this.gender) {
        alert(this.$t('alert.addMember.gender'));
        return;
      }
      try {
        const payload = {
          parent: this.$store.state.currentUser.id,
          name: this.name,
          birth: this.birth,
          gender: this.gender,
        };
        const { data } = await createMember(payload);
        console.log(data);
        if (data.success) {
          this.closeModal();
          this.$router.go();
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeModal() {
      this.showModal = false;
    },
    nextPage() {
      if (!this.selectComplete) {
        alert('검사 대상자를 선택해주세요');
        return;
      }
      this.$router.push('/psycheck/question');
    },
  },
  created() {
    this.fetchMemberAll();
    this.$store.commit('SET_PSYCHECK_MEMBER', {});
  },
};
</script>

<style lang="scss" scoped>
.select-member {
  margin-bottom: 3rem;
  .member-list {
    margin-top: 2rem;
    li {
      display: flex;
      justify-content: space-between;
      border: 2px solid #eee;
      padding: 1rem;
      border-radius: 5px;
      margin-bottom: 0.5rem;
      cursor: pointer;

      &.is-active {
        .ok-on {
          display: block !important;
        }
        .ok-off {
          display: none;
        }
        border-color: $green;
        .name,
        .info {
          font-weight: $font-w600;
          color: $black;
        }
      }
      .name {
        display: flex;
        align-items: center;
        color: $grey;
        img {
          width: 20px;
          margin-right: 3px;
          &.ok-on {
            display: none;
          }
        }
      }
      .info {
        color: $grey;
        font-size: $font-sm;
        text-align: right;
        .bottom {
          font-size: 12px;
          color: $orange;
        }
      }
    }
  }
  .empty {
    text-align: center;
    padding: 1.5rem;
    color: $grey;
  }
  .addButton {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    color: $orange;
    font-weight: $font-w500;
    img {
      display: block;
      width: 20px;
      margin-right: 3px;
    }
  }
  .recent-result {
    h2 {
      font-weight: $font-w600;
      margin-bottom: 1rem;
      font-size: $font-md;
    }
    ul {
      li {
        display: flex;
        align-items: center;
        background-color: $grey-light-xx;
        border-radius: 3px;
        margin-bottom: 5px;
        padding: 7px 12px;
        cursor: pointer;
        .created {
          font-size: $font-xs;
          font-weight: $font-w500;
          margin-right: auto;
        }
        .score {
          font-size: $font-md;
          font-weight: $font-w700;
          margin-right: 10px;
        }
        .grade {
          font-size: $font-sm;
          font-weight: $font-w500;
        }
      }
    }
    .empty {
      background-color: $grey-light-xx;
      border-radius: 10px;
      font-size: $font-sm;
      color: $grey;
    }
  }
  .modal {
    h2 {
      font-size: $font-lg;
      font-weight: $font-w600;
      margin-bottom: 1rem;
    }
  }
}
</style>
