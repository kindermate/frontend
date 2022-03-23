<template>
  <div class="score-bar">
    <div class="bar" :style="cssProps" :class="getGradeColor"></div>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
    grade: String,
  },
  computed: {
    cssProps() {
      return {
        '--label-width': this.score + '%',
      };
    },
    // 등급별 컬러
    getGradeColor() {
      if (this.grade === 'VH' || this.grade === 'H') {
        return 'is-high';
      } else if (this.grace === 'NL' || this.grade === 'N' || this.grade === 'NH') {
        return 'is-normal';
      } else {
        return 'is-low';
      }
    },
  },
  mounted() {
    console.log(this.grade);
  },
};
</script>

<style lang="scss" scoped>
.score-bar {
  background-color: $grey-light-x;
  width: 150px;
  height: 20px;
  margin: 0.5rem auto;
  border-radius: 20px;
  display: flex;
  border: 1px solid $grey-light-x;
  overflow: hidden;
  .bar {
    width: var(--label-width);
    border-radius: 20px;
    background-color: #fff;
    &.is-high {
      background-color: $green;
    }
    &.is-normal {
      background-color: $blue;
    }
    &.is-low {
      background-color: $orange;
    }
  }
}
</style>
