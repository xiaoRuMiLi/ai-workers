<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 21:29:10
-->
<template>
    <div class="home-wrapper">
        <div class="content-container">
            <h3> 推荐 </h3>
            <ul>
                <li>
                    <div class="content-item">
                        <n-card
                        hoverable,
                        :title = ""
                        >
                        </n-card>
                         
                    </div>
                </li>
            </ul>
        </div>"
    </div>
</template>
<script lang="ts" setup>
    import { NCard } from "naive-ui";
    import { ref, Ref } from "vue";

    const iconMap = new Map<string, ComponentRef>();

    interface BaseWorker {
        name: string,
        information: string,
        icon: string | null,
        id: number,
        keyPoint: string | null,
    }
     
    const example: BaseWorker[] = [
        {
        id: 1,
        name: "保险销售人员", 
        information: `这是模拟保险销售员，并给了一个拟人化的名字陈东梅，
        这是我们给他设定的任务流：
        1. 获取到你将要购买车险的车牌号码，并确认无误。
        2. 通过谈话获取到你的将要购买保险的险种，顺便告诉你近期的优惠活动，礼品赠送等，这一步我们设定了尽量给你推销驾乘险（公司有任务驾乘险必须推）。
        3. 收集到所有的信息后然后自动给你发送整理好的资料到你的邮箱。
        `,
        icon: "UserOutlined",
        keyPoint: "设想一下，保险销售人员每次和客户聊的内容很雷同，客户问的问题也差不多，有他去向客户收集信息，给客户解答疑问，你不就轻松了吗"
        }
    ]

</script>