/*
 * @Description: 挂载STORE
 * @Author: jinjie
 * @Date: 2024-04-02 16:52:28
 * @LastEditTime: 2024-04-02 16:58:59
 * @LastEditors: lyq
 */
import type { App } from "vue";
import { createPinia } from "pinia";
const store = createPinia();

export function setupStore (app: App<Element>) {
   app.use(store);
}

export { store };
