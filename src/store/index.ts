import { createStore, Store, useStore as useVuexStore } from 'vuex';

import login from './login/login';

import { IRootState, IStoreType } from './types';

const store = createStore<IRootState>({
  state() {
    return {
      name: 'admin',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    };
  },
  mutations: {
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    }
  },
  getters: {},
  actions: {
    // async getInitialDataAction({ commit }) {
    //   //todo
    // }
  },
  modules: {
    login
  }
});

export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
