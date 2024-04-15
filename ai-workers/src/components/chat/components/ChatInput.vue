<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-15 21:01:04
-->
<template>
    <div class="chat-input-wrapper">
        <div class="chat-input-left">

        </div>
        <div class="chat-input-middle">
            <NInput
            :style="{width: '80vw'}"
            placeholder="输入问题向我提问"
            type="textarea"
            v-model:value="value"
            size="medium"
            autosize
            clearable
            round
            />
            
            <div class="chat-input-btn">
                 
                <NIcon size="20">  
                    <component :is="SendOutlined" />
                </NIcon>  

            </div>
        </div>
        <div class="chat-input-right">

        </div>
    </div>
</template>
<script setup lang="ts">
import { NInput, NIcon } from "naive-ui";
import { defineProps, computed, defineEmits, WritableComputedRef } from "vue";
import { SendOutlined } from "@vicons/antd";

export type Props = {
    modelValue: string
}
const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "update:modelValue", value: string): void,
    (e: "submit", value: string): void,
}>();

const value: WritableComputedRef<string> = computed({
    set: (value) => {
        emits("update:modelValue", value);
    },
    get: (): string =>
    {
        return props.modelValue;
    }
})


</script>

<style scoped lang="less">
@import '@/styles/var.less';
.chat-input-wrapper {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .chat-input-middle {
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .chat-input-btn {
            display: flex;
            align-items: center;
            padding-left: @padding-md;

        }
    }
}
</style>"