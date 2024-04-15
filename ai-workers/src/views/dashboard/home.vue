<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 21:29:10
-->
<template>
    <div class="home-wrapper">
        <div class="content-container">
            <worker-list
            :datas="exampleList"
            title="推荐"
            />
        </div>
        
    </div>
</template>
<script lang="ts" setup>
    import { ref, Ref } from "vue";
    import { BaseWorker } from "/#/worker";
    import  WorkerList  from "./components/WList.vue";

    const exampleList: Ref<BaseWorker[]> = ref([
        {
        id: 1,
        name: "保险销售人员", 
        description: `这是模拟保险销售员，并给了一个拟人化的名字陈东梅，
        这是我们给他设定的任务流：
        1. 获取到你将要购买车险的车牌号码，并确认无误。
        2. 通过谈话获取到你的将要购买保险的险种，顺便告诉你近期的优惠活动，礼品赠送等，这一步我们设定了尽量给你推销驾乘险（公司有任务驾乘险必须推）。
        3. 收集到所有的信息后然后自动给你发送整理好的资料到你的邮箱。
        `,
        icon: "default",
        keyPoint: "和客户聊保险需求，推荐购买险种"
        },
        {
        id: 1,
        name: "保险销售人员", 
        description: `这是模拟保险销售员，并给了一个拟人化的名字陈东梅，
        这是我们给他设定的任务流：
        1. 获取到你将要购买车险的车牌号码，并确认无误。
        2. 通过谈话获取到你的将要购买保险的险种，顺便告诉你近期的优惠活动，礼品赠送等，这一步我们设定了尽量给你推销驾乘险（公司有任务驾乘险必须推）。
        3. 收集到所有的信息后然后自动给你发送整理好的资料到你的邮箱。
        `,
        icon: "default",
        keyPoint: "和客户聊保险需求，推荐购买险种"
        },
        {
        id: 1,
        name: "保险销售人员", 
        description: `这是模拟保险销售员，并给了一个拟人化的名字陈东梅，
        这是我们给他设定的任务流：
        1. 获取到你将要购买车险的车牌号码，并确认无误。
        2. 通过谈话获取到你的将要购买保险的险种，顺便告诉你近期的优惠活动，礼品赠送等，这一步我们设定了尽量给你推销驾乘险（公司有任务驾乘险必须推）。
        3. 收集到所有的信息后然后自动给你发送整理好的资料到你的邮箱。
        `,
        icon: "default",
        keyPoint: "和客户聊保险需求，推荐购买险种"
        },
        {
        id: 1,
        name: "保险销售人员", 
        description: `这是模拟保险销售员，并给了一个拟人化的名字陈东梅，
        这是我们给他设定的任务流：
        1. 获取到你将要购买车险的车牌号码，并确认无误。
        2. 通过谈话获取到你的将要购买保险的险种，顺便告诉你近期的优惠活动，礼品赠送等，这一步我们设定了尽量给你推销驾乘险（公司有任务驾乘险必须推）。
        3. 收集到所有的信息后然后自动给你发送整理好的资料到你的邮箱。
        `,
        icon: "default",
        keyPoint: "和客户聊保险需求，推荐购买险种"
        }
    ])

</script>
<style lang="less" scoped>
@import '@/styles/var.less';
.home-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content-container {
        width: 80%; 
    }

}

</style>