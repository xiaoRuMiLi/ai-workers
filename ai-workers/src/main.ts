/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-01 11:39:43
 * @LastEditTime: 2024-04-02 17:05:22
 * @LastEditors: lyq
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from './store';

async function  boot ()
{
    const app = createApp(App);
    // 挂载store
    setupStore(app);
    // 挂载节点
    app.mount('#app', true);


}

void boot();
