<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-23 21:16:11
-->

<template>
    <n-dialog
        :title="title"
        :content="content"
        :negative-text="negativeText"
        :positive-text="positiveText"
        @positive-click="handlePositiveClick"
        @negative-click="handleNegativeClick"
    />
</template>

<script lang="ts">
    import { defineComponent, defineProps, defineEmits } from 'vue'
    export type Props = {
        title: string,
        content: string,
        negativeText: string,
        positiveText: string
    }
    
    export default defineComponent({
        setup () {
            
            const { title, content, negativeText, positiveText } = defineProps<Props>();
            const emit = defineEmits<{(e: "handleNegativeClick", value: number) : void, (e: "handlePositiveClick", value: number)}>()
            const handleNegativeClick = () => {
                emit("handleNegativeClick", 1);
            }
            
            const handlePositiveClick = () => {
                emit("handlePositiveClick", 0);
            }
            
            return {
                title,
                content,
                negativeText,
                positiveText,
                handleNegativeClick,
                handlePositiveClick
            }
        }
    })
