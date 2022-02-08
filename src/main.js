import "@/assets/scss/main.scss";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

Vue.config.productionTip = false;

Vue.filter("toAge", (value) => {
  if (!value) return "No Data";
  let today = new Date();
  let birthday = new Date(value);
  let thisYear = today.getFullYear();
  let birthYear = birthday.getFullYear();
  let yearAge = thisYear - birthYear;
  let thisBirth = birthday.getFullYear(thisYear);
  if (today.getTime() > thisBirth) {
    yearAge--;
  }
  return `만 ${yearAge}세`;
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
