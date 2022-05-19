<template>
  <section v-if="isLoaded" class="result-detail">
    <div class="member-info">
      <ProfileListBlock :member="memberInfo(member)" :dark="true" />
      <!-- <a @click="downloadImage">다운로드</a> -->
    </div>
    <div class="result-content">
      <!-- 날짜 -->
      <div class="date">
        <div class="image">
          <img src="@/assets/img/calendar.svg" />
        </div>
        <span>
          {{ result.createdAt | moment('YYYY년 M월 D일 검사') }}
        </span>
      </div>
      <!-- 개요 -->
      <div class="overview">
        <h2>
          <span>{{ test.title }}</span>
        </h2>
        <p>{{ test.description }}</p>
      </div>
      <!-- 가이드 -->
      <div class="guide">
        <img src="@/assets/img/icon_quote_left.svg" />
        <h3 v-html="comment.comment" />
        <img src="@/assets/img/icon_quote_right.svg" />
        <!-- 점수 -->
        <div class="scores">
          <div class="text">{{ test.title }}</div>
          <div class="score">{{ result.score }}</div>
          <div class="grade">{{ transGrade(result.grade) }}</div>
          <div class="bar">
            <div class="core" :style="`width:${result.score}%`"></div>
          </div>
        </div>
        <div class="paragraph" v-html="comment.content" />
      </div>
      <hr />
      <!-- 히스토리 -->
      <div class="history">
        <div class="text">
          <img src="@/assets/img/icon_chart.svg" />
          <h3>
            <b>{{ member.name }}</b
            >의 {{ test.title }} 누적 데이터
          </h3>
        </div>
        <div v-if="history" class="data">
          <div class="chart">
            <LineChart :chart-data="chartData" :options="options" />
          </div>
          <ul class="history-list">
            <li v-for="result in history" :key="result._id">
              <div class="created">{{ result.createdAt | moment('YYYY년 MM월 DD일 a hh:mm') }}</div>
              <div class="score">{{ result.score }}</div>
              <div class="grade">{{ transGrade(result.grade) }}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- buttons -->
      <div class="buttons mt-6">
        <router-link to="/psycheck" class="button is-primary is-fullwidth">심리테스트 돌아가기</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import {
  getSimpleTestResultOne,
  getSimpleTestOneByCode,
  getSimpleTestResultComment,
  getSimpleTestResultAll,
} from '@/api';
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';
import LineChart from '@/components/result/LineChart.vue';

export default {
  data() {
    return {
      test: null,
      result: null,
      comment: null,
      history: null,
      isLoaded: false,
      chartData1: null,
      options: {
        elemets: {
          line: {
            tension: 0,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                // suggestedMax: 100,
                // min: 0,
              },
              min: 0,
              max: 100,
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  components: {
    ProfileListBlock,
    LineChart,
    // ScoreBar,
  },
  computed: {
    ...mapState({
      member: state => state.psycheck.currentMember,
    }),
  },
  methods: {
    memberInfo(member) {
      return { name: member.name, birth: member.birth, gender: member.gender, avatar: member.avatar };
    },
    transGrade(value) {
      return this.$t(`result.grade.${value}`);
    },
    async fetchResult() {
      try {
        const { data } = await getSimpleTestResultOne(this.$route.params.id);
        if (data.success) {
          this.result = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTestInfo() {
      try {
        const { data } = await getSimpleTestOneByCode(this.result.code);
        if (data.success) {
          this.test = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComment() {
      try {
        const { data } = await getSimpleTestResultComment({
          code: this.result.code,
          grade: this.result.grade,
        });
        if (data.success) {
          this.comment = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchResultAll() {
      try {
        const { data } = await getSimpleTestResultAll({ code: this.result.code, owner: this.member._id });
        if (data.success) {
          this.history = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    fillData() {
      let dates = [];
      let scores = [];
      this.history.forEach(result => {
        dates.push(moment(result.createdAt).format('MM/DD'));
        scores.push(result.score);
      });
      this.chartData = {
        // labels: this.$t('result.ctt.partsNames'),
        labels: dates,
        datasets: [
          {
            data: scores,
            lineTension: 0,
            backgroundColor: 'rgba(255,255,255,0)',
            borderColor: 'rgba(248,119,97,1)',
          },
        ],
      };
    },
  },
  async created() {
    // 결과 정보 fetch
    await this.fetchResult();
    // 검사 정보 fetch
    await this.fetchTestInfo();
    // 결과 문구 fetch
    await this.fetchComment();
    // 히스토리 fetch
    await this.fetchResultAll();
    this.fillData();
    // 로딩 완료
    this.isLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
.result-detail {
  display: flex;
  flex-direction: column;
  .member-info {
    padding: 0 1.5rem 1rem;
  }
  .result-content {
    flex: 1;
    background-color: #fff;
    padding: 1.5rem 1.5rem 120px;
    border-radius: 2rem 2rem 0 0;
    hr {
      margin: 3rem 0;
      background-color: $grey-light-x;
      height: 1px;
    }
    .date {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 0.8rem;
      .image {
        width: 16px;
        margin-right: 8px;
      }
      span {
        text-align: right;
        font-weight: $font-w500;
        font-size: $font-xs;
        padding-right: 5px;
      }
    }
    .overview {
      h2 {
        display: flex;
        align-items: center;
        font-size: $font-xl;
        font-weight: $font-w700;
        margin-bottom: 1rem;
        img {
          display: block;
          width: 30px;
          margin-right: 0.3rem;
        }
        &::after {
          display: block;
          margin-left: 0.5rem;
          flex: 1;
          content: '';
          height: 1px;
          background-color: #333;
        }
      }
      p {
        color: $grey;
        margin-bottom: 2rem;
        word-break: keep-all;
        font-size: $font-sm;
      }
    }
    .scores {
      position: relative;
      border: 3px solid #000;
      border-radius: 10px;
      padding: 0.8rem 0;
      width: 110px;
      height: 110px;
      margin: 2rem auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text {
        font-size: $font-xs;
        font-weight: $font-w700;
      }
      .score {
        font-size: 40px;
        line-height: 1.1;
        font-weight: $font-w800;
        margin: 0;
      }
      .grade {
        position: absolute;
        top: -15px;
        right: -15px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: $font-xs;
        font-weight: $font-w800;
        background-color: $orange;
        padding: 5px;
      }
      .bar {
        width: 60px;
        height: 8px;
        border-radius: 10px;
        background-color: #eee;
        overflow: hidden;
        .core {
          height: 100%;
          border-radius: 10px;
          background-color: $primary;
        }
      }
    }
    .guide {
      border-radius: 10px;
      img {
        width: 20px;
        display: block;
        margin: 0 auto;
      }
      h3 {
        font-size: $font-xl;
        font-weight: $font-w600;
        word-break: keep-all;
        width: 80%;
        text-align: center;
        margin: 0.8rem auto;
        line-height: 1.2;
      }
    }
    .history {
      margin-top: 2rem;
      .text {
        display: flex;
        align-items: center;
        img {
          width: 25px;
          margin-right: 5px;
        }
        h3 {
          font-size: $font-md;
          line-height: 1;
          font-weight: $font-w500;
        }
      }
      .chart {
        margin-top: 2rem;
        div {
          height: 150px;
        }
      }
      .history-list {
        margin-top: 1rem;
        li {
          display: flex;
          align-items: center;
          background-color: $grey-light-xx;
          border-radius: 3px;
          margin-bottom: 5px;
          padding: 7px 12px;
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
    }
  }
}
</style>

<style lang="scss">
.guide {
  .paragraph {
    margin-top: 2rem;
    background-color: $grey-light-xx;
    padding: 1.5rem;
    border-radius: 10px;
    font-weight: $font-w500;
    p {
      line-height: 1.5;
      margin-bottom: 1.5rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
