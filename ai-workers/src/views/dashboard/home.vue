<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-11 21:29:10
-->
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
            @click-item="handleClickItem"
            />
        </div>
        
    </div>
</template>
<script lang="ts" setup>
    import { ref, Ref, onMounted } from "vue";
    import { BaseWorker } from "/#/worker";
    import { recommendService } from "@/api/system/aiHelper";
    import  WorkerList  from "./components/WList.vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const exampleList: Ref<BaseWorker[]> = ref([

    ])
    const getRecommendService = async ()=> {
        const {data, code } = await recommendService();
        if (code  == 200)
        {
            const recommendList = data.map( service => {
                const {id, description, group_id: groupId, icon, name, service_name: serviceName, key_point: keyPoint} = service;
                return {id, description, groupId, name, icon, serviceName, keyPoint};
            });
            exampleList.value = recommendList;
        }


        console.log(data);
    }

    const handleClickItem = (item: BaseWorker) => {
        console.log(item);
        router.push({name: "AiWorkerAction", query: {service: item.serviceName, groupid: item.groupId}});
    }

    onMounted(() => {
        getRecommendService();
    })
</script>
<style lang="less" scoped>
@import '@/styles/var.less';
.home-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content-container {
        
    }

}

</style>