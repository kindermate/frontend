<template>
  <section class="sidebar">
    <nav class="main">
      <router-link to="/test">
        <div class="image">
          <img src="@/assets/img/puzzle.svg" />
        </div>
        <span>{{ $t('menu.test') }}</span>
      </router-link>
      <router-link to="/mission">
        <div class="image">
          <img src="@/assets/img/check.svg" />
        </div>
        <span>{{ $t('menu.mission') }}</span>
      </router-link>
      <router-link to="/result">
        <div class="image">
          <img src="@/assets/img/graph.svg" />
        </div>
        <span>{{ $t('menu.result') }}</span>
      </router-link>
      <router-link to="/psycheck">
        <div class="image">
          <img src="@/assets/img/face.svg" />
        </div>
        <span>{{ $t('menu.psycheck') }}</span>
      </router-link>
    </nav>
    <nav class="extra">
      <router-link to="/user-info">
        <span>{{ $t('extraMenu.userInfo') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </router-link>
      <router-link to="/manage-members">
        <span>{{ $t('extraMenu.member') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </router-link>
      <router-link to="/notice">
        <span>{{ $t('extraMenu.notice') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </router-link>
      <router-link to="/">
        <span>{{ $t('extraMenu.promotion') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </router-link>
      <!-- <router-link to="/">
        <span>{{ $t('extraMenu.contact') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </router-link>
      <router-link to="/">
        <span>{{ $t('extraMenu.faq') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </router-link> -->
      <router-link to="/usage">
        <span>{{ $t('extraMenu.usage') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </router-link>
      <router-link to="/privacy">
        <span>{{ $t('extraMenu.privacy') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </router-link>
      <a @click="$store.commit('LOGOUT')">
        <span>{{ $t('extraMenu.logout') }}</span>
        <img src="@/assets/img/icon_more.svg" />
      </a>
    </nav>
    <div class="info">
      <span>© Time Education C&P</span>
      <span>{{ version }}</span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding-bottom: 6rem;
  .main {
    display: flex;
    justify-content: space-evenly;
    padding: 2rem 0;
    a {
      &:nth-child(1) .image {
        background-color: $yellow;
      }
      &:nth-child(2) .image {
        background-color: $orange;
      }
      &:nth-child(3) .image {
        background-color: $green;
      }
      &:nth-child(4) .image {
        background-color: $blue;
      }
      .image {
        background-color: #eee;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        img {
          width: 25px;
        }
      }
      span {
        margin-top: 0.5rem;
        display: block;
        color: $black;
        font-weight: $font-w600;
        text-align: center;
      }
    }
  }
  .extra {
    display: flex;
    flex-direction: column;
    border-top: 1px solid $grey-light-x;
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $black;
      border-bottom: 1px solid $grey-light-x;
      padding: 1rem 2rem;
      font-weight: $font-w500;
      img {
        width: 20px;
        opacity: 0.3;
      }
    }
  }
  .info {
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    font-size: $font-xs;
    color: $grey;
  }
}
</style>
