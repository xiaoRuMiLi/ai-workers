<!--
 * @Description: 
 * @Author: lyq
 * @Date: 2024-05-08 17:19:51
 * @LastEditTime: 2024-05-09 19:28:34
 * @LastEditors: Please set LastEditors
-->
<template>
    <n-card
    embedded
    :bordered="false"
    >
        <n-descriptions label-placement="left" title="个人信息">
            <n-descriptions-item>
            <template #label>
                用户名
            </template>
            {{ name }}
            </n-descriptions-item>

            <n-descriptions-item>
                <template #label>
                    电话
                </template>
                {{ phone }}
            </n-descriptions-item>
            
            <n-descriptions-item label="邮箱">
            {{ email }}
            </n-descriptions-item>

            <n-descriptions-item label="剩余可使用token">
            {{ llmTokens }}
            </n-descriptions-item>
            
        </n-descriptions>
    </n-card>

</template>
<script lang="ts" setup>
import { NDescriptions, NDescriptionsItem, NCard } from "naive-ui";
import { useUserStoreInstance  } from '@/store/modules/user';
import { onMounted, ref } from "vue";
const userStore = useUserStoreInstance();
const phone = ref("");
const email = ref("");
const llmTokens = ref(0);
const name = ref("");
onMounted(async () => {
    const info = await userStore.getInfo();
    console.log(info);
    phone.value = info.phone;
    email.value = info.email;
    llmTokens.value = info.llm_tokens;
    name.value = info.name;
    
   
   
})






</script>