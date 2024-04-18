<template>
    <div class="title">{{ title }}</div>
    <div class="content"> 
        <p> {{content}} </p>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

export type TxtProps = {
    title: string,
    content: string
}
defineProps<TxtProps>();
</script>
<style scoped lang="less">
@import "@/styles/var.less";
.title {
    padding: @padding-lg;
    font-size: @font-size-lg;
}
.content {
    padding: @padding-md;
    font-size: @font-size-md;
}
</style>
