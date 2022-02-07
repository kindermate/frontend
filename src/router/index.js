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
    component: () => import(/* webpackChunkName: "about" */ "@/views/Home.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
