<template>
  <section class="result">
    <h1 class="page-title">{{ $t('result.greeting') }}</h1>
    <p>{{ $t('result.description') }}</p>
    <ul class="member-list">
      <li v-for="(member, index) in members" :key="member.id" @click="showMember(index)">
        <ProfileListBlock :member="memberInfo(member)" :index="index" />
        <div class="info">
          <div v-if="member.results.length" class="date">
            <CircleIcon>
              <img src="@/assets/img/time.svg" />
            </CircleIcon>
            {{ recentDate(member) }}
          </div>
          <div class="results">
            <CircleIcon>
              <img src="@/assets/img/increase.svg" />
            </CircleIcon>
            {{ resultLength(member) }}
          </div>
        </div>
      </li>
    </ul>
    <!-- modal -->
    <ModalBlank v-if="showModal" @close="closeModal" class="member-detail">
      <template>
        <div class="top-info">
          <ProfileListBlock :member="memberInfo(selectedMember)" />
          <div class="info">
            <div v-if="selectedMember.results.length" class="date">
              <CircleIcon>
                <img src="@/assets/img/time.svg" />
              </CircleIcon>
              {{ recentDate(selectedMember) }}
            </div>
            <div class="results">
              <CircleIcon>
                <img src="@/assets/img/increase.svg" />
              </CircleIcon>
              {{ resultLength(selectedMember) }}
            </div>
          </div>
        </div>
        <p class="no-data" v-if="selectedMember.results.length === 0">{{ $t('result.noData') }}</p>
        <ul v-else class="result-list">
          <li @click="showResult(result)" v-for="result in selectedMember.results" :key="result.id">
            <div class="date">{{ result.createdAt | moment('YYYY년 M월 D일') }}</div>
            <div class="view">{{ $t('viewMore') }}</div>
          </li>
        </ul>
      </template>
    </ModalBlank>
  </section>
</template>

<script>
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';
import ModalBlank from '@/components/common/ModalBlank.vue';
import CircleIcon from '@/components/common/CircleIcon.vue';
import moment from 'moment';

import { getResultAll } from '@/api';
export default {
  data() {
    return {
      members: '',
      showModal: false,
      selectedMember: '',
    };
  },
  components: {
    ProfileListBlock,
    CircleIcon,
    ModalBlank,
  },
  methods: {
    resultLength(member) {
      if (member.results.length) {
        return `${member.results.length} ${this.$t('result.list.count')}`;
      } else {
        return this.$t('result.list.empty');
      }
    },
    recentDate(member) {
      if (member.results.length) {
        return moment(member.results[0].createdAt).fromNow();
      }
    },
    memberInfo(member) {
      return { name: member.name, birth: member.birth, gender: member.gender, avatar: member.avatar };
    },
    showMember(index) {
      this.selectedMember = this.members[index];
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async fetchResultAll() {
      try {
        const { data } = await getResultAll(this.$store.state.currentUser.id);
        if (data.success) {
          this.members = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    showResult(result) {
      this.$store.commit('SET_RESULT', { member: this.selectedMember, result: result });
      this.$router.push('/result/detail');
    },
  },
  created() {
    this.fetchResultAll();
  },
};
</script>

<style lang="scss" scoped>
.result {
  p {
    color: $grey;
  }
  .member-list {
    margin-top: 2rem;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: 10px;
      cursor: pointer;
      .info {
        display: flex;
        font-size: $font-sm;
        .date {
          display: flex;
          align-items: center;
          margin-right: 15px;
        }
        .results {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .member-detail {
    .top-info {
      display: flex;
      justify-content: space-between;
      .info {
        display: flex;
        align-items: center;
        font-size: $font-sm;
        .date {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .results {
          display: flex;
          align-items: center;
        }
      }
    }
    .no-data {
      text-align: center;
      padding: 2rem;
      color: $grey;
    }
    .result-list {
      margin-top: 1.5rem;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $grey-light-xx;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        cursor: pointer;
        .date {
          font-weight: $font-w600;
        }
        .view {
          font-size: $font-sm;
          color: $grey;
        }
      }
    }
  }
}
</style>
