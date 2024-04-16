<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 22:10:13
-->
<template>
    <div class="worker-list-wrapper">
        <div class="worker-list-title"> {{ title }}</div>
        <div class="worker-list-content">
            <slot  v-for="item, key in datas" :key="key">
                <div class="list-item">
                    <worker-item
                    :id="item.id"
                    :name="item.name"
                    :description="item.description"
                    :key-point="item.keyPoint"
                    :icon="item.icon"
                    />
                </div>
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
<style scoped lang="less">
@import "@/styles/var.less";
.worker-list-wrapper {
    
}
.worker-list-title {
    font-size: @font-size-lg;
    padding: @padding-md;
}
.worker-list-content {
    background: @background-color-soft;
    display: flex;
    flex-wrap: wrap;
    padding: @padding-md;
    justify-content: space-around;
    gap: 10px;
}
.list-item {
    width: 300px;
    box-sizing: border-box;
    margin-bottom: 10px;
    
}
</style>