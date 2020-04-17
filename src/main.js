import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// 移动端调试
import VConsole from 'vconsole';
// eslint-disable-next-line no-unused-vars
const vConsole = new VConsole();
Vue.directive('wechat-title', {
  inserted (el, bind) {
    document.title = bind.value;
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
