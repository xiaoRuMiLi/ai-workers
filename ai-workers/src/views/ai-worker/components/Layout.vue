<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-18 17:00:51
 * @LastEditTime: 2024-05-09 20:44:01
 * @LastEditors: Please set LastEditors
-->
<template>
    <div class="ai-worker-layout">
        <div v-show="false" class="left">
            <slot name="menu">
                this is menu
            </slot>

        </div>
        <div class="right">
            <slot name="content">
                this is content
            </slot>

        </div>
    </div>
</template>
<style scoped lang="less">
@import "@/styles/index.less";
.ai-worker-layout {
    background-color: @background-color-soft;
    padding: @padding-sm;
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: nowrap;
    font-size: @font-size-md;
    box-sizing: border-box;
    position: relative;
    justify-content: center;


    .left {
        font-size: @font-size-sm;
        background-color: @background-color-light;
        height: 100%;
        width: 20%;

    }
    
    .right {
        font-size: @font-size-md;
        background-color: @background-color-light;
        height: 100%;
        min-width: 80%;
        margin-left: @padding-sm;
    }
}


</style>