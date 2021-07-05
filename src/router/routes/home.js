import {
  home,
} from '@/router/routePaths';
import i18n from '@/i18n';

export default {
  path: home,
  name: 'home',
  component: () => import(/* webpackChunkName Home */ '@/views/Home'),
  meta: {
    title: i18n.t('home.title'),
  },
};
