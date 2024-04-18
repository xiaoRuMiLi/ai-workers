/*
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-02 22:44:18
 */
import type { AppRouteRecordRaw } from '@/router/types';
import type { RouteRecordRaw  } from "vue-router";
import { PageEnum } from '@/enums/pageEnum';
// layout 组件是整个单页应用中固定不动的组件部分，包括左侧菜单等组件， 对应的包为"@layout"
import { ErrorPage, RedirectName, Layout } from '@/router/constant';

// 404 on a page
export const ErrorPageRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
};

export const RedirectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  name: RedirectName,
  component: Layout,
  meta: {
    title: RedirectName,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true,
      },
    },
  ],
};

// PageEnum.BASE_HOME = /dashboard' 也就是会被重定向到首页
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

export const RegisterRoute: RouteRecordRaw = {
  path: '/register',
  name: 'Register',
  component: () => import('@/views/register/index.vue'),
  meta: {
    title: '注册',
    keepAlive: true,
  },
}

export const PrivacyStatement: RouteRecordRaw = {
  path: '/privacy',
  name: 'Privacy',
  component: () => import('@/views/statement/PrivacyStatement.vue'),
  meta: {
    title: '隐私声明',
  },
}

export const ServiceStatement: RouteRecordRaw = {
  path: '/service',
  name: 'Service',
  component: () => import('@/views/statement/ServiceStatement.vue'),
  meta: {
    title: '服务条款',
  },
}
