import Vue from 'vue';
import Router from 'vue-router';
import { demoRouterMap } from './routerConfig';
const base = process.env.BASE_URL;
console.log(process.env);
Vue.use(Router);
const router = new Router({
  mode: 'hash',
  base,
  routes: demoRouterMap
});
export default router;
