<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-06 20:42:37
-->
<template>
    <div class="login-wrapper">
    
        <n-card size="large" class="login-card">
        <n-form ref="loginForm" size="large" :model="form" :rules="rules" label-width="120px">
            <n-form-item size="large" label="电话号码" path="phone">
                <n-input v-model:value="form.phone" size="large" :style="inputStyle" placeholder="请输入电话号码" />
            </n-form-item>
            <n-form-item size="large" label="密码" path="password">
                <n-input v-model:value="form.password" size="large" :style="inputStyle" type="password" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item>
                <div class="btns">
                    <n-button type="primary" @click="handleLogin" :loading="loading">登录</n-button>
                    <n-button type="primary" @click="handleRegister" :loading="loading">注册账号</n-button>
                </div>
            </n-form-item>
            <n-alert v-if="error" type="error" show-icon>{{ error }}</n-alert>
        </n-form>
        </n-card>
    
    </div>
  </template>
  
<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import { NCard, NForm, NFormItem, NInput, NButton, NAlert, useMessage, FormItemRule } from 'naive-ui';
    import { useUserStoreInstance  } from '@/store/modules/user';
    import { useRouter, useRoute } from 'vue-router';
    import { ResultEnum } from '@/enums/httpEnum';
    import { PageEnum } from '@/enums/pageEnum';

    const inputStyle = {
        minWidth: '30VW'
    }
    const userStore = useUserStoreInstance();
    // 定义表单数据
    const form = reactive({
        phone: '',
        password: '',
    });

    // 定义表单验证规则
    const rules = {
        
        password: {
            required: true,
            validator (rule: FormItemRule, value: string)
            {
                if (!value) {
                    return new Error('需要输入密码');
                }
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)) 
                {  
                    return new Error("密码至少8-16个，至少1个大写字母1个小写字母和1个数字");
                }
                return true;    
            },
            trigger: ['input', 'blur']
        },
        phone: {
            required: true,
            validator (rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('需要输入电话号码');
                }
                if (!/^1[2-9][0-9]{9}$/.test(value)) 
                {  
                    return new Error("请输入正确的电话号码");
                }
                return true;     
            },
            trigger: ['input']
        }
    };
    const message = useMessage();
    // 定义当前组件的状态
    const loading = ref(false);
    const error = ref('');
    const router = useRouter();
    const route = useRoute();
    const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

    // 定义登录方法
    const handleLogin = async () => {
        message.loading('登录中...');
        loading.value = true;

        try {
            const { code, message: msg } = await userStore.login(form);
            message.destroyAll();
            console.log(code, message);
            if (code == ResultEnum.SUCCESS) {
                const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
                message.success('登录成功，即将进入首页');
                resetForm();
                if (route.name === LOGIN_NAME) {
                    router.replace('/');
                } else router.replace(toPath);
            } else {
                message.info(msg || '登录失败');
            }
            
        } finally {
           loading.value = false;
        }
        

    };

    const handleRegister = () => {
        router.push({name: "Register"});
    }

    // 定义表单重置方法
    const resetForm = () => {
        form.phone = '';
        form.password = '';
        error.value = '';
    };
</script>
  
<style scoped>
.login-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
}
.login-card {
    max-width: 1000px;
    margin: 50px auto;
}
.btns {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>