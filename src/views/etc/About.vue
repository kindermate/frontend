<template>
  <section class="about">
    <Lottie :options="options" :width="300" :height="300" class="lottie" />
    <h1 class="page-title">누적 이용자 60만 명!<br />네이버 '마음엔' 서비스 업그레이드 버전이 출시됐어요.</h1>
    <p>
      양육과 교육이 중요한 유아동 시기, 똑똑한 육아 방향을 제안해 줄 21종의 심리검사를 경험해 보세요.
      (공통검사 3종 4월 출시, 18종 5월 예정)
    </p>
    <hr />
    <h2>공통검사 3종</h2>
    <p>세 가지 공통검사를 진행하며 양육자와 아이의 성향에 대해 알아보세요.</p>
    <hr />
    <h2>심리케어 검사 18종(※ 5월 중 업데이트)</h2>
    <p>체크 리스트를 통해 양육자와 아이의 마음 상태를 파악해요.</p>
    <p>
      충동성, 위축, 유아 스트레스, 애착 안정성, 적응성, 사회성, 불안, 사회적 배척, 과잉행동, 자신감,
      스트레스반응, 스트레스 요인, 주의 집중력, 반항성, 자기효능감, 잠재 공격성, 공격성, 우울
    </p>
    <hr />
    <h2>킨더메이트의 자랑, "3단계 스마트 코칭"</h2>
    <ul>
      <li>
        <h3>1단계: 진단</h3>
        <p>총 21종의 심리검사를 통해 양육자와 아이의 성향, 마음 상태를 파악</p>
      </li>
      <li>
        <h3>2단계: 분석</h3>
        <p>기질, 적성, 양육 행동을 유형별로 정밀하게 분석&제공</p>
      </li>
      <li>
        <h3>3단계: 코칭</h3>
        <p>
          진단 결과에 따라 매주 다른 '위클리 미션' 발송, 미션을 수행하며 재미있게 정서적 유대를 쌓아보세요.
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import Lottie from 'vue-lottie';
import animationData from '@/assets/lottie/puzzle.json';

export default {
  data() {
    return {
      options: { animationData: animationData },
      images: ['@/assets/img/smile.svg'],
    };
  },
  components: {
    Lottie,
  },
};
</script>

<style lang="scss" scoped>
.about {
  font-size: 1.1rem;
  h1 {
    line-height: 1.4;
    margin-top: 1rem;
    font-size: 1.8rem;
    word-break: keep-all;
  }
  hr {
    margin: 3rem 0;
  }
  h2 {
    font-size: $font-lg;
    font-weight: $font-w600;
    margin-bottom: 0.5rem;
  }
  p {
    color: $grey;
  }
  ul {
    margin-top: 2rem;
    li {
      margin-bottom: 2rem;
      h3 {
        font-size: $font-md;
        font-weight: $font-w600;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
