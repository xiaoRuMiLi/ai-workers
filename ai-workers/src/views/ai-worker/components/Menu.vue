<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-18 17:32:37
 * @LastEditTime: 2024-04-18 21:31:50
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="ai-worker-menu">
        <div class="logo">
            <n-avatar
            round
            :size="48"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
        </div>
        <div class="chat-list">
            <n-collapse arrow-placement="right">
                <n-collapse-item title="青铜" name="1">
                    <template #header>
                        <div class="chat-list-header"> 历史记录 </div>
                    </template>
                    <div class="chat-item">
                        <div class="name">
                            汽修厂服务员
                        </div>
                    </div>
                    <template #arrow>
                        <div class="list-item-arrow">

                        </div>
                    </template>
                </n-collapse-item>
        </n-collapse>

        </div>
        <div class="btns">

        </div>
        <div class="my-app">

        </div>
    </div>
</template>
<script setup lang="ts">
import { NAvatar, NCollapse, NCollapseItem } from "naive-ui";
</script>
<style scoped lang="less">
@import "@/styles/index.less";
.ai-worker-menu {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: @padding-sm;
    
    div {
        width: 100%;
    }
    .chat-list {
        .chat-list-header {
            padding: @padding-base;
            font-size: @font-size-sm;
            background-color: @color-blue;
            border-radius: @border-radius-sm;
            color: white;
        }

        .list-item-arrow {
            background-color: @color-blue;
        }
        .chat-item {
            border-bottom: 1px solid @color-grey1;
            .name {
                font-size: @font-size-sm;
                color: @color-blue;
            }
            .info {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}
</style>