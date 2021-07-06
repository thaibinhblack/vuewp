import {
  login
} from '@/router/routePaths';

import i18n from '@/i18n';

export default {
  path: login,
  name: 'home',
  component: () => import(/* webpackChunkName Login */ '@/views/Login'),
  meta: {
    title: i18n.t('login.title'),
  },
};
