import VueRouter from 'vue-router';
import Vue from 'vue';
import home from '@/router/routes/home';
import login from '@/router/routes/login';

Vue.use(VueRouter);

const routes = [
  home,
  login,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: '--acitve',
  linkExactActiveClass: '--exact-active',
  routes,
});

export default router;
