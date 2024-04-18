/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-02 17:12:46
 * @LastEditTime: 2024-04-18 15:59:30
 * @LastEditors: lyq
 */
import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { IModuleType } from "./types";
import { createRouterGuards } from './router-guards';
import { RedirectRoute, RootRoute, LoginRoute, RegisterRoute, PrivacyStatement, ServiceStatement } from '@/router/base';

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });
const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list, key) => {
  const mod = modules[key].default ?? {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  return [...list, ...modList];
}, []);

function sortRoute(a, b) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
}

routeModuleList.sort(sortRoute);
// console.log("route list", routeModuleList);

//需要验证权限
export const asyncRoutes = [...routeModuleList];


//普通路由 也就是单页应用固定组件. 无需验证权限 RedirectRoute 加载的是layou/index.vue. 
export const constantRouter: any[] = [LoginRoute, RootRoute, RedirectRoute, RegisterRoute, PrivacyStatement, ServiceStatement];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log("to.matched[0].components", to); // 注意这里的属性是 components 而不是 component
  next();
});

export default router;


