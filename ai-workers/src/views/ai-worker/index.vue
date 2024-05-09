<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-18 16:59:01
 * @LastEditTime: 2024-05-09 20:39:42
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="ai-worker-wrapper">
        <Layout>
            <!--
                <template #menu>
                    <Menu
                    worker-info="workerInfo"
                    />

                </template>
            -->
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
import { ref, Ref, computed } from "vue";
import AiMessage from "/#/aiMessage";
import { callServiceGroup } from "@/api/system/aiHelper";
import { useMessage, useDialog  } from "naive-ui";
import type { Interactive, InteractiveType } from "/#/interactive";
import { useRoute } from "vue-router";


const dialog = useDialog();
const route = useRoute();
const doInteractive = function (interactiveType: InteractiveType, data: Interactive)
{
    if (interactiveType === "confirm") {
        dialog.warning({
            title: "提示",
            content: data.question,
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
                question.value = "1";
                handleSend();
            },
            onNegativeClick: () => {
                question.value = "0";
                handleSend();
            }
        })
        return ;
    }
}

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
    const {service: serviceGroupName, groupid: userGroupId } = route.query;
    
    if (!serviceGroupName || !userGroupId || parseInt(userGroupId as string) <= 0)
    {
        message.warning(`访问的服务名${serviceGroupName}或用户组不存在`);
        return ;
    }

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
        const { data } = await callServiceGroup({question: questionString}, serviceGroupName as string, userGroupId);
        message.destroyAll();
        if (Reflect.has(data, "answer"))
        {
            historyMessages.value.push({role: 1, content: data.answer, tokens: 10});
            toScrollTop();
        }
        
        if ( Reflect.has(data, "interactive") && data.interactive && data.interactive.type)
        {
            // 执行interactive
            const typeName: InteractiveType = data.interactive.type;
            doInteractive(typeName, data.interactive);
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