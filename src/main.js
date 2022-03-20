import '@/assets/scss/main.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import VueMoment from 'vue-moment';
import * as filters from '@/utils/filters';
import moment from 'moment';

moment.locale('ko');

Vue.config.productionTip = false;
Vue.use(VueMoment, { moment });

Object.keys(filters).forEach(function (key) {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
