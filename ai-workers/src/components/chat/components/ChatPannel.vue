<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-14 19:40:42
-->
<template>
    <div class="chat-pannel-wrapper">
        <div class="chat-image-container" :class="expressionClass">
            <!-- 这里放置AI的头像或者动图 -->
            <!-- 这里可以放置动图的图片或其他内容 -->
            <img class="chat-image" :src="expressionImage" alt="图像不见了"/>
            <div>  </div>

        </div>
        <div v-if="answer" class="chat-pannel-answer">
            <!-- 这里是一个AI回答内容的聊天气泡 -->
            <div class="chat-bubble" :style="bubbleStyle" :class="bubbleDirection == 'left' ? 'chat-bubble-to-right' : 'chat-bubble-to-left'">
                <div class="chat-bubble-content">
                    <!-- 使用 v-html 指令渲染带有潜在 HTML 标签的内容 -->
                    <!--<div v-html="value"></div>-->
                    {{ answer }}
                </div>
            </div>
            
        </div>
    </div>
    <div class="chat-pannel-input">
        <ChatInput
            v-model= inputValue
        />
    </div>
</template>
 
<script lang="ts" setup>
import { defineProps, computed, onMounted, defineEmits } from 'vue';
import happyImage from "@static/images/e95d925dd71c38a1e4e3c249566f01b4.gif";
import ChatInput from "./ChatInput.vue";
  
interface ExpressionType {
    happy: string;
    sad: string;
    angry: string;
    // ... 可以添加更多表情
}

type Props = {
    // 表情
    expression: keyof ExpressionType,
    // 气泡框class控制样式
    bubbleStyle: {[key:string]: string} | null,
    // 内容
    answer: string,
    modelValue: string,
    bubbleDirection: "left"|"right",
   
};


const props = withDefaults(defineProps<Props>(), {
    bubbleClass: "bubble-default",
    expression: "happy",
    bubbleDirection: "left",
    bubbleStyle: null,
});

const emits = defineEmits<{
   (e: "update:modelValue", value:string): void
}>();

const inputValue = computed({
    set: (value: string) => {
        emits("update:modelValue", value);
    },
    get: () => {
        return props.modelValue;
    }
});

const expressionImage = computed( () => {

    const expressions: ExpressionType = {
        happy: happyImage,
        sad: 'path/to/sad.png',
        angry: 'path/to/angry.png',
        // ... 根据需要添加更多路径
    };
    const img =  expressions[props.expression] || happyImage;

    // 动态加载图片
    return img;
    
})

onMounted(async () => {
   
})

const expressionClass = computed(() => {
    return `chat-image-${props.expression}`;
})



</script>
  
<style scoped lang="less">
@import "@/styles/var.less";
    .chat-pannel-wrapper {
        padding: @padding-md;
        box-sizing: border-box;
        align-items: flex-end;
    }
    .chat-image {
        width: 100px;
        height: 100px;

    }
    .chat-pannel-input {
        display: flex;
        justify-content: center;
    }

    .ai-head {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      /* 根据需要添加其他通用样式 */
    }
    .chat-pannel-wrapper {
        display: flex;
        justify-content: flex-start;
    }
    
    .chat-image-happy {
      /* 快乐的表情样式 */
    }
    
    .chat-image-sad {
      /* 悲伤的表情样式 */
    }
    
    .chat-image-angry {
      /* 生气的表情样式 */
    }
    .chat-pannel-answer {
       display: flex;
       align-items: center;
    }
    
    /* ... 为其他表情添加样式 */

    .chat-bubble {
        background-color: @background-color-soft;
        border-radius: 20px;
        padding: 10px 15px;
        max-width: 70%;
        position: relative;
        display: inline-block;
    }
      
    .chat-bubble-content {
        /* 你可以在这里添加更多的样式来美化聊天气泡内容 */
        font-size: 14px;
        color: #333;
    }
      
      /* 添加样式以使右侧气泡的角指向左边 */
    .chat-bubble-to-right::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -8px;
        border-style: solid;
        border-width: 8px 8px 8px 0;
        border-color: transparent #f9f9f9 transparent transparent;
        transform: translateY(-50%);
    }
      
      /* 添加样式以使左侧气泡的角指向右边 */
    .chat-bubble-to-left::before {
        content: '';
        position: absolute;
        top: 50%;
        right: -8px;
        border-style: solid;
        border-width: 8px 0 8px 8px;
        border-color: transparent transparent transparent #f9f9f9;
        transform: translateY(-50%);
    }
</style>