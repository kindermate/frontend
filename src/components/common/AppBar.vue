<template>
  <header>
    <nav>
      <a @click="$router.back()" class="left">
        <img src="@/assets/img/left-arrow.svg" alt="left" />
      </a>
      <router-link to="/sidebar" class="right">
        <img src="@/assets/img/menu.svg" alt="menu" />
      </router-link>
    </nav>
    <div class="page-title">{{ pageTitle }}</div>
  </header>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      return this.$route.meta.pageTitle;
    },
  },
  methods: {
    handleScroll() {
      const position = window.scrollY;
      const header = document.querySelector('header');
      if (position > 10) {
        header.classList.add('is-white');
      } else {
        header.classList.remove('is-white');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  background-color: inherit;
  transition: all 0.3s ease;
  z-index: 10;
  &.is-white {
    background-color: #fff;
    box-shadow: 0 5px 5px rgba($color: #000000, $alpha: 0.03);
  }
  nav {
    position: absolute;
    width: 100%;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    a {
      display: flex;
      width: 60px;
      height: 60px;
      justify-content: center;
      padding: 15px;
      // align-items: center;
      cursor: pointer;
      z-index: 2;

      img {
        display: block;
        // width: 30px;
        // height: 30px;
        pointer-events: none;
      }
    }
  }

  .page-title {
    font-weight: $font-w600;
    line-height: 60px;
    text-align: center;
  }
}
</style>
