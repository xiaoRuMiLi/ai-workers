<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-18 16:59:01
 * @LastEditTime: 2024-04-18 18:32:35
 * @LastEditors: lyq
-->
<template>
    <div class="ai-worker-wrapper">
        <Layout>
            <template #menu>
                <Menu/>

            </template>
            
        </Layout>
    </div>

</template>

<script setup lang="ts">
import Layout from "./components/Layout.vue";
import Menu from "./components/Menu.vue";

</script>
<style scoped lang="less">
.ai-worker-wrapper {
    width: 100%;
    height: 100%;
}
</style>