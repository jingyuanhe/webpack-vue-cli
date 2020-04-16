import Vue from 'vue';
import Router from 'vue-router';
import { demoRouterMap } from './routerConfig';
Vue.use(Router);
const router = new Router({
  mode: 'hash',
  routes: demoRouterMap
});
export default router;
