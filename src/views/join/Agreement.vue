<template>
  <section class="agreement">
    <h1 class="page-title">{{ $t('agreement.greeting') }}</h1>
    <p>{{ $t('agreement.description') }}</p>
    <hr />
    <a @click="agreementAll" class="button is-fullwidth is-primary is-outlined">{{
      $t('agreement.buttonMessage')
    }}</a>
    <FullwidthCheckbox label="이용약관 동의" v-model="isCheck1" @view-more="viewMore('usage')" />
    <FullwidthCheckbox label="개인정보 수집/이용 동의" v-model="isCheck2" @view-more="viewMore('private')" />
  </section>
</template>

<script>
import bus from '@/utils/bus';
import FullwidthCheckbox from '@/components/common/FullwidthCheckbox.vue';

export default {
  data() {
    return {
      isCheck1: false,
      isCheck2: false,
    };
  },
  components: {
    FullwidthCheckbox,
  },
  methods: {
    agreementAll() {
      this.isCheck1 = true;
      this.isCheck2 = true;
    },
    // todo: 문서 모달 열기
    viewMore(name) {
      alert(name);
    },
  },
  created() {
    bus.$on('goNext', link => {
      if (this.isCheck1 === true && this.isCheck2 === true) {
        this.$router.push(link);
      } else {
        alert('모든 약관에 동의해주세요');
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.agreement {
  p {
    color: $grey;
  }
}
</style>
