/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-02 17:18:30
 * @LastEditTime: 2024-04-17 19:37:46
 * @LastEditors: Please set LastEditors
 */
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

// Omit 省略意思是集成的时候不继承'meta' | 'children'属性
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
    name: string;
    meta: RouteMeta;
    component?: Component | string;
    components?: Component;
    children?: AppRouteRecordRaw[];
    props?: Recordable;
    fullPath?: string;
}

export interface Meta {
    // 名称
    title: string;
    // 是否忽略权限
    ignoreAuth?: boolean;
    permissions?: string[];
    // 是否不缓存
    noKeepAlive?: boolean;
    // 是否固定在tab上
    affix?: boolean;
    // tab上的图标
    icon?: string;
    // 跳转地址
    frameSrc?: string;
    // 外链跳转地址
    externalLink?: string;
    //隐藏
    hidden?: boolean;
}



export interface IModuleType {
    default: Array<RouteRecordRaw> | RouteRecordRaw;
}
