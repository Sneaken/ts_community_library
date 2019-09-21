import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/store';

import 'normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/utils/request';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
