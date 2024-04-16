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
    <Transition name="fade">
        <div v-show="show" class="chat-wrapper">
            <div v-if="showHistory" class="mask">
            </div>
            <div class="chat-container">
                <div class="chat-history">
                    <!-- 这里存放以往来聊天内容-->
                    <ChatHistoryContent
                    :datas="historyMessages"
                    v-model:show="showHistory"
                    />
                </div>
                <div class="chat-pannel">
                    <!-- 这里是情景对话框 -->
                    <ChatPannel
                    expression="happy"
                    v-model="inputValue"
                    answer="AI客服机器人，很高兴为你服务。
                    注意事项"
                    @on-send="onSend"
                    @on-show="showChatPannel"
                    />
                </div>
                <div class="chat-input">
                    <!--聊天输入框 -->
                </div>
            </div>
            
        </div>
    </Transition>
    <div v-if="!show" class="avatar-container" @click="show = true"> 
        <!--边角图标 -->
        <NImage
        :height="50"
        :src="happyImage"
        />
        
    </div>
</template>
<script lang="ts" setup>
import ChatHistoryContent from "./components/ChatHistoryContent.vue";
import ChatPannel from "./components/ChatPannel.vue";
import { ref, defineProps  } from "vue";
import AiMessage from "/#/aiMessage";
import type ApiResponse from "/#/apiResponse";
import happyImage from "@static/images/e95d925dd71c38a1e4e3c249566f01b4.gif";
import { NImage } from "naive-ui"
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
    onSend: (message: string) => Promise<ApiResponse>
}

const props = defineProps<Props>();

const onSend = async (message: string) => {
    try {
        const data = await props.onSend(message);

    } catch (err)
    {
        console.log(err);
    }
    
}
// 控制整个聊天窗口的隐藏
const show = ref(true);
// 显示或者隐藏聊天面板
const showChatPannel = (value: boolean) => {
    if(!value) show.value = value;
}

</script>

<style scoped lang="less">
@import '@/styles/index.less';
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
.chat-pannel {
    background-color: white;
    padding: @padding-md;
    border-radius: @border-radius-md;
    margin-bottom: 50px;
    box-sizing: border-box;
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
    width: 100%;
    overflow-y: scroll;
}
.chat-history::-webkit-scrollbar {
    display: none;
}
.avatar-container {
    position: fixed;
    bottom: 0;
    left: -10px;
}
</style>