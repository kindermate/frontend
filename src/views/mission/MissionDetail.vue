<template>
  <section class="mission-detail">
    <div class="mission-info">
      <ProfileListBlock :member="member" :dark="true" />
      <div class="day">
        <div class="week">
          <b>{{ mission.items[0].week }}주차</b> / 12주
        </div>
        <div class="date">
          {{ mission.startDate | moment('add', '1 weeks', 'YYYY.MM.DD hh:mm 까지') }}
        </div>
      </div>
    </div>
    <div class="mission-content">
      <div v-for="(item, index) in mission.items" :key="index" class="mission-item">
        <div class="subject">
          <img v-if="item.code === 'CTT'" src="@/assets/img/icon_result_compass.svg" />
          <img v-if="item.code === 'MAT'" src="@/assets/img/icon_result_color.svg" />
          <img v-if="item.code === 'PBT'" src="@/assets/img/icon_result_family.svg" />
          <b>{{ $t(`mission.code.${item.code}`) }}</b> - {{ item.name }}
        </div>
        <div class="task-list">
          <div v-for="task in item.tasks" :key="task._id" class="task">
            <div class="task-title">
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
              <div class="term">
                <div class="image">
                  <img src="@/assets/img/icon_calendar_orange.svg" />
                </div>
                <span>{{ $t(`mission.term.${task.term}`) }}</span>
              </div>
            </div>
            <div v-if="getMemberAge < 84" class="task-content">
              <ol>
                <li v-for="(task, index) in createTasks(task.infant)" :key="index">{{ task }}</li>
              </ol>
              <hr />
            </div>
            <div v-else class="task-content">
              <ol>
                <li v-for="(task, index) in createTasks(task.student)" :key="index">{{ task }}</li>
              </ol>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <!-- memo -->
      <div class="memo">
        <div class="top">
          <h2>{{ $t('mission.memo.name') }}</h2>
          <a @click="showMemoWriteModal = true">
            <img src="@/assets/img/icon_add.svg" />
            <span>{{ $t('mission.memo.add') }}</span>
          </a>
        </div>
        <div class="notice">
          <img src="@/assets/img/icon_done.svg" />
          <p>{{ $t('mission.memo.description') }}</p>
        </div>
        <ul v-if="memos.length" class="memo-list">
          <li @click="clickMemo(memo._id)" v-for="memo in memos" :key="memo._id">
            <div class="content">{{ memo.content }}</div>
            <div class="date">{{ memo.createdAt | moment('MM월 DD일 A hh:mm') }}</div>
          </li>
        </ul>
        <div v-else class="empty">{{ $t('mission.memo.empty') }}</div>
      </div>
      <hr />
      <!-- rating -->
      <div class="rating">
        <div class="top">
          <h2>{{ $t('mission.rating.name') }}</h2>
        </div>
        <div class="notice">
          <img src="@/assets/img/icon_done.svg" />
          <p>{{ $t('mission.rating.description') }}</p>
        </div>
        <div class="star">
          <StarRating
            v-model="rating"
            :increment="0.5"
            :show-rating="false"
            :star-size="50"
            inactive-color="#dfe2e0"
            active-color="#f87761"
            @rating-selected="sendRating"
          />
        </div>
        <div class="comment">
          <span class="percentage"> {{ getPercentage(rating) }}% </span>
          {{ $t('mission.rating.comment') }}
        </div>
      </div>
      <!-- confirm -->
      <div class="buttons mt-6">
        <a @click="submitMission" class="button is-fullwidth is-primary">{{ $t('mission.save') }}</a>
      </div>
    </div>
    <!-- Memo Write -->
    <ModalBlank v-if="showMemoWriteModal" @close="showMemoWriteModal = false">
      <template>
        <h3>{{ $t('mission.memo.modalTitle.write') }}</h3>
        <textarea
          class="textarea"
          v-model="memoContent"
          :placeholder="$t('mission.memo.placeholder')"
        ></textarea>
        <a @click="addMemo" class="button is-fullwidth is-primary mt-4">{{
          $t('mission.memo.buttons.write')
        }}</a>
      </template>
    </ModalBlank>
    <!-- Memo Detail -->
    <ModalBlank v-if="showMemoDetailModal" @close="showMemoDetailModal = false">
      <template>
        <h3>{{ $t('mission.memo.modalTitle.edit') }}</h3>
        <textarea
          class="textarea"
          v-model="selectedMemo.content"
          :placeholder="$t('mission.memo.placeholder')"
        ></textarea>
        <div class="buttons is-centered">
          <button
            @click="editMemo"
            :disabled="this.selectedMemo.content === this.selectedMemoOriginalContent"
            class="button is-fullwidth is-primary mt-4"
          >
            {{ $t('mission.memo.buttons.edit') }}
          </button>
          <a @click="deleteMemo" class="delete-memo">
            <img src="@/assets/img/icon_delete.svg" />
            <span>삭제하기</span>
          </a>
        </div>
      </template>
    </ModalBlank>
  </section>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import {
  createMemo,
  getRating,
  sendRating,
  getMemoAll,
  getMemoOne,
  updateMemo,
  deleteMemo,
  missionComplete,
} from '@/api';
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';
import ModalBlank from '@/components/common/ModalBlank.vue';
import StarRating from 'vue-star-rating';

export default {
  data() {
    return {
      memos: '',
      selectedMemo: '',
      selectedMemoOriginalContent: '',
      rating: 0,
      showMemoWriteModal: false,
      showMemoDetailModal: false,
      memoContent: '',
    };
  },
  components: {
    ProfileListBlock,
    ModalBlank,
    StarRating,
  },
  computed: {
    ...mapState({
      mission: state => state.mission.currentMission,
      member: state => state.mission.currentMember,
    }),
    getMemberAge() {
      const today = moment(new Date());
      const birth = moment(this.member.birth);
      return today.diff(birth, 'months');
    },
    getMissionListCount() {
      return this.mission.items[0].week;
    },
  },
  methods: {
    getPercentage(value) {
      return value * 20;
    },
    createTasks(tasks) {
      const taskArray = tasks.split('\n');
      // 공백 제거
      const filteredArray = taskArray.filter(task => {
        if (task.length > 1) {
          return task;
        } else {
          return;
        }
      });
      // 앞 번호 제거
      const newTask = filteredArray.map(task => {
        return task.substr(3);
      });
      return newTask;
    },
    async fetchMemo() {
      try {
        const { data } = await getMemoAll({ id: this.mission.id, week: this.mission.items[0].week });
        this.memos = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addMemo() {
      if (!this.memoContent) {
        alert('내용을 작성하세요');
        return;
      }
      try {
        const payload = {
          mission: this.mission.id,
          content: this.memoContent,
          week: this.mission.items[0].week,
        };
        const { data } = await createMemo(payload);
        console.log(data);
        if (data.success) {
          this.showMemoWriteModal = false;
          this.memoContent = '';
          this.fetchMemo();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editMemo() {
      try {
        const payload = {
          id: this.selectedMemo._id,
          content: this.selectedMemo.content,
        };
        const { data } = await updateMemo(payload);
        if (data.success) {
          alert(this.$t('mission.memo.successUpdate'));
          this.fetchMemo();
          this.showMemoDetailModal = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMemo() {
      if (confirm('메모를 삭제할까요?')) {
        try {
          const { data } = await deleteMemo(this.selectedMemo._id);
          if (data.success) {
            this.showMemoDetailModal = false;
            this.fetchMemo();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async clickMemo(id) {
      try {
        const { data } = await getMemoOne(id);
        if (data.success) {
          this.selectedMemo = data.data;
          this.selectedMemoOriginalContent = data.data.content;
        }
        this.showMemoDetailModal = true;
      } catch (error) {
        console.log(error);
      }
    },
    async submitMission() {
      try {
        const { data } = await missionComplete(this.mission.id);
        if (data.success) {
          this.$router.push('/mission/next');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchRating() {
      try {
        const payload = {
          mission: this.mission.id,
          week: this.mission.items[0].week,
          // code: this.mission.code,
        };
        const { data } = await getRating(payload);
        if (data.success && data.data !== null) {
          this.rating = data.data.rating;
          this.$store.commit('SET_RATING', this.rating);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async sendRating() {
      try {
        const payload = {
          mission: this.mission.id,
          week: this.mission.items[0].week,
          // code: this.mission.code,
          rating: this.rating,
        };
        const { data } = await sendRating(payload);
        if (data.success) {
          this.$store.commit('SET_RATING', this.rating);
        }
        // if(data)
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchMemo();
    this.fetchRating();
  },
};
</script>

<style lang="scss" scoped>
.mission-detail {
  display: flex;
  flex-direction: column;
  .mission-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 1.5rem 1.5rem;
    .day {
      color: #fff;
      text-align: right;
      .week {
        font-size: $font-md;
        line-height: 1.2;
      }
      .date {
        font-size: $font-xs;
        opacity: 0.6;
      }
    }
  }
  .mission-content {
    flex: 1;
    background-color: #fff;
    padding: 2rem 2rem 120px;
    border-radius: 2rem 2rem 0 0;
    .subject {
      display: flex;
      align-items: center;
      font-size: $font-md;
      margin-bottom: 1.5rem;
      img {
        width: 28px;
        margin-right: 5px;
      }
      b {
        margin-right: 0.4rem;
      }
    }
    .task-list {
      .task-title {
        position: relative;
        border: 1px solid $grey-light;
        padding: 1.5rem 1.5rem 3rem;
        text-align: center;
        margin-bottom: 1.5rem;
        border-radius: 10px;
        overflow: hidden;
        h3 {
          font-size: $font-lg;
          font-weight: $font-w600;
          margin-bottom: 0.2rem;
          color: $black;
        }
        p {
          color: $black;
          word-break: keep-all;
          line-height: 1.4;
        }
        .term {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $orange;
          font-size: $font-xs;
          font-weight: $font-w600;
          line-height: 1;
          background-color: $grey-light-xx;
          padding: 0.5rem;
          .image {
            width: 12px;
            margin-right: 3px;
          }
        }
      }
      .task-content {
        white-space: pre-wrap;
        ol {
          margin-left: 20px;
          li {
            margin-bottom: 1rem;
            line-height: 1.4;
            &::marker {
              color: $orange;
              font-weight: $font-w600;
            }
          }
        }
      }
    }

    hr {
      margin: 3rem 0;
    }

    .memo {
      .top {
        display: flex;
        justify-content: space-between;
        h2 {
          font-size: $font-lg;
          font-weight: $font-w600;
        }
        a {
          display: flex;
          align-items: center;
          color: $orange;
          img {
            width: 20px;
            margin-right: 3px;
          }
        }
      }
      .memo-list {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        li {
          display: flex;
          flex-direction: column;
          background-color: #ecf8fa;
          padding: 1rem;
          font-size: $font-sm;
          line-height: 1.3;
          color: rgba(0, 0, 0, 0.8);
          height: 150px;
          cursor: pointer;
          &:nth-child(1n) {
            background-color: #ecf8fa;
          }
          &:nth-child(2n) {
            background-color: #fdf9e3;
          }
          &:nth-child(3n) {
            background-color: #fdebe3;
          }
          &:nth-child(4n) {
            background-color: #e3fdea;
          }
          &:nth-child(5n) {
            background-color: #efeaf2;
          }
          .content {
            overflow-y: auto;
            word-break: break-all;
          }
          .date {
            margin-top: auto;
            font-size: 11px;
            opacity: 0.5;
          }
        }
      }
      .empty {
        text-align: center;
        padding: 2rem;
        color: $grey;
      }
    }
    .notice {
      display: flex;
      align-items: flex-start;
      border: 1px solid $grey-light;
      // background-color: $grey-light-xx;
      padding: 0.7rem;
      border-radius: 5px;
      margin: 0.5rem 0 1.5rem;
      img {
        width: 15px;
        margin-right: 4px;
      }
      p {
        font-size: $font-xs;
        line-height: 1.3;
        color: $grey;
      }
    }
    .rating {
      margin-top: 3rem;
      .top {
        h2 {
          font-size: $font-lg;
          font-weight: $font-w600;
        }
      }
      .star {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
      }
      .comment {
        text-align: center;
        margin-top: 1rem;
        font-size: $font-lg;
        .percentage {
          font-weight: $font-w800;
        }
      }
    }
  }
  .modal {
    h3 {
      font-size: $font-lg;
      margin-bottom: 0.5rem;
      font-weight: $font-w500;
    }
    textarea {
      background-color: $grey-light-xx;
      border: 0;
      resize: none;
      box-shadow: none;
      height: 200px;
    }
    .delete-memo {
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
