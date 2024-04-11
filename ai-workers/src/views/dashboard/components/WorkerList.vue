<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 22:10:13
-->
<template>
    <div class="worker-list-wrapper">
        <title> {{ title }}</title>
        <div class="worker-list-content">
            <slot v-for="item, key in datas" :key="key">
                <WorkerItem"
                ></WorkerItem>
            </slot>
        </div>
    </div>"
</template>
<script lang="ts" setup>
    import { defineProps } from "vue";
    import { BaseWorker } from "/#/worker";
    const props = defineProps<{
        title: string,
        datas: BaseWorker[]
    }>();
   
</script>