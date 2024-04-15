<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-14 19:38:09
-->
<template>
    <div class="chat-history">
        <div v-for="item,key in datas" :key="key" class="chat-history-message" :class="item.role == 0 ? 'message-right' : 'message-left'">
            <div class="message">
                <div v-if="item.role != 0" class="assitant-avatar">
                    <NIcon size="20">
                        <component :is="IconComponent.get('assistantAvatar')"/>
                    </NIcon>
                    
                </div>
                <div class="message-content">
                    {{ item.content}}
                </div>
                <div v-if="item.role == 0" class="user-avatar">
                    <NIcon size="20">
                        <component :is="IconComponent.get('userAvatar')"/>
                    </NIcon>

                </div>
            </div>
            
        </div>

    </div>
</template>
<script setup lang="ts">
    import { defineProps } from "vue";
    import AiMessage from "/#/aiMessage";
    import { NIcon } from "naive-ui";
    import IconComponent from "@/icon-components/worker-icon";

    type Props = {
        datas: AiMessage[]
    }
    defineProps<Props>();
</script>
<style scoped lang="less">
@import "@/styles/var.less";
.chat-history {
    padding: @padding-md;
    font-size: @font-size-base;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .message {
        display: flex;
        align-items: center;
    }
    
    .chat-history-message {
        width: 100%;
    }
    .message-right {
        padding: @padding-sm;
        display: flex;
        justify-content: flex-end;
    }
    .message-right {
        padding: @padding-sm;
        display: flex;
        justify-content: flex-end;
    }
}

</style>