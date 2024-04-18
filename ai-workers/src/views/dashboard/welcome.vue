<!--
 * @Description: 首页展示
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-06 21:37:12
-->
<template>
    <section>
        <div class="content-wrapper">
            <div class="text-wrapper">
                <p>{{information}}</p>
                <n-button type="info" size="large"  round @click="handleStart"> 开始 </n-button>
            </div>
            <div class="movie-wrapper">
                <div class="image-container">

                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
const information: Ref<string>  = ref<string> ("这是一个展示大语言模型应用的网站，在人工成本高企的当下，构建一些对人们有所帮助的人工智能助理，它能为人们做些真正的事情!");

const router = useRouter();
const handleStart = () => {
    router.push({path: PageEnum.BASE_HOME__DESKTOP});
}

</script>
<style lang="less" scoped> 
    @import '@/styles/var.less';
    @base: 5px;
    .content-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        .text-wrapper {
            width: 80%;
            max-width: 800px;
            padding: @padding-sm;
            margin: auto 0;
            p {
               font-size: @font-size-xl;
               font-weight: @font-weight-sm;
               line-height: @font-size-xxl + @base + @base;
            }
        }
    }
</style>
