<template>
  <section class="select-member">
    <h1 class="page-title">{{ $t('test.selectMember.greeting') }}</h1>
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
          <div v-if="member.hasActiveMission" class="bottom">미션을 완수한 이후 재검사가 가능합니다</div>
        </div>
      </li>
    </ul>
    <div class="empty" v-else>{{ $t('noData.member') }}</div>
    <a @click.prevent="showModal = true" class="addButton">
      <img src="@/assets/img/icon_add.svg" />
      <span>{{ $t('test.selectMember.addButton') }}</span>
    </a>
    <div class="buttons mt-6">
      <a @click="nextPage" class="button is-fullwidth is-success" :disabled="!selectComplete">
        {{ $t('test.selectMember.completeButton') }}
      </a>
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
import { getMemberAll, createMember } from '@/api';
import ModalBlank from '@/components/common/ModalBlank.vue';
import moment from 'moment';

export default {
  data() {
    return {
      members: '',
      selectedMemberId: '',
      showModal: false,
      name: '',
      birth: '',
      gender: '',
      selectComplete: false,
    };
  },
  components: {
    ModalBlank,
  },
  watch: {
    selectedMemberId(value) {
      if (value) {
        this.selectComplete = true;
      }
    },
    birth() {
      return (this.birth = this.birth.replace(/[^0-9]/g, ''));
    },
  },
  methods: {
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
        const { data } = await getMemberAll(this.$store.state.currentUser.id);
        this.members = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    selectMember(event, index) {
      if (this.members[index].hasActiveMission) {
        alert('선택한 대상자는 현재 미션을 진행중입니다.');
        return;
      }

      this.$refs.member.forEach(item => {
        item.classList.remove('is-active');
      });
      // 선택된 요소의 data-id를 store에 저장
      event.currentTarget.classList.add('is-active');
      this.selectedMemberId = event.currentTarget.getAttribute('data-id');
      this.members.forEach(member => {
        if (this.selectedMemberId === member._id) {
          this.$store.commit('SET_MEMBER', member);
          this.$store.commit('SET_LASTESTMEMBER', member._id);
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
      this.$router.push('/test/cover');
    },
  },
  created() {
    this.$store.commit('RESET_MEMBER');
    this.$store.commit('RESET_QUESTION');
    this.$store.commit('SET_CURRENT_TEST', 'CTT');
    this.fetchMemberAll();
  },
};
</script>

<style lang="scss" scoped>
.select-member {
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
  .modal {
    h2 {
      font-size: $font-lg;
      font-weight: $font-w600;
      margin-bottom: 1rem;
    }
  }
}
</style>
