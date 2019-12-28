import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import 'normalize.css';
import './element-ui';
import axios from '@/utils/request';

Vue.config.productionTip = false;

// import { AxiosInstance } from 'axios';
//
// declare module 'vue/types/vue' {
//   interface Vue {
//     $axios: AxiosInstance;
//   }
// }

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
