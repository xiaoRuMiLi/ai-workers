<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-18 16:59:01
 * @LastEditTime: 2024-04-19 09:47:46
 * @LastEditors: lyq
-->
<template>
    <div class="ai-worker-wrapper">
        <Layout>
            <template #menu>
                <Menu/>

            </template>
            <template #content>
                <div class="content">
                    <chat-history
                    :datas="historyMessages"
                    v-model:show="showHistory"
                    />
                    <chat-input 
                    :style="{position: 'absolute', bottom: '0'}"
                    v-model="question"
                    @on-send="handleSend"
                    />

                   

                </div>
            </template>
            
        </Layout>
    </div>

</template>

<script setup lang="ts">
import Layout from "./components/Layout.vue";
import Menu from "./components/Menu.vue";
import ChatHistory from "@/components/ChatHistoryContent.vue";
import ChatInput from "@/components/ChatInput.vue";
import { ref } from "vue";
import AiMessage from "/#/aiMessage";
const historyMessages: AiMessage[] = [
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
   
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
   
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
   
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
   
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
   
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
   
   
];
const showHistory = true;
const question = ref("");
const handleSend = (question: string) =>
{
   console.log(question);
}
</script>
<style scoped lang="less">
.ai-worker-wrapper {
    width: 100%;
    height: 100%;

    .content {
        position: relative;
        height: 100%;
        
    }
}
</style>