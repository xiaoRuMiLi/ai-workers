<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 22:10:24
-->
<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 22:10:24
-->
<template>
   
    <div class="worker-item" >
        <n-card
        hoverable,
        :title="name"
        >
            <template #head>
                <div class="worker-item-head">
                    <n-icon size="18">
                        <component :is="IconComponent[icon]"/>
                    </n-icon>
                </div>
            </template>
            <template #default>
                <div class="worker-item-content">
                    {{ information }}
                </div>
            </template>
            <template #foot>
                <div class="worker-item-foot">
                    {{ keyPoint }}
                </div>
            </template>
        </n-card>
            
    </div>
       
</template>
<script lang="ts" setup>
    import { defineProps  } from 'vue';
    import type { Component } from 'vue'
    import type { BaseWorker } from "/#/worker";
    import { SettingOutlined, MehTwotone } from '@vicons/antd';
    import { NIcon } from "naive-ui";

    const IconComponent = new Map<string, Component>();
    IconComponent.set(SettingOutlined["name"], SettingOutlined);
    IconComponent.set('defaultIcon', MehTwotone);
    defineProps<BaseWorker>();

</script>