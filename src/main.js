import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './assets/css/reset.css';
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole');
  // eslint-disable-next-line no-unused-vars
  const vConsole = new VConsole();
}
Vue.directive('wechat-title', {
  inserted (el, bind) {
    document.title = bind.value;
  }
});
// 错误监控
// Vue.config.errorHandler = (err, vm, info) => {
//   console.log(err, vm, info);
// };
// 阻止生产提示
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
