import router from '@/router';
import store from '@/store';
import {
  ACTIONS as ROOT_ACTIONS,
} from '@/store/modules/root.d';
import {
  GETTERS as GETTERS_ACCOUNT,
} from '@/store/modules/account.d';
import {
  login,
} from '@/router/paths';

// Define page name
router.afterEach((to) => {
  document.documentElement.dataset.page = `${to.name}-page`;
});

// Define page title
router.afterEach(({ meta }) => {
  console.log(meta);
  if (meta.title) {
    document.title = meta.title;
  }
});

// Scroll to top after switch route
router.afterEach((to, from) => {
  if (to.path !== from.path) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }
});

// Show page loading
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    store.dispatch(`global/${ROOT_ACTIONS.setIsLoading}`, true);
  }

  next();
});

// Valid authentication pages

export default null;
