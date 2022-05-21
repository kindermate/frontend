<template>
  <section v-if="question" class="question">
    <!-- member info -->
    <div class="member-info">
      <div class="name">{{ member.name }}</div>
      <div class="info">{{ getGender(member.gender) }} / {{ member.birth | moment('YYYY년 M월 D일생') }}</div>
    </div>

    <!-- question list -->
    <div class="question-list">
      <div ref="question" v-for="q in question" :key="q._id" class="item">
        <div class="order">{{ q.order }}</div>
        <div class="question-text">{{ q.question }}</div>
        <div class="answer-list">
          <div
            @click="selectAnswer($event, q.order, index + 1)"
            v-for="(answer, index) in $t('psycheck.answer.five')"
            :key="index"
            class="answer"
            v-html="answer"
          ></div>
        </div>
      </div>
    </div>

    <!-- button -->
    <a @click="complete" class="button is-fullwidth is-primary mt-5" :disabled="!isFinish">{{
      $t('psycheck.question.completeButton')
    }}</a>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getSimpleTestQuestion, saveSimpleTestResult } from '@/api';

export default {
  data() {
    return {
      question: [],
      answers: {},
      finalScore: '',
      grade: '',
      isFinish: false,
    };
  },
  computed: {
    ...mapState({
      testCode: state => state.psycheck.testCode,
      member: state => state.psycheck.currentMember,
    }),
  },
  methods: {
    selectAnswer(event, order, score) {
      // 선택된 답변 클래스 처리
      event.target.parentNode.querySelectorAll('.answer').forEach(item => {
        item.classList.remove('is-active');
      });
      event.currentTarget.classList.add('is-active');
      // isInverse일 경우 역순 채점
      if (this.question[order - 1].isInverse) {
        switch (score) {
          case 1:
            score = 5;
            break;
          case 2:
            score = 4;
            break;
          case 3:
            score = 3;
            break;
          case 4:
            score = 2;
            break;
          case 5:
            score = 1;
            break;
        }
      }
      this.answers[order] = score;
      // 문항과 답변의 개수 체크
      this.checkAnswer();
    },
    checkAnswer() {
      if (this.question.length === Object.keys(this.answers).length) {
        this.isFinish = true;
      }
    },
    calculateScore() {
      let finalScore = 0;
      for (const answer of Object.keys(this.answers)) {
        finalScore = finalScore + this.answers[answer];
      }
      finalScore = (finalScore / (this.question.length * 5)) * 100;
      return Math.round(finalScore);
    },
    calculateGrade() {
      if (this.finalScore >= 70) {
        return 'H';
      } else if (this.finalScore < 69 && this.finalScore > 40) {
        return 'N';
      } else {
        return 'L';
      }
    },
    async complete() {
      if (!this.isFinish) {
        alert(this.$t('psycheck.question.alert'));
        return;
      }
      // 점수 합산
      this.finalScore = this.calculateScore();
      this.grade = this.calculateGrade();
      try {
        const payload = {
          code: this.testCode,
          owner: this.member._id,
          score: this.finalScore,
          grade: this.grade,
        };
        console.log(payload);
        const { data } = await saveSimpleTestResult(payload);
        console.log(data);
        if (data.success) {
          this.$router.push({ name: 'Psy Check Result', params: { id: data.data._id } });
        }
      } catch (error) {
        console.log(error);
      }
      // this.$router.push('/test/complete');
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
    async fetchQuestion() {
      try {
        const { data } = await getSimpleTestQuestion(this.testCode);
        if (data.success) {
          this.question = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchQuestion();
  },
};
</script>

<style lang="scss" scoped>
.question {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
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
