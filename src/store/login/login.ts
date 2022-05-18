import { Module } from 'vuex';

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login';
import localCache from '@/utils/cache';
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus';
import router from '@/router';

import { IAccount, IPhone } from '@/service/login/type';
import { ILoginState } from './types';
import { IRootState } from '../types';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus);

      routes.forEach((route) => {
        router.addRoute('main', route);
      });
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount | IPhone) {
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit('changeToken', token);
      localCache.setCache('token', token);

      // 发送初始化的请求
      dispatch('getInitialDataAction', null, { root: true });

      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      router.push('/main');
    },
    loadLocalLogin({ commit }) {
      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
