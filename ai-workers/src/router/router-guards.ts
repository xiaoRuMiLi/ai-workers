import type { RouteRecordRaw } from 'vue-router';
import { isNavigationFailure, Router } from 'vue-router';
import { useUserStoreInstance } from '@/store/modules/user';
import { useAsyncRouteStoreInstance } from '@/store/modules/asyncRoute';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { localCache } from '@/utils/Storage';
import { PageEnum } from '@/enums/pageEnum';
import { ErrorPageRoute } from '@/router/base';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
// LOGIN_PATH = "/login"对应路由path属性, 
// 定义不需要重定向的白名单路由
const whitePathList = [LOGIN_PATH]; // no redirect whitelist

export function createRouterGuards(router: Router) {
  const userStore = useUserStoreInstance();
  const asyncRouteStore = useAsyncRouteStoreInstance();

  router.beforeEach(async (to, from, next) => {

    console.log("beforeEach__to", to, "beforeEach__from", from);
    const Loading = window['$loading'] || null;
    Loading && Loading.start();
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      console.log("base home 去到首页");
      next(PageEnum.BASE_HOME);
      return;
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      console.log("属于白名单不需要重定向");
      next();
      return;
    }
    const token = localCache.get(ACCESS_TOKEN);
    console.log(`token is ${token}`);
    // 如果token不存在
    //if (!token) {
    // 我这里暂时不判断登录，因为这个不是每个页面都需要登录的
    if (false) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      // ignoreAuth 忽略身份验证。 如果to路由为忽略身份验证的。
      if (to.meta.ignoreAuth) {
        console.log("没有token,但是 to.meta.ignoreAuth 为true 该路由不需要登录");
        next();
        return;
      }
      // redirect login page
      // 否则重定向到登陆页
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        // 这个应该是把to的path加载到重定向目录(login) 的query中，登录成功后再重新定向到to.path
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path, // 登陆后会重定向到redirect值。重定向到to.path
        };
      }
      console.log("没有token,该路由需要登录验证重定向到login");
      next(redirectData);
      return;
    }

    // 如果store/asyncRoute.ts动态添加路由为真则直接next
    if (asyncRouteStore.getIsDynamicAddedRoute) {
      next();
      return;
    }
    
    const userInfo = await userStore.getInfo();
    // 根据userInfo 生成路由
    // routes 用户具有权限的路由数组，路由中meta.permissios 和用户 permissions 有相同的数组元素的路由
    const routes = await asyncRouteStore.generateRoutes(userInfo);

    // routers 是route/modules/**包里面的路由文件
    console.log("routes__", routes);
    // 和上面一样的值console.log("asyncRouteStore:",asyncRouteStore.getRouters());

    // 动态添加可访问路由表，就是添加modules里面所有的路由添加进去。
    routes.forEach((item) => {
      router.addRoute(item as unknown as RouteRecordRaw);
    });

    //判断是否有404路由，如果不存在则添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
    }

    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    // 这里将store/asyncRoute.isDynamicAddedRoute 置为真， 表示已经动态添加过路由了，下次直接在上面判断跳过添加步骤。
    asyncRouteStore.setDynamicAddedRoute(true);
    next(nextData);
    Loading && Loading.finish();
  });

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title;
    if (isNavigationFailure(failure)) {
      //console.log('failed navigation', failure)
    }
    const asyncRouteStore = useAsyncRouteStoreInstance();
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents;
    const currentComName: any = to.matched.find((item) => item.name == to.name)?.name;
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName);
      if (index != -1) {
        keepAliveComponents.splice(index, 1);
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
    const Loading = window['$loading'] || null;
    Loading && Loading.finish();
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
