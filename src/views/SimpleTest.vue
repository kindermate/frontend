<template>
  <section class="simple-test">
    <ul class="test-list">
      <li
        @click="$router.push({ name: 'Psy Check Cover', params: { id: test._id } })"
        v-for="test in tests"
        :key="test._id"
      >
        <img :src="require(`@/assets/img/psycheck_thumbnail_${test.code}.jpg`)" :alt="test.title" />
        <div class="text">
          <div class="label">{{ test.title }}</div>
          <div class="desc">{{ test.subTitle }}</div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { getSimpleTestAll } from '@/api';

export default {
  data() {
    return {
      tests: [],
      showModal: false,
    };
  },
  methods: {
    async fetchList() {
      try {
        const { data } = await getSimpleTestAll();
        if (data.success === true) {
          this.tests = data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchList();
    this.$store.commit('RESET_MEMBER');
  },
};
</script>

<style lang="scss" scoped>
.simple-test {
  position: relative;
  margin-bottom: 4rem;
  .test-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    li {
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      cursor: pointer;
      box-shadow: 10px 13px 13px rgba($color: #000000, $alpha: 0.02);
      img {
        display: block;
      }
      .text {
        padding: 1rem;
        .label {
          line-height: 1;
        }
        .desc {
          color: $grey;
          font-size: $font-xs;
          line-height: 1.4;
        }
      }
    }
  }
}
</style>
