<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-05-08 17:19:51
 * @LastEditTime: 2024-05-08 17:48:35
 * @LastEditors: lyq
-->
<template>
    <n-card>
        <n-descriptions label-placement="left" title="个人信息">
            <n-descriptions-item>
            <template #label>
                电话
            </template>
            13778423210
            </n-descriptions-item>
           

            <n-descriptions-item label="邮箱">
            303219462@qq.com
            </n-descriptions-item>

            <n-descriptions-item label="剩余可使用token">
            400000
            </n-descriptions-item>
            
        </n-descriptions>
    </n-card>

</template>
<script lang="ts" setup>
import { NDescriptions, NDescriptionsItem, NCard } from "naive-ui";

</script>