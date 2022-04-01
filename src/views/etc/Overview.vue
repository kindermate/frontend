<template>
  <section class="overview">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <img src="@/assets/img/theo-meditate.svg" />
        <h2>아이와 함께 검사하기</h2>
        <p>“어떻게 생각해?”<br />서로 이야기를 나누며 검사하세요.</p>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/theo-big-phone.svg" />
        <h2>결과 확인하기</h2>
        <p>
          3개월 주기로 같은 검사를 진행하되<br />
          변화된 수치를 확인하고 비교해보세요.
        </p>
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/theo-roar.svg" />
        <h2>위클리 미션하기</h2>
        <p>
          검사 결과에 따라 매주 제공되는<br />
          우리 아이 맞춤 미션을 진행하세요.
        </p>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <a @click="goNext" class="big-button">
      <span>회원가입하고 시작하기</span>
    </a>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    goNext() {
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  .swiper {
    text-align: center;
    padding-bottom: 3rem;
    img {
      display: block;
      width: 60%;
      margin: 0 auto;
    }
    h2 {
      font-size: 2.2rem;
      line-height: 1.2;
      word-break: keep-all;
      font-weight: $font-w600;
      margin-bottom: 1rem;
    }
    p {
      font-size: $font-md;
      color: $grey;
    }

    .swiper-pagination {
      margin-top: 2rem;
    }
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
