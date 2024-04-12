/*
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-06 22:57:47
 */

import { Layout } from "@/router/constant";
import { RouteRecordRaw } from "vue-router";
// 图标库 参考 https://www.antdv.com/components/icon-cn
import { DashboardOutlined } from '@vicons/antd';
import { renderIcon } from "@/utils/index";
const routeName = "dashboard";
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard/welcome',
    component: Layout,
    meta: {
        title: 'Dashboard',
        icon: renderIcon(DashboardOutlined),
        // userInfo必须要有以下权限中的一种才会被添加到路由中
        permissions: ['visitor'],
        // ignoreAuth 为true 不需要身份验证
        //ignoreAuth: true,
        // 用来给路由排序
        sort: 0,
    },
    children: [
      {
        path: 'welcome',
        name: `${routeName}_welcome`,
        meta: {
            title: '主控台',
            permissions: ['visitor'],
            // ignoreAuth 为true 不需要身份验证
            //ignoreAuth: true,
            affix: true,
        },
        component: () => import('@/views/dashboard/welcome.vue'),
      },
      // {
      //   path: 'monitor',
      //   name: `${ routeName }_monitor`,
      //   meta: {
      //     title: '监控页',
      //     permissions: ['dashboard_monitor']
      //   },
      //   component: () => import('@/views/dashboard/monitor/monitor.vue')
      // },
      {
        path: 'home',
        name: `${routeName}_home`,
        meta: {
            title: '工作台',
            keepAlive: true,
            permissions: ['visitor'],
        },
        component: () => import('@/views/dashboard/home.vue'),
      },
    ],
  },
];

export default routes;