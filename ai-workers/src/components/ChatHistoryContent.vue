<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-14 19:38:09
-->
<template>
    <div class="chat-history" ref="chatHistory" @click="showMsg = !showMsg">
        <NIcon size="20" class="close-icon">
            <component :is="hideFont"/>
        </NIcon>
        <transition name="collapse">
            <div class="message-container" v-show="showMsg">
                <div v-for="item,key in datas" :key="key" class="chat-history-message" :class="item.role == 0 ? 'message-right' : 'message-left'">
                    <div class="message">
                        <div v-if="item.role != 0" class="assitant-avatar">
                            <NIcon size="20">
                                <component :is="IconComponent.get('assistantAvatar')"/>
                            </NIcon>
                            
                        </div>
                        <div class="message-content">
                            <div class="message-content-text">
                                {{ item.content}}
                            </div>
                            
                        </div>
                        <div v-if="item.role == 0" class="user-avatar">
                            <NIcon size="20">
                                <component :is="IconComponent.get('userAvatar')"/>
                            </NIcon>

                        </div>
                    </div>
                    
                </div>
            </div>
        </transition>

    </div>
</template>
<script setup lang="ts">
    import { defineProps,  computed, defineEmits, ref, watch } from "vue";
    import AiMessage from "/#/aiMessage";
    import { NIcon } from "naive-ui";
    import IconComponent from "@/icon-components/worker-icon";
    import { UpOutlined, DownOutlined } from "@vicons/antd";
    
    // 组件实例
    const chatHistory = ref(null);
    type Props = {
        datas: AiMessage[],
        show: boolean,
    }
    const props = withDefaults(defineProps<Props>(),
        {
            show: true,
        }
    );
    const hideFont = computed(() => {
        if (showMsg.value == true)
        {
            return DownOutlined;
        }
        return UpOutlined;
    })

    const emits = defineEmits<{
        (e: 'update:show', value: boolean): void, 
    }>();

    const showMsg = computed({
        set: (value: boolean) => {
            emits("update:show", value);
        },
        get: () => {
            return props.show;
        }
    })

    watch(props.datas, function (e) {
        console.log("eee", e);
    }, {deep:true});


</script>
<style scoped lang="less">
@import "@/styles/var.less";
.collapse-enter-active, .collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.collapse-enter-from, .collapse-leave-to {
  opacity: 0;
}
.message-container {
    width: 100%;
}

.close-icon {
    padding: @padding-base;
    border-radius: 50%;
    background-color: @background-color-soft;
    width: auto;
}
.chat-history {
    padding: @padding-md;
    font-size: @font-size-sm;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .message {
        display: flex;
        align-items: center;
    }
    
    .chat-history-message {
        width: 100%;
        .assitant-avatar , .user-avatar {
            padding: @padding-base;
        }
    }
    .message-right {
        padding: @padding-sm;
        display: flex;
        justify-content: flex-end;
        .message-content {
            padding: @padding-sm 0;
            .message-content-text {
                padding: 0 @padding-base;
                background-color: rgba(0, 153, 200, 0.3);
                border-radius: @border-radius-base;
            }
         
        }
        
    }
    .message-left {
        padding: @padding-sm;
        display: flex;
        justify-content: flex-start;
        .message-content {
            padding: @padding-sm 0;
            .message-content-text {
                padding: 0 @padding-base;
                background-color: @background-color-soft;
                border-radius: @border-radius-base;
            }
         
        }
    }
}

</style>