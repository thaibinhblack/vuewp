import {
  STATE,
  MUTATIONS,
  ACTIONS
} from '@/store/modules/global.d';

const state = {
  [STATE.isLoading]: false
};

const getters = {

};

const mutations = {
  [MUTATIONS.setIsLoading](st, payload) {
    st[STATE.isLoading] = payload;
  }
};

const actions = {
  [ACTIONS.setIsLoading]({ commit }, payload) {
    commit(MUTATIONS.setIsLoading, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
