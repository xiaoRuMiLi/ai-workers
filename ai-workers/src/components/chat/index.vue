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
                    <ChatHistoryContent></ChatHistoryContent>
                </div>
                <div class="chat-pannel">
                    <!-- 这里是情景对话框 -->
                    <ChatPannel
                    expression="happy"
                    v-model="inputValue"
                    answer="这是一个模拟的话语，AI客服机器人，很高兴为你服务。"
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

const inputValue = ref("预先输入");

</script>

<style scoped lang="less">
.chat-container {
    width: 100%;
}
</style>