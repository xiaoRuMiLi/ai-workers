/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-18 17:15:54
 * @LastEditTime: 2024-05-06 21:24:59
 * @LastEditors: Please set LastEditors
 */
import { Layout } from "@/router/constant";
import { RouteRecordRaw } from "vue-router";
// 图标库 参考 https://www.antdv.com/components/icon-cn
import { DashboardOutlined } from '@vicons/antd';
import { renderIcon } from "@/utils/index";
const routeName = "AiWorker";
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
    path: '/aiworker',
    name: routeName,
    redirect: '/aiworker/action',
    component: Layout,
    meta: {
        title: 'AiWorker',
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
        path: 'action',
        name: `${routeName}Action`,
        meta: {
            title: '服务体验',
            permissions: ['visitor'],
            // ignoreAuth 为true 不需要身份验证
            //ignoreAuth: true,
            affix: true,
        },
        component: () => import('@/views/ai-worker/index.vue'),
      },
     
    ],
  },
];

export default routes;