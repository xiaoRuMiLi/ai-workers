<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-18 16:59:01
 * @LastEditTime: 2024-04-20 18:02:21
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
                    <div ref="history" class="ai-worker-history">
                        <chat-history
                        :datas="historyMessages"
                        v-model:show="showHistory"
                        />
                    </div>
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
import { ref, Ref } from "vue";
import AiMessage from "/#/aiMessage";
const historyMessages: Ref<AiMessage[]> = ref([
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
   
   
]);
const showHistory = true;
const question = ref("");
const history: Ref<HTMLDivElement | null> = ref(null);
const handleSend = (value: string) =>
{
   
    historyMessages.value.push({role: 0, content: value, tokens: 10});
    question.value = "";
    if (history && history.value.hasOwnProperty("scrollTop") && history.value.hasOwnProperty("scrollHeight"))
    {
        console.log(history.value.scrollHeight);
        const scrollHeight = history.value.scrollHeight;
        history.value.scrollTop = scrollHeight;
    }
    
    console.log(history);
    //historyRef.value.setScrollTop();

}
</script>
<style scoped lang="less">
.ai-worker-wrapper {
    width: 100%;
    height: 100%;

    .content {
        position: relative;
        height: 100%;

        .ai-worker-history {
            height: 80vh;
            overflow-y: scroll;
        }
        
    }
}
</style>