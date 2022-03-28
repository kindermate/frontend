<template>
  <section class="manage-members">
    <h1 class="page-title">{{ $t('manageMembers.pageTitle') }}</h1>
    <p>{{ $t('manageMembers.description') }}</p>
    <ul v-if="isLoaded" class="member-list">
      <li v-for="(member, index) in members" :key="member.id" @click="selectMember(index)">
        <ProfileListBlock :member="member" />
      </li>
    </ul>
    <!-- modal -->
    <ModalBlank v-if="showModal" @close="closeModal">
      <template>
        <h2>{{ $t('manageMembers.modalTitle') }}</h2>
        <div class="field">
          <label class="label">{{ $t('test.addMember.name') }}</label>
          <div class="control">
            <input
              v-model="selectedMember.name"
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
              v-model="selectedMember.birth"
              class="input"
              type="text"
              maxlength="8"
              :placeholder="$t('test.addMember.placeholder.birth')"
              disabled
            />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('test.addMember.gender') }}</label>
          <div class="control">
            <input
              :value="
                selectedMember.gender === 'male'
                  ? $t('join.placeholder.gender_male')
                  : $t('join.placeholder.gender_female')
              "
              class="input"
              type="text"
              maxlength="8"
              :placeholder="$t('test.addMember.placeholder.birth')"
              disabled
            />
          </div>
        </div>
        <div class="buttons">
          <button @click="editMember" class="button is-fullwidth is-success mt-5">
            {{ $t('manageMembers.editButton') }}
          </button>
          <a @click="deleteMember(selectedMember.id)" class="delete-member">
            <img src="@/assets/img/icon_delete.svg" />
            <span>삭제하기</span>
          </a>
        </div>
      </template>
    </ModalBlank>
  </section>
</template>

<script>
import { getMemberAll, updateMember, deleteMember } from '@/api';
import { mapState } from 'vuex';
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';
import ModalBlank from '@/components/common/ModalBlank.vue';

export default {
  data() {
    return {
      members: '',
      selectedMember: '',
      isLoaded: false,
      showModal: false,
    };
  },
  components: {
    ProfileListBlock,
    ModalBlank,
  },
  computed: {
    ...mapState({
      user: state => state.currentUser,
    }),
  },
  methods: {
    async fetchMembers() {
      try {
        const { data } = await getMemberAll(this.user.id);
        if (data.success) {
          this.members = data.data;
          this.isLoaded = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editMember() {
      if (!this.selectedMember.name) {
        alert('이름을 입력하세요.');
        return;
      }
      try {
        const payload = {
          id: this.selectedMember.id,
          name: this.selectedMember.name,
        };
        const { data } = await updateMember(payload);
        if (data.success) {
          this.showModal = false;
          this.fetchMembers();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMember(id) {
      if (confirm(this.$t('manageMembers.deleteMemberConfirm'))) {
        try {
          const { data } = await deleteMember(id);
          if (data.success) {
            this.showModal = false;
            this.fetchMembers();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    selectMember(index) {
      this.selectedMember = this.members[index];
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  created() {
    this.fetchMembers();
  },
};
</script>

<style lang="scss" scoped>
.manage-members {
  p {
    color: $grey;
  }
  .member-list {
    margin-top: 2rem;
    li {
      background-color: #fff;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  }
  .modal {
    h2 {
      font-size: $font-lg;
      font-weight: $font-w600;
      margin-bottom: 1rem;
    }
    .delete-member {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 0.3rem;
      img {
        display: block;
        width: 15px;
        margin-right: 4px;
      }
      span {
        color: $black;
        font-size: $font-sm;
        font-weight: $font-w500;
        user-select: none;
      }
    }
  }
}
</style>
