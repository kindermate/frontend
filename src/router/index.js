import Vue from "vue";
import VueRouter from "vue-router";
import i18n from "@/i18n";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      pageTitle: i18n.t("home.pageTitle"),
    },
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/test",
    name: "Test",
    meta: {
      pageTitle: i18n.t("test.pageTitle"),
    },
    component: () => import(/* webpackChunkName: "test" */ "@/views/Test.vue"),
  },
  {
    path: "/mission",
    name: "Mission",
    meta: {
      pageTitle: i18n.t("mission.pageTitle"),
    },
    component: () =>
      import(/* webpackChunkName: "mission" */ "@/views/Mission.vue"),
  },
  {
    path: "/result",
    name: "Result",
    meta: {
      pageTitle: i18n.t("result.pageTitle"),
    },
    component: () =>
      import(/* webpackChunkName: "result" */ "@/views/Result.vue"),
  },
  {
    path: "/psycheck",
    name: "Psy Check",
    meta: {
      pageTitle: i18n.t("psycheck.pageTitle"),
    },
    component: () =>
      import(/* webpackChunkName: "psycheck" */ "@/views/PsyCheck.vue"),
  },
  {
    path: "*",
    name: "Page Not Found",
    meta: {
      pageTitle: i18n.t("404.pageTitle"),
    },
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
