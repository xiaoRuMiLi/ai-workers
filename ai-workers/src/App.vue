<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-01 22:19:32
-->
<template>
  <div class="app-content">
    <NConfigProvider
        v-if="!isLock"
        :locale="zhCN"
        :theme-overrides="getThemeOverrides"
        :date-locale="dateZhCN"
        :style="{height: '100%'}"
    >
    <AppProvider>
        <RouterView />
    </AppProvider>
    </NConfigProvider>
  </div>
</template>
<script setup lang="ts" >
import { ref, computed } from "vue";
// import Layout from "@/layout/index.vue";
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui';
import { useDesignSettingStore } from '@/store/modules/designSetting';
import { lighten } from '@/utils/index';
import { AppProvider } from '@/components/Application';
const isLock = ref(false);

const designStore = useDesignSettingStore();
  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
const getThemeOverrides = computed(() => {
    const appTheme = designStore.appTheme;
    const lightenStr = lighten(designStore.appTheme, 6);
    return {
        common: {
            primaryColor: appTheme,
            primaryColorHover: lightenStr,
            primaryColorPressed: lightenStr,
            primaryColorSuppl: appTheme,
        },
        LoadingBar: {
            colorLoading: appTheme,
        },
    };
});


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
    .app-content {
        height: 100vh;
    }
</style>
