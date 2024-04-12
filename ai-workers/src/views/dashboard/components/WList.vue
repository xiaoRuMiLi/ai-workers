<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 22:10:13
-->
<template>
    <div class="worker-list-wrapper">
        <div class="worker-list-title"> {{ title }}</div>
        <div class="worker-list-content">
            <slot v-for="item, key in datas" :key="key">
                <worker-item
                :id="item.id"
                :name="item.name"
                :description="item.description"
                :key-point="item.keyPoint"
                :icon="item.icon"
                />
            </slot>
        </div>
    </div>"
</template>
<script lang="ts" setup>
    import { defineProps } from "vue";
    import { BaseWorker } from "/#/worker";
    import WorkerItem from "./Witem.vue";
    const props = defineProps<{
        title: string,
        datas: BaseWorker[]
    }>();
   
</script>