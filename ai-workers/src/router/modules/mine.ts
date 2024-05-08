/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-05-08 17:23:13
 * @LastEditTime: 2024-05-08 17:39:26
 * @LastEditors: lyq
 */
import { Layout } from "@/router/constant";
import { RouteRecordRaw } from "vue-router";
import { renderIcon } from "@/utils";
import { UserOutlined } from '@vicons/antd';

const routeName = "Mine";
const routers: Array<RouteRecordRaw> = [
    {
        path: '/mine',
        name: routeName,
        redirect: '/mine/index',
        component: Layout,
        meta: {
            title: 'Mine',
            icon: renderIcon(UserOutlined),
            // userInfo必须要有以下权限中的一种才会被添加到路由中
            permissions: ['visitor'],
            // ignoreAuth 为true 不需要身份验证
            //ignoreAuth: true,
            // 用来给路由排序
            sort: 0,
        },
        children: [
          {
            path: 'index',
            name: `${routeName}Index`,
            meta: {
                title: '账户中心',
                permissions: ['visitor'],
                // ignoreAuth 为true 不需要身份验证
                //ignoreAuth: true,
                affix: true,
            },
            component: () => import('@/views/mine/index.vue'),
          },
         
        ],
      },

];


export default routers;
