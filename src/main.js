import Vue from 'vue';
import App from '@/App';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import router from '@/router';
import '@/router/gurads';
import i18n from '@/i18n';
import store from '@/store';
import BusPlugin from '@/plugins/bus';
import DirectivePlugin from '@/plugins/directives';
import LayoutPlugin from '@/plugins/layout';
import '@/assets/scss/main.scss';
import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';

Vue.use(VueApollo);
Vue.use(BusPlugin);
Vue.use(DirectivePlugin);
Vue.use(LayoutPlugin);

const urlApolloClient = process.env.VUE_APP_URI_GRAPHQL;
const apolloClient = new ApolloClient({ uri: urlApolloClient });
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.config.productionTip = false;

new Vue({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: h => h(App),
  apolloProvider,
  router,
  i18n,
  store,
}).$mount('#app');
