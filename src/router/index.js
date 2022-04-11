import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/i18n';
import $store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      auth: true,
      pageTitle: i18n.t('home.pageTitle'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/overview',
    name: 'Overview',
    meta: {
      pageTitle: i18n.t('overview.pageTitle'),
      isLeftMenu: false,
      isRightMenu: false,
    },
    component: () => import(/* webpackChunkName: "overview" */ '@/views/etc/Overview.vue'),
  },
  {
    path: '/agreement',
    name: 'Agreement',
    meta: {
      pageTitle: i18n.t('agreement.pageTitle'),
      isBottomNav: false,
    },
    component: () => import(/* webpackChunkName: "agreement" */ '@/views/join/Agreement.vue'),
  },
  {
    path: '/join',
    name: 'Join',
    meta: {
      pageTitle: i18n.t('join.pageTitle'),
      isBottomNav: false,
    },
    component: () => import(/* webpackChunkName: "join" */ '@/views/join/Join.vue'),
  },
  {
    path: '/join/complete',
    name: 'Join Complete',
    meta: {
      pageTitle: i18n.t('joinComplete.pageTitle'),
      isBottomNav: false,
    },
    component: () => import(/* webpackChunkName: "joinComplete" */ '@/views/join/JoinComplete.vue'),
  },
  {
    path: '/update-user-info',
    name: 'Update User Info',
    meta: {
      auth: true,
      pageTitle: i18n.t('join.pageTitle'),
      isBottomNav: false,
    },
    component: () => import(/* webpackChunkName: "updateUserInfo" */ '@/views/user/UpdateUserInfo.vue'),
  },
  {
    path: '/change-password',
    name: 'Change Password',
    meta: {
      auth: true,
      pageTitle: i18n.t('changePassword.pageTitle'),
      isBottomNav: false,
    },
    component: () => import(/* webpackChunkName: "updateUserInfo" */ '@/views/user/ChangePassword.vue'),
  },
  {
    path: '/find-account',
    name: 'Find Account',
    meta: {
      pageTitle: i18n.t('findAccount.pageTitle'),
      isBottomNav: false,
    },
    component: () => import(/* webpackChunkName: "findAccount" */ '@/views/user/FindAccount.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      pageTitle: i18n.t('login.pageTitle'),
      isBottomNav: false,
      isLeftMenu: false,
      isRightMenu: false,
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    meta: {
      auth: true,
      pageTitle: i18n.t('test.pageTitle'),
      isBottomNav: true,
      bgColor: '#fff',
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/test/About.vue'),
  },
  {
    path: '/test/select',
    name: 'Select Member',
    meta: {
      auth: true,
      pageTitle: i18n.t('test.selectMember.pageTitle'),
      isBottomNav: true,
      bgColor: '#fff',
    },
    component: () => import(/* webpackChunkName: "selectMember" */ '@/views/test/SelectMember.vue'),
  },
  {
    path: '/test/cover',
    name: 'Test Cover',
    meta: {
      auth: true,
      pageTitle: i18n.t('test.cover.pageTitle'),
      isBottomNav: false,
      bgColor: '#fff',
    },
    component: () => import(/* webpackChunkName: "cover" */ '@/views/test/Cover.vue'),
  },
  {
    path: '/test/question',
    name: 'Test Question',
    meta: {
      auth: true,
      pageTitle: i18n.t('test.question.pageTitle'),
      isBottomNav: false,
    },
    component: () => import(/* webpackChunkName: "question" */ '@/views/test/Question.vue'),
  },
  {
    path: '/test/complete',
    name: 'Test Complete',
    meta: {
      auth: true,
      pageTitle: i18n.t('test.complete.pageTitle'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "testComplete" */ '@/views/test/Complete.vue'),
  },
  {
    path: '/mission',
    name: 'Mission',
    meta: {
      auth: true,
      pageTitle: i18n.t('mission.pageTitle'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "mission" */ '@/views/mission/Mission.vue'),
  },
  {
    path: '/mission/detail',
    name: 'Mission Detail',
    meta: {
      auth: true,
      pageTitle: i18n.t('mission.pageTitle'),
      isBottomNav: true,
      bgColor: '#6FC9D6',
    },
    component: () => import(/* webpackChunkName: "missionDetail" */ '@/views/mission/MissionDetail.vue'),
  },
  {
    path: '/mission/next',
    name: 'Mission Next',
    meta: {
      auth: true,
      pageTitle: i18n.t('mission.pageTitle'),
      isBottomNav: true,
      bgColor: '#6FC9D6',
    },
    component: () => import(/* webpackChunkName: "missionNext" */ '@/views/mission/MissionNext.vue'),
  },
  {
    path: '/result',
    name: 'Result',
    meta: {
      auth: true,
      pageTitle: i18n.t('result.pageTitle'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "result" */ '@/views/Result.vue'),
  },
  {
    path: '/result/detail',
    name: 'Result Detail',
    meta: {
      auth: true,
      pageTitle: i18n.t('result.pageTitle'),
      bgColor: '#F87761',
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "resultDetail" */ '@/views/result/ResultDetail.vue'),
  },
  {
    path: '/psycheck',
    name: 'Psy Check',
    meta: {
      auth: true,
      pageTitle: i18n.t('psycheck.pageTitle'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "psycheck" */ '@/views/PsyCheck.vue'),
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    meta: {
      auth: true,
      pageTitle: i18n.t('sidebar.pageTitle'),
      bgColor: '#fff',
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "sidebar" */ '@/views/Sidebar.vue'),
  },
  {
    path: '/notice',
    name: 'Notice List',
    meta: {
      auth: true,
      pageTitle: i18n.t('notice.pageTitle'),
      bgColor: '#fff',
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "noticeList" */ '@/views/post/NoticeList.vue'),
  },
  {
    path: '/notice/:id',
    name: 'Notice Detail',
    meta: {
      auth: true,
      pageTitle: i18n.t('notice.pageTitle'),
      bgColor: '#fff',
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "noticeDetail" */ '@/views/post/NoticeDetail.vue'),
  },
  {
    path: '/manage-members',
    name: 'Manage Members',
    meta: {
      auth: true,
      pageTitle: i18n.t('extraMenu.member'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "manageMembers" */ '@/views/etc/ManageMembers.vue'),
  },
  {
    path: '/user-info',
    name: 'User Info',
    meta: {
      auth: true,
      pageTitle: i18n.t('extraMenu.userInfo'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "userInfo" */ '@/views/user/UserInfo.vue'),
  },
  {
    path: '/check-password',
    name: 'Check Password',
    meta: {
      auth: true,
      pageTitle: i18n.t('extraMenu.checkPassword'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "checkPassword" */ '@/views/etc/CheckPassword.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      pageTitle: i18n.t('extraMenu.about'),
      bgColor: '#fff',
      isBottomNav: false,
      isLeftMenu: false,
      isRightMenu: false,
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/etc/About.vue'),
  },
  {
    path: '/usage',
    name: 'Usage',
    meta: {
      pageTitle: i18n.t('extraMenu.usage'),
      bgColor: '#fff',
      isBottomNav: false,
      isRightMenu: false,
    },
    component: () => import(/* webpackChunkName: "usage" */ '@/views/etc/Usage.vue'),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    meta: {
      pageTitle: i18n.t('extraMenu.privacy'),
      bgColor: '#fff',
      isBottomNav: false,
      isRightMenu: false,
    },
    component: () => import(/* webpackChunkName: "privacy" */ '@/views/etc/Privacy.vue'),
  },
  {
    path: '*',
    name: 'Page Not Found',
    meta: {
      pageTitle: i18n.t('404.pageTitle'),
      isBottomNav: true,
    },
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  return { x: 0, y: 0 };
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'is-active',
  routes,
  scrollBehavior,
});

router.beforeEach((to, from, next) => {
  // 권한이 필요한 페이지
  if (to.meta.auth) {
    if (!$store.state.accessToken) {
      next('/login');
    }
  }
  // bottom navigation 출력 여부
  if (to.meta.isBottomNav === false) {
    $store.commit('SET_BOTTOM_NAV', false);
  } else {
    $store.commit('SET_BOTTOM_NAV', true);
  }
  // 처음 접근 시
  if ($store.state.isFirstVisit) {
    $store.commit('SET_VISIT', false);
    next('/overview');
  }
  next();
});

export default router;
