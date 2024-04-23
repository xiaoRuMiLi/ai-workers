<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-18 16:59:01
 * @LastEditTime: 2024-04-23 15:58:21
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
import { callServiceGroup } from "@/api/system/aiHelper";
import { resolve } from "dns";
import { reject } from "lodash-es";
import { useMessage } from "naive-ui";
import { StringNullableChain } from "lodash";
const historyMessages: Ref<AiMessage[]> = ref([
]);
const showHistory = true;
const question = ref("");
const message = useMessage();
const history: Ref<HTMLDivElement | null> = ref(null);
const loading = ref(false);
const toScrollTop = () => {
    setTimeout(() => {
    if (history.value)
        {
            const scrollHeight = history.value.scrollHeight;
            history.value.scrollTop = scrollHeight;  
            
        }
    
    }, 1000);
}
const handleSend = async () =>
{
    if (loading.value)
    {
        return ;
    }
    historyMessages.value.push({role: 0, content: question.value, tokens: 10});
    toScrollTop();
    const questionString = question.value;
    question.value = "";
    message.loading('思考中...', { duration: 500000 });
    loading.value = true;
    try {
        const { data } = await callServiceGroup({question: questionString}, "repair_service_group_call");
        message.destroyAll();
        if (Reflect.has(data, "answer"))
        {
            historyMessages.value.push({role: 1, content: data.answer, tokens: 10});
            toScrollTop();
        }
        
        if (Reflect.has(data, "interactive"))
        {
            console.log("interactive", data.interactive);
        }
        console.log(data);
    } catch (err)
    {
        console.log(err.message);
    } finally {
        message.destroyAll();
        loading.value = false;
    }
     
    
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