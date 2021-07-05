import Vue from 'vue';
import App from '@/App';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import router from '@/router';
import i18n from '@/i18n';
import store from '@/store';

Vue.use(VueApollo);

const urlApolloClient = process.env.VUE_APP_URI_GRAPHQL;
const apolloClient = new ApolloClient({ uri: urlApolloClient });
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  apolloProvider,
  router,
  i18n,
  store,
}).$mount('#app');
