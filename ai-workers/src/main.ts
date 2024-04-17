/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-01 11:39:43
 * @LastEditTime: 2024-04-17 11:59:35
 * @LastEditors: lyq
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from './store';
import router, { setupRouter } from './router';
import { setupNaiveDiscreteApi, setupNaive, setupDirectives } from '@/plugins';

async function  boot ()
{
    const app = createApp(App);
    // 挂载store
    setupStore(app);
    // 注册全局常用的 naive-ui 组件
    setupNaive(app);

    // 挂载 naive-ui 脱离上下文的 Api
    setupNaiveDiscreteApi();

    // 注册全局自定义组件
    //setupCustomComponents();

    // 注册全局自定义指令，如：v-permission权限指令
    setupDirectives(app);
    // 挂载路由
    await setupRouter(app);

    // 路由准备就绪后挂载APP实例
    await router.isReady();
    // 挂载节点
    app.mount('#app', true);

}

void boot();
