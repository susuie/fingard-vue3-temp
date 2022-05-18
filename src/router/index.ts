import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import localCache from '@/utils/cache';
import { firstMenu } from '@/utils/map-menus';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
];
const allRoutes: RouteRecordRaw[] = [];
const routeFiles = require.context('@/views/main', true, /\.vue/);
const routeFilter = routeFiles.keys().filter((r) => {
  return r !== './main.vue';
});
routeFilter.forEach((key) => {
  const component = require('@/views/main' + key.substring(1));
  const name = key.split('/');
  const route: RouteRecordRaw = {
    path: key.split('.')[1],
    name: component.default.name ?? name[name.length - 1].split('.')[0],
    component: component.default
  };
  if (route.name === firstMenu.name) {
    route.alias = '';
  }
  allRoutes.push(route);
});
routes[2].children = allRoutes;
document.title = '赤狸管理后台';
const router = createRouter({
  routes,
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH)
});

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (!token) {
      return '/login';
    }
  }
});

export default router;
