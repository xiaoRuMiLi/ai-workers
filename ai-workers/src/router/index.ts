/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-02 17:12:46
 * @LastEditTime: 2024-04-02 17:31:26
 * @LastEditors: lyq
 */
import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { IModuleType } from "./types";

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


//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
// export const constantRouter: RouteRecordRaw[] = [LoginRoute, RootRoute, RedirectRoute];

const router = createRouter({
  history: createWebHistory(),
  // 所有路由都不需要验证权限，暂时这样处理
  routes: asyncRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;


