<template>
  <section class="result">
    <h2 class="home-title">최근 검사결과</h2>
    <div v-for="(member, index) in members" :key="index" class="box">
      <div class="info">
        <div class="child">
          <ProfileBlock
            :member="{ name: member.name, birth: member.birth, gender: member.gender, avatar: member.avatar }"
          />
        </div>
        <div class="status">
          <CircleIcon>
            <img src="@/assets/img/time.svg" />
          </CircleIcon>
          <span>{{ member.results[0].createdAt | moment('from', 'now') }}</span>
        </div>
      </div>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(result, index) in member.results[0].results" :key="index">
          <div class="chart">
            <BarChart :chart-data="fillData(result)" :options="options" />
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="buttons mt-5">
      <router-link to="/result" class="button is-fullwidth is-success">결과 전체 보기</router-link>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import ProfileBlock from '@/components/user/ProfileBlock.vue';
import CircleIcon from '@/components/common/CircleIcon.vue';
import BarChart from '@/components/result/BarChart.vue';

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                // suggestedMax: 100,
                // min: 0,
              },
              gridLines: {
                color: 'rgba(0,0,0,0.05)',
              },
              // min: 0,
              // max: 90,
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
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
  props: {
    members: Array,
  },
  components: {
    ProfileBlock,
    CircleIcon,
    BarChart,
    Swiper,
    SwiperSlide,
  },
  methods: {
    fillData(data) {
      return {
        labels: this.$t(`result.${data.test.toLowerCase()}.partsNames`),
        datasets: [
          {
            label: data.test,
            backgroundColor: [
              '#85C7D499',
              '#89B99999',
              '#E87E6899',
              '#FDEF5F99',
              '#A2ACD999',
              '#DB93B499',
              '#C6A29799',
              '#9AC38499',
            ],
            borderColor: [
              '#85C7D499',
              '#89B99999',
              '#E87E6899',
              '#FDEF5F99',
              '#A2ACD999',
              '#DB93B499',
              '#C6A29799',
              '#9AC38499',
            ],
            data: [
              ...data.part.map(part => {
                return part.score.TW;
              }),
            ],
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.result {
  margin-bottom: 4rem;
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.3rem;
    .status {
      display: flex;
      align-items: center;
      font-size: $font-sm;
      font-weight: $font-w600;
    }
  }
  .chart {
    div {
      height: 170px;
    }
    padding-bottom: 2rem;
  }
  .swiper-pagination {
    bottom: 0;
  }
}
</style>

<style lang="scss">
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: $grey;
}
.swiper-pagination-bullet-active {
  background-color: $orange;
}
</style>
