/*
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-02 18:44:48
 */
import { toRaw, unref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import { asyncRoutes, constantRouter } from '@/router/index';
import { generatorDynamicRouter } from '@/router/generator-routers';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';

// Interface for tree structure helper configuration
interface TreeHelperConfig {
    id: string; // 节点ID字段名
    children: string; // 子节点字段名
    pid: string; // 父节点ID字段名
}

// Default configuration for tree structure helper
const DEFAULT_CONFIG: TreeHelperConfig = {
    id: 'id',
    children: 'children',
    pid: 'pid',
};

// Get the tree structure helper configuration
const getConfig = (config: Partial<TreeHelperConfig>): TreeHelperConfig => Object.assign({}, DEFAULT_CONFIG, config);

// Filter tree structure data based on a filter function
function filterTree<T = any>(
    tree: T[],
    filterFunc: (node: T) => boolean,
    config: Partial<TreeHelperConfig> = {}
): T[] {
    config = getConfig(config);
    const childrenKey = config.children as string;

    function listFilter(list: T[]): T[] {
        return list
            .map((node: any) => ({ ...node })) // Create a shallow copy of the node
            .filter((node) => {
                node[childrenKey] = node[childrenKey] && listFilter(node[childrenKey]); // Recursively filter child nodes
                return filterFunc(node) || (node[childrenKey] && node[childrenKey].length); // Include node if it passes the filter or has child nodes
            });
    }

    return listFilter(tree);
}

// Interface for async route state
export interface IAsyncRouteState {
    menus: RouteRecordRaw[]; // 菜单路由
    routers: any[]; // 所有路由
    addRouters: any[]; // 动态添加的路由
    keepAliveComponents: string[]; // 需要缓存的组件
    isDynamicAddedRoute: boolean; // 是否动态添加过路由
}

// Store for async routes
export const useAsyncRouteStore = defineStore({
    id: 'app-async-route',
    state: (): IAsyncRouteState => ({
        menus: [], // 初始化菜单为空数组
        routers: constantRouter, // 初始路由为常量路由
        addRouters: [], // 初始动态添加路由为空数组
        keepAliveComponents: [], // 初始缓存组件为空数组
        isDynamicAddedRoute: false, // 初始未动态添加过路由
    }),
    getters: {
        getMenus(): RouteRecordRaw[] {
            return this.menus; // 获取菜单路由
        },
        getIsDynamicAddedRoute(): boolean {
            return this.isDynamicAddedRoute; // 获取是否动态添加过路由
        },
    },
    actions: {
        // Get dynamic routes
        getRouters() {
            return toRaw(this.addRouters); // 返回动态添加的路由的原始数据
        },
        // Set whether dynamic routes are added
        setDynamicAddedRoute(added: boolean) {
            this.isDynamicAddedRoute = added; // 设置是否动态添加过路由
        },
        // Set routes
        setRouters(routers: any[]) {
            this.addRouters = routers; // 设置动态添加的路由
            this.routers = constantRouter.concat(routers); // 合并常量路由和动态路由
        },
        // Set menus
        setMenus(menus: RouteRecordRaw[]) {
            this.menus = menus; // 设置菜单路由
        },
        // Set components that need to be cached
        setKeepAliveComponents(componentNames: string[]) {
            this.keepAliveComponents = componentNames; // 设置需要缓存的组件
        },
        // Generate routes based on user permissions
        /**
         * Generate routes based on user permissions
         * @param userData User data object
         * @returns Array of routes that the user has permission to access
         */
        async generateRoutes(userData: any) {
            let accessedRouters;
            const permissionsList = userData.permissions || []; // 获取用户权限列表
            const routeFilter = (route: RouteRecordRaw) => {
                const { meta } = route;
                const { permissions } = meta || {};
                if (!permissions) return true;
                return permissionsList.some((item) => permissions.includes(item.value)); // 检查路由是否在权限列表中
            };
            const { getPermissionMode } = useProjectSetting();
            const permissionMode = unref(getPermissionMode); // 获取权限模式
            if (permissionMode === 'BACK') {
                try {
                    accessedRouters = await generatorDynamicRouter(); // 生成动态路由
                } catch (error) {
                    console.error(error);
                }
            } else {
                try {
                    accessedRouters = filterTree(asyncRoutes, routeFilter); // 根据权限过滤异步路由
                } catch (error) {
                    console.error(error);
                }
            }
            accessedRouters = accessedRouters.filter(routeFilter); // 再次过滤路由
            this.setRouters(accessedRouters); // 设置路由
            this.setMenus(accessedRouters); // 设置菜单
            return toRaw(accessedRouters); // 返回原始数据
        },
    },
});

// Use the store outside of setup
export function useAsyncRouteStoreInstance() {
    return useAsyncRouteStore(store);
}
