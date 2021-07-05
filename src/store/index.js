import VueStore from 'vuex';
import Vue from 'vue';
import global from '@/store/modules/global';

Vue.use(VueStore);

const modules = [
  global,
];

Object.keys(modules).forEach(module => {
  modules[module].namespaced = true;
});

const store = new VueStore.Store({ modules });

export default store;
