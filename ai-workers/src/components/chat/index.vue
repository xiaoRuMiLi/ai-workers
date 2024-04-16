<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-14 19:32:30
-->
<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-14 19:32:30
-->
<template>
    <div class="chat-wrapper">
        <div class="mask">
        </div>
            <div class="chat-container">
                <div class="chat-history">
                    <!-- 这里存放以往来聊天内容-->
                    <ChatHistoryContent
                    :datas="historyMessages"
                    v-model:show = "showHistory"
                    />
                </div>
                <div class="chat-pannel">
                    <!-- 这里是情景对话框 -->
                    <ChatPannel
                    expression="happy"
                    v-model="inputValue"
                    answer="AI客服机器人，很高兴为你服务。"
                    @on-send = "onSend"
                    />
                </div>
                <div class="chat-input">
                    <!--聊天输入框 -->
                </div>
            </div>
        
    </div>"
</template>
<script lang="ts" setup>
import ChatHistoryContent from "./components/ChatHistoryContent.vue";
import ChatPannel from "./components/ChatPannel.vue";
import { ref, defineProps  } from "vue";
import AiMessage from "/#/aiMessage";
import apiResponse from "/#/apiResponse"
const inputValue = ref("预先输入");
const showHistory = ref(true);
const historyMessages: AiMessage[] = [
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
    {role: 0, content: '我想访问一下有个大模型。但是找不到在哪里', tokens: 10},
    {role: 1, content: '那你说一下是哪个模型的名称，我这边给你查询', tokens: 10},
    {role: 0, content: '我也记不起了', tokens: 10},
    {role: 1, content: '那我给你导航到我的信息页面，你看下有没有你要找的东西', tokens: 10},
    {role: 0, content: '好的', tokens: 10},
    {role: 1, content: '我这边已经导航到了，请你查看一下', tokens: 10},
];

export interface Props {
    onSend: (message: string) => Promise<apiResponse>
}

const props = defineProps<Props>();

const onSend = async (message: string) => {
    const data = await props.onSend(message);

}

</script>

<style scoped lang="less">
.wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}
.chat-container {
    max-width: 1000px;
    position: fixed;
    bottom: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: flex-end;
}

.chat-container::-webkit-scrollbar {
  display: none;
}
.mask {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background: rgba(255,255,255,0.8);
}
.chat-history {
    display: flex;
    justify-content: center;
}
.chat-pannel {
     
}
</style>