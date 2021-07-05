import VueRouter from 'vue-router';
import Vue from 'vue';
import home from '@/router/routes/home';

Vue.use(VueRouter);

const routes = [
  home,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: '--acitve',
  linkExactActiveClass: '--exact-active',
  routes,
});

export default router;
