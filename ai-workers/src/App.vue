<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-01 22:19:32
-->
<template>
  <div>
    <NConfigProvider
        v-if="!isLock"
        :locale="zhCN"
        :theme-overrides="themeOverrides"
        :date-locale="dateZhCN"
    >
    <RouterView />

    </NConfigProvider>
  </div>
</template>
<script setup lang="ts" >
import { ref } from "vue";
// import Layout from "@/layout/index.vue";
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN, GlobalThemeOverrides } from 'naive-ui';

const isLock = ref(false);

const themeOverrides: GlobalThemeOverrides = {
    // 这里可以修改主题变量
    /* common: {
      primaryColor: '#FF0000'
    },
    Button: {
      textColor: '#FF0000'
    }*/
  }
</script>

<style scoped lang="less">
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.vue:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
    }
</style>
