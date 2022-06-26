<template>
  <section class="agreement">
    <h1 class="page-title">{{ $t('agreement.greeting') }}</h1>
    <p>{{ $t('agreement.description') }}</p>
    <hr />
    <a @click="agreementAll" class="button is-fullwidth is-primary is-outlined">{{
      $t('agreement.buttonMessage')
    }}</a>
    <!-- checkbox -->
    <FullwidthCheckbox
      :label="$t('agreement.agreement1')"
      v-model="isCheck1"
      @view-more="viewPost('usage')"
    />
    <FullwidthCheckbox
      :label="$t('agreement.agreement2')"
      v-model="isCheck2"
      @view-more="viewPost('privacy')"
    />
    <FullwidthCheckbox
      :label="$t('agreement.agreement3')"
      v-model="isCheck3"
      @view-more="viewPost('marketing')"
    />
    <FullwidthCheckbox
      :label="$t('agreement.agreement4')"
      v-model="isCheck4"
      @view-more="viewPost('marketingUse')"
    />
    <FullwidthCheckbox
      :label="$t('agreement.agreement5')"
      v-model="isCheck5"
      @view-more="viewPost('promotion')"
    />
    <!-- modal -->
    <ModalBlank v-if="showModal" @close="closeModal">
      <template>
        <h2>{{ modalTitle }}</h2>
        <div class="modal-body" v-html="modalContent"></div>
      </template>
    </ModalBlank>
    <!-- big button -->
    <a @click="goNext" class="big-button">
      <span>다음</span>
    </a>
  </section>
</template>

<script>
import { getPage } from '@/api';
import FullwidthCheckbox from '@/components/common/FullwidthCheckbox.vue';
import ModalBlank from '@/components/common/ModalBlank.vue';

export default {
  data() {
    return {
      isCheck1: false,
      isCheck2: false,
      isCheck3: false,
      isCheck4: false,
      isCheck5: false,
      modalTitle: '',
      modalContent: '',
      showModal: false,
    };
  },
  components: {
    FullwidthCheckbox,
    ModalBlank,
  },
  methods: {
    agreementAll() {
      this.isCheck1 = true;
      this.isCheck2 = true;
      this.isCheck3 = true;
      this.isCheck4 = true;
      this.isCheck5 = true;
    },
    async viewPost(name) {
      this.showModal = true;
      let pageId = '';
      try {
        if (name === 'usage') {
          pageId = '62b3704ffc04de4052b642e4';
        } else if (name === 'privacy') {
          pageId = '62b37019fc04de4052b642c9';
        } else if (name === 'marketing') {
          pageId = '62b3702afc04de4052b642d2';
        } else if (name === 'marketingUse') {
          pageId = '62b3705ffc04de4052b642ed';
        } else if (name === 'promotion') {
          pageId = '62b3703cfc04de4052b642db';
        }
        const { data } = await getPage(pageId);
        if (data.success) {
          this.modalTitle = data.data.title;
          this.modalContent = data.data.content;
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeModal() {
      this.showModal = false;
    },
    goNext() {
      // 필수 약관 동의 체크
      if (this.isCheck1 === true && this.isCheck2 === true) {
        this.$router.push('/join');
      } else {
        alert('필수 약관에 동의해주세요');
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.agreement {
  p {
    color: $grey;
  }
  .modal {
    h2 {
      font-size: $font-md;
      font-weight: $font-w600;
      margin-bottom: 1.5rem;
    }
    .modal-body {
      font-size: $font-sm;
    }
  }
}
</style>
