<template>
  <section v-if="isLoaded" class="result-detail">
    <div class="member-info">
      <ProfileListBlock :member="memberInfo(member)" :dark="true" />
    </div>
    <div class="result-content">
      <div class="date">
        <div class="image">
          <img src="@/assets/img/calendar.svg" />
        </div>
        <span>
          {{ result.createdAt | moment('YYYY년 M월 D일 검사') }}
        </span>
      </div>
      <!-- ctt -->
      <div class="part">
        <h2>{{ $t('result.ctt.name') }}</h2>
        <p>{{ $t('result.ctt.description') }}</p>
        <div class="extra">
          <h3>
            아이는 <b>{{ commentaries.EXTRA[0].title }}</b> 성향을 보입니다.
          </h3>
          <p>
            {{ commentaries.EXTRA[0].content }}
          </p>
        </div>
        <!-- chart -->
        <div class="chart">
          <BarChart :chart-data="chartData1" :options="options" />
        </div>
        <dl class="summary">
          <dt>{{ $t('result.ctt.summary.title') }}</dt>
          <dd>{{ $t('result.ctt.summary.description') }}</dd>
        </dl>
        <div class="information">{{ $t('result.ctt.info') }}</div>
        <div v-for="(part, index) in $t('result.ctt.parts')" :key="index" class="part-item">
          <h4>{{ part.name }}</h4>
          <p>{{ part.description }}</p>
          <hr />
          <div class="rating">
            <div class="score">
              {{ results[0].part[index].score.TW }}
            </div>
            <ScoreBar :score="results[0].part[index].score.TW" :grade="results[0].part[index].score.grade" />
            <div class="grade">
              {{ transGrade(results[0].part[index].score.grade) }}
            </div>
          </div>
          <div class="commentary">{{ commentaries.CTT[index] }}</div>
        </div>
      </div>
      <div class="guide">
        <h2>종합가이드</h2>
        <div class="content" v-html="guides.CTT.content"></div>
      </div>
      <hr />
      <!-- mat -->
      <div class="part">
        <h2>{{ $t('result.mat.name') }}</h2>
        <p>{{ $t('result.mat.description') }}</p>
        <ul class="strongs">
          <li>
            <b>강한적성</b>
            <div v-if="results[1].extra.strongs.length > 0" class="element">
              <span v-for="(item, index) in getStrongs(results[1].extra.strongs)" :key="index">{{
                item
              }}</span>
            </div>
            <div v-else>없음</div>
          </li>
          <li>
            <b>약한적성</b>
            <div v-if="results[1].extra.weaks.length > 0" class="element">
              <span v-for="(item, index) in getStrongs(results[1].extra.weaks)" :key="index">{{ item }}</span>
            </div>
            <div v-else>없음</div>
          </li>
        </ul>
        <!-- chart -->
        <div class="chart">
          <BarChart :chart-data="chartData2" :options="options" />
        </div>
        <dl class="summary">
          <dt>{{ $t('result.mat.summary.title') }}</dt>
          <dd>{{ $t('result.mat.summary.description') }}</dd>
        </dl>
        <div class="information">{{ $t('result.mat.info') }}</div>
        <div v-for="(part, index) in $t('result.mat.parts')" :key="index" class="part-item">
          <h4>{{ part.name }}</h4>
          <p>{{ part.description }}</p>
          <hr />
          <div class="rating">
            <div class="score">
              {{ results[1].part[index].score.TW }}
            </div>
            <ScoreBar :score="results[1].part[index].score.TW" :grade="results[1].part[index].score.grade" />
            <div class="grade">
              {{ transGrade(results[1].part[index].score.grade) }}
            </div>
          </div>
          <div class="commentary">{{ commentaries.MAT[index] }}</div>
        </div>
      </div>
      <hr />
      <!-- pbt -->
      <div class="part">
        <h2>{{ $t('result.pbt.name') }}</h2>
        <p>{{ $t('result.pbt.description') }}</p>
        <div class="extra">
          <h3>
            양육자는 <b>{{ commentaries.EXTRA[1].title }}</b
            >을 보이는 것으로 생각됩니다.
          </h3>
          <p>
            {{ commentaries.EXTRA[1].content }}
          </p>
        </div>
        <!-- chart -->
        <div class="chart">
          <BarChart :chart-data="chartData3" :options="options" />
        </div>
        <dl class="summary">
          <dt>{{ $t('result.pbt.summary.title') }}</dt>
          <dd>{{ $t('result.pbt.summary.description') }}</dd>
        </dl>
        <div class="information">{{ $t('result.pbt.info') }}</div>
        <div v-for="(part, index) in $t('result.pbt.parts')" :key="index" class="part-item">
          <h4>{{ part.name }}</h4>
          <p>{{ part.description }}</p>
          <hr />
          <div class="rating">
            <div class="score">
              {{ results[2].part[index].score.TW }}
            </div>
            <ScoreBar :score="results[2].part[index].score.TW" :grade="results[2].part[index].score.grade" />
            <div class="grade">
              {{ transGrade(results[2].part[index].score.grade) }}
            </div>
          </div>
          <div class="commentary">{{ commentaries.PBT[index] }}</div>
        </div>
      </div>
      <div class="guide">
        <h2>종합가이드</h2>
        <div class="content" v-html="guides.PBT.content"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { getCommentary, getGuides } from '@/api';
import ProfileListBlock from '@/components/member/ProfileListBlock.vue';
import BarChart from '@/components/result/BarChart.vue';
import ScoreBar from '@/components/result/ScoreBar.vue';

export default {
  data() {
    return {
      commentaries: {},
      guides: {},
      isLoaded: false,
      chartData1: null,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 100,
                min: 0,
              },
              min: 0,
              max: 90,
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
    BarChart,
    ScoreBar,
  },
  computed: {
    ...mapState({
      member: state => state.result.currentMember,
      result: state => state.result.currentResult,
      results: state => state.result.currentResult.results,
    }),
  },
  methods: {
    fillData() {
      this.chartData1 = {
        labels: this.$t('result.ctt.partsNames'),
        datasets: [
          {
            label: 'Main One',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            data: [
              this.results[0].part[0].score.TW,
              this.results[0].part[1].score.TW,
              this.results[0].part[2].score.TW,
              this.results[0].part[3].score.TW,
              this.results[0].part[4].score.TW,
              this.results[0].part[5].score.TW,
            ],
            borderWidth: 1,
          },
        ],
      };
      this.chartData2 = {
        labels: this.$t('result.mat.partsNames'),
        datasets: [
          {
            label: 'Main One',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            data: [
              this.results[1].part[0].score.TW,
              this.results[1].part[1].score.TW,
              this.results[1].part[2].score.TW,
              this.results[1].part[3].score.TW,
              this.results[1].part[4].score.TW,
              this.results[1].part[5].score.TW,
              this.results[1].part[6].score.TW,
              this.results[1].part[7].score.TW,
            ],
            borderWidth: 1,
          },
        ],
      };
      this.chartData3 = {
        labels: this.$t('result.pbt.partsNames'),
        datasets: [
          {
            label: 'Main One',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            data: [
              this.results[2].part[0].score.TW,
              this.results[2].part[1].score.TW,
              this.results[2].part[2].score.TW,
              this.results[2].part[3].score.TW,
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 4)) + 5;
    },
    memberInfo(member) {
      return { name: member.name, birth: member.birth, gender: member.gender, avatar: member.avatar };
    },
    transGrade(value) {
      return this.$t(`result.grade.${value}`);
    },
    getStrongs(items) {
      const array = [];
      if (items.length === 0) {
        return '없음';
      } else {
        items.map(item => {
          switch (item) {
            case 0:
              array.push('음악리듬');
              break;
            case 1:
              array.push('운동조작');
              break;
            case 2:
              array.push('논리추론');
              break;
            case 3:
              array.push('공간구성');
              break;
            case 4:
              array.push('대인관계');
              break;
            case 5:
              array.push('상징조작');
              break;
            case 6:
              array.push('언어표현');
              break;
            case 7:
              array.push('자기통제');
              break;
          }
        });
      }
      return array;
    },
    async makeCommentaries() {
      // CTT: 파트 6개, extra
      // MAT: 파트 8개
      // PBT: 파트 4개, extra
      const payload = `CTT=${this.results[0].part[0].score.grade},${this.results[0].part[1].score.grade},${this.results[0].part[2].score.grade},${this.results[0].part[3].score.grade},${this.results[0].part[4].score.grade},${this.results[0].part[5].score.grade}&MAT=${this.results[1].part[0].score.grade},${this.results[1].part[1].score.grade},${this.results[1].part[2].score.grade},${this.results[1].part[3].score.grade},${this.results[1].part[4].score.grade},${this.results[1].part[5].score.grade},${this.results[1].part[6].score.grade},${this.results[1].part[7].score.grade}&PBT=${this.results[2].part[0].score.grade},${this.results[2].part[1].score.grade},${this.results[2].part[2].score.grade},${this.results[2].part[3].score.grade}&EXTRA=${this.results[0].extra},${this.results[2].extra}`;
      try {
        const { data } = await getCommentary(payload);
        if (data.success) {
          this.commentaries = data.data;
          this.isLoaded = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async makeGuides() {
      try {
        let grade = '';
        if (this.results[0].extra === 'A') {
          grade = 'sensitive';
        } else if (this.results[0].extra === 'B') {
          grade = 'meek';
        } else if (this.results[0].extra === 'c') {
          grade = 'slow';
        } else {
          grade = 'normal';
        }
        const { data } = await getGuides(grade);
        if (data.success) {
          this.guides = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.makeCommentaries();
    this.makeGuides();
    this.fillData();
  },
  mounted() {},
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
    padding: 2rem 2rem 120px;
    border-radius: 2rem 2rem 0 0;
    hr {
      margin: 4rem 0;
      background-color: $black;
    }
    .date {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .image {
        width: 20px;
        margin-right: 8px;
      }
      span {
        text-align: right;
        font-weight: $font-w500;
        font-size: $font-sm;
      }
    }
    .part {
      h2 {
        font-size: $font-xl;
        font-weight: $font-w700;
        margin-bottom: 1rem;
      }
      p {
        margin-bottom: 2rem;
      }
      .strongs {
        display: flex;
        gap: 1rem;
        li {
          border: 1px solid $grey;
          border-radius: 10px;
          width: 50%;
          padding: 1rem;
          text-align: center;
          b {
            display: block;
            font-size: $font-sm;
            margin-bottom: 5px;
          }
          .element {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            span {
              margin-right: 10px;
              word-break: keep-all;
            }
          }
        }
      }
      .summary {
        margin-bottom: 2rem;
        dt {
          font-size: $font-md;
          font-weight: $font-w600;
          margin-bottom: 1rem;
        }
        dd {
          color: $grey;
        }
      }
      .information {
        background-color: $grey-light-xx;
        font-size: $font-sm;
        padding: 1rem;
        margin-bottom: 2rem;
        color: $grey;
        border-radius: 5px;
      }
      .extra {
        padding: 1.5rem;
        background-color: $grey-light-xx;
        border-radius: 10px;
        word-break: keep-all;
        h3 {
          font-size: $font-md;
          margin-bottom: 1rem;
          b {
            font-weight: $font-w600;
          }
        }
        p {
          margin-bottom: 0;
          color: $grey;
        }
      }
      .chart {
        margin: 3rem 0;
        div {
          height: 250px;
        }
      }
      .graph {
        margin: 3rem 0;
      }
      .part-item {
        border: 1px solid #eee;
        margin-bottom: 2rem;
        padding: 1.5rem;
        border-radius: 10px;
        hr {
          background-color: $grey-light-x;
          height: 1px;
          margin: 1rem 0;
        }
        h4 {
          font-size: $font-lg;
          font-weight: $font-w600;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: $font-sm;
          color: $grey;
        }
        .rating {
          text-align: center;
          margin-bottom: 1rem;
          margin-top: 2rem;
          .score {
            font-size: 3rem;
            font-weight: $font-w800;
            line-height: 1;
          }
          .grade {
            font-weight: $font-w800;
          }
        }
        .commentary {
          font-size: $font-md;
          text-align: center;
          font-weight: $font-w500;
        }
      }
    }

    .guide {
      padding: 1.5rem;
      background-color: $grey-light-xx;
      border-radius: 10px;
      h2 {
        font-size: $font-lg;
        font-weight: $font-w600;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>

<style lang="scss">
.guide {
  .content {
    p {
      line-height: 1.5;
      word-break: break-all;
      text-align: justify;
      margin-bottom: 1.5rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
