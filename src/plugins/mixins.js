import { Layout } from '@/plugins/layout';
import {
  ACTIONS as ROOT_ACTIONS,
} from '@/store/modules/root.d';
import {
  GETTERS as ACCOUNT_GETTERS,
} from '@/store/modules/account.d';
import {
  mapGetters,
} from 'vuex';
import store from '@/store';

export const ResponsiveMixin = {
  data: () => ({
    isDesktop: Layout.isDesktop,
  }),

  methods: {
    $_onBreakpointChange() {
      this.isDesktop = Layout.isDesktop;
    },
  },

  mounted() {
    this.$bus.$on('breakpoint:change', this.$_onBreakpointChange);
  },

  destroyed() {
    this.$bus.$off('breakpoint:change', this.$_onBreakpointChange);
  },
};

export const GlobalLoading = {
  methods: {
    closeLoading() {
      store.dispatch(`root/${ROOT_ACTIONS.setIsLoading}`, false, { root: true });
    },
  },
};

export const CheckAccountMixins = {
  computed: {
    ...mapGetters('account', {
      isAuth: ACCOUNT_GETTERS.isAuth,
      isOwner: ACCOUNT_GETTERS.isOwner
    }),
  },
};
