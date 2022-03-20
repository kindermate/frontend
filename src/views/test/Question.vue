<template>
  <section class="question">
    <!-- member info -->
    <div class="member-info">
      <div class="name">{{ member.name }}</div>
      <div class="info">{{ getGender(member.gender) }} / {{ member.birth | moment('YYYY년 M월 D일생') }}</div>
    </div>

    <!-- question list -->
    <div class="question-list">
      <div v-for="q in question" :key="q._id" class="item">
        <div class="order">{{ q.order }}</div>
        <div class="question-text">{{ q.question }}</div>
        <div v-if="code === 'CTT' || code === 'MAT'" class="answer-list">
          <div
            @click="selectAnswer($event, q.order, index + 1)"
            v-for="(answer, index) in $t('test.answer.five')"
            :key="index"
            class="answer"
          >
            {{ answer }}
          </div>
        </div>
        <div v-else class="answer-list is-four">
          <div
            @click="selectAnswer($event, q.order, index + 1)"
            v-for="(answer, index) in $t('test.answer.four')"
            :key="index"
            class="answer"
          >
            {{ answer }}
          </div>
        </div>
      </div>
    </div>

    <!-- button -->
    <a @click="checkProcess" class="button is-fullwidth is-primary mt-5" :disabled="!isFinish">{{
      $t('test.question.nextButton')
    }}</a>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { createAnswer } from '@/api';
export default {
  data() {
    return {
      isFinish: false,
    };
  },
  computed: {
    ...mapState({
      code: state => state.test.current,
      member: state => state.member,
      question: state => state.question,
      answer: state => state.answer,
    }),
  },
  methods: {
    selectAnswer(event, order, score) {
      this.$store.commit('SET_ANSWER', { code: this.code, key: order, value: score });
      event.target.parentNode.querySelectorAll('.answer').forEach(item => {
        item.classList.remove('is-active');
      });
      event.currentTarget.classList.add('is-active');
      if (this.question.length === Object.keys(this.answer[this.code]).length) {
        this.isFinish = true;
        this.$store.commit('SET_ANSWER_FINISH', this.code);
      }
    },
    async checkProcess() {
      if (this.code === 'CTT') {
        this.$store.commit('SET_CURRENT_TEST', 'MAT');
      } else if (this.code === 'MAT') {
        this.$store.commit('SET_CURRENT_TEST', 'PBT');
      } else if (this.code === 'PBT') {
        // save answers
        try {
          const payload = {
            owner: this.$store.state.member._id,
            answers: {
              CTT: Object.values(this.$store.state.answer.CTT),
              MAT: Object.values(this.$store.state.answer.MAT),
              PBT: Object.values(this.$store.state.answer.PBT),
            },
          };
          const { data } = await createAnswer(payload);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
        this.$router.push('/test/complete');
        return;
      }
      this.$router.replace('/test/cover');
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
  },
};
</script>

<style lang="scss" scoped>
.question {
  padding: 2rem 1rem;
  .member-info {
    display: flex;
    margin-bottom: 1.5rem;
    .name {
      font-weight: $font-w600;
      margin-right: 5px;
    }
    .info {
      color: $grey;
    }
  }
  .question-list {
    .item {
      background-color: #fff;
      margin-bottom: 2rem;
      padding: 3rem 1rem;
      border-radius: 20px;
      text-align: center;
      .order {
        font-size: $font-xl;
        font-weight: $font-w700;
        color: $grey-light;
        margin-bottom: 1rem;
      }
      .question-text {
        font-size: $font-xl;
        word-break: keep-all;
        line-height: 1.3;
        font-weight: $font-w600;
        margin-bottom: 2rem;
        padding: 0 1rem;
      }
      .answer-list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2px;
        &.is-four {
          grid-template-columns: repeat(4, 1fr);
        }
        .answer {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $grey-light-x;
          font-size: 13px;
          line-height: 1.2;
          border-radius: 5px;
          word-break: keep-all;
          font-weight: $font-w600;
          cursor: pointer;
          transition: all 0.3s ease;
          &:after {
            content: '';
            display: block;
            padding-bottom: 100%;
          }

          &.is-active {
            background-color: $orange;
            color: #fff;
            transform: translateY(-10px);
          }
        }
      }
    }
  }
}
</style>
