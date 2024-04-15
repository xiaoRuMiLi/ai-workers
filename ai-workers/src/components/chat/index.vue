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
            <div class="chat-container">
                <div class="chat-history">
                    <!-- 这里存放以往来聊天内容-->
                    <ChatHistoryContent
                    :datas="historyMessages"
                    />
                </div>
                <div class="chat-pannel">
                    <!-- 这里是情景对话框 -->
                    <ChatPannel
                    expression="happy"
                    v-model="inputValue"
                    answer="这是一个模拟的话语，AI客服机器人，很高兴为你服务。几十块了几十块的时就开始
                    了大家快乐是大家所说的速度快了就速度快了手机打开了速度速度加快了速度加快速度加速度速度加快速度就开始速度加快圣诞节是快乐的速度速度加快
                    了速度加快了速度就速度快了速度啥地方就快了速度飞机上看到了房价是否打开了速
                    度飞机上开了房大家速度飞快了速度飞机速度放开了就速度快了速度就上课了大家是放大了开头
                    加速度了加速度开口说多了圣诞节快乐圣诞节送快递"
                    />
                </div>
                <div class="chat-input">
                    <!--聊天输入框 -->
                </div>
            </div>
        </div>
    </div>"
</template>
<script lang="ts" setup>
import ChatHistoryContent from "./components/ChatHistoryContent.vue";
import ChatPannel from "./components/ChatPannel.vue";
import { ref } from "vue";
import AiMessage from "/#/aiMessage";

const inputValue = ref("预先输入");

const historyMessages: AiMessage[] = [
    {role: 0, content: '你好', tokens: 10},
    {role: 1, content: '有什么可以为你效劳的', tokens: 10},
    {role: 0, content: '我想访问一下有个大模型。但是找不到在哪里', tokens: 10},
    {role: 1, content: '那你说一下是哪个模型的名称，我这边给你查询', tokens: 10},
    {role: 0, content: '我也记不起了', tokens: 10},
    {role: 1, content: '那我给你导航到我的信息页面，你看下有没有你要找的东西', tokens: 10},
    {role: 0, content: '好的', tokens: 10},
    {role: 1, content: '我这边已经导航到了，请你查看一下', tokens: 10},
]
</script>

<style scoped lang="less">
.chat-container {
    width: 100%;
    position: fixed;
    bottom: 0;
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