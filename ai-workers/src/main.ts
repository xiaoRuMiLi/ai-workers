/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-01 11:39:43
 * @LastEditTime: 2024-04-02 21:26:36
 * @LastEditors: Please set LastEditors
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from './store';
import router, { setupRouter } from './router';

async function  boot ()
{
    const app = createApp(App);
    // 挂载store
    setupStore(app);
    // 挂载节点
    app.mount('#app', true);
    
    // 挂载路由
    await setupRouter(app);

    // 路由准备就绪后挂载APP实例
    await router.isReady();

}

void boot();
