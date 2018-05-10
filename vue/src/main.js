// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Api from './api'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.prototype.$http = new Api();

// ここは、最後まで直すつもり
Vue.use(Element, { size: 'small' });
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
