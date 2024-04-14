
<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 22:10:24
-->
<template>
   
    <div class="worker-item" @click="handleClick(id)">
        <n-popover>
            <template #trigger>
                <n-card
                :hoverable="true"
                >
                    <template #header>
                        <div class="worker-item-head">
                            <n-icon size="25" color="#6089ef">
                                <component :is="iconComponents.get(icon)"/>
                            </n-icon>
                            {{ name }}
                        </div>
                    </template>
                    <template #default>
                        <div class="worker-item-content">
                            {{ keyPoint }}
                        </div>
                    </template>
                    <template #footer>
                        <div class="worker-item-buttons">

                        </div>
                    </template>
                </n-card>

            </template>
            <template #default>
                <div>{{ description }}</div>
            </template>
    </n-popover>
            
    </div>
       
</template>
<script lang="ts" setup>
    import { defineProps  } from 'vue';
    import type { BaseWorker } from "/#/worker";
    import { NCard, NPopover } from "naive-ui";
    import { NIcon } from "naive-ui";
    import iconComponents from "@/icon-components/worker-icon";
    
    defineProps<BaseWorker>();

    const handleClick = (id: number) => {
        console.log(id);
    }

</script>
<style scoped lang="less">
.worker-item {
    .worker-item-head {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    @line-hight: @font-size-sm * 1.5;
    @max-height: @line-hight * 3;
    &-content {
        display: -webkit-box; /*将元素显示为一个块级盒子。*/
        -webkit-box-orient: vertical; /*设置盒子的布局方向为垂直。*/
        -webkit-line-clamp: 1; /**限制在一个块元素显示的文本的行数为 3 行。*/
        overflow: hidden; /* 隐藏溢出容器的文本。*/
        text-overflow: ellipsis; /*显示溢出的文本末尾的省略号。*/
        line-height: @line-hight; /*设置行高，根据你的设计需求调整这个值。*/
        max-height: @max-height; /*设置元素的最大高度，确保不会显示超过 3 行文本。这个值是根据 line-height 计算得出的（例如，1.5 * 3 = 4.5）。*/
    }
}
</style>