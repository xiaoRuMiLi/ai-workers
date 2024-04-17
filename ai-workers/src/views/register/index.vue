<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-06 20:42:37
-->
<template>
    
    <n-card size="large" class="login-card">
        <n-form ref="loginForm" size="large" :model="form" :rules="rules" label-width="120px">
            <n-form-item size="large" label="电话号码" path="phone">
                <n-input v-model:value="form.phone" size="large" :style="inputStyle" placeholder="请输入电话号码" />
            </n-form-item>
            <n-form-item size="large" label="密码" path="password">
                <n-input v-model:value="form.password" size="large" :style="inputStyle" type="password" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item size="large" label="重复密码" path="password_confirmation">
                <n-input v-model:value="form.password" size="large" :style="inputStyle" type="password" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item>
                <n-button type="primary" @click="handleRegister" :loading="loading">提交注册</n-button>
            </n-form-item>
            <n-alert v-if="error" type="error" show-icon>{{ error }}</n-alert>
        </n-form>
        <n-space>
            <n-checkbox v-model:checked="disabled2" style="margin-right: 12px">
                同意
            </n-checkbox>
            <span>
                我已阅读并同意<a href="">服务条款</a>和<a href="">隐私声明</a>
            </span>
        </n-space>
    </n-card>

    
    
  </template>
  
<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import { NCard, NForm, NFormItem, NInput, NButton, NAlert, useMessage, FormItemRule, NSpace, NCheckbox } from 'naive-ui';
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
        password_confirmation: ""

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
        },
        password_confirmation: {
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
                if (value !== form.password)
                {
                    return  new  Error("重复密码和密码不相同");
                }
                return true;    
            },
            trigger: ['input', 'blur']
        }
    };
    const message = useMessage();
    // 定义当前组件的状态
    const loading = ref(false);
    const error = ref('');
    const router = useRouter();
    const route = useRoute();
    const REGISTER_NAME = PageEnum.BASE_REGISTER_NAME;

    // 定义登录方法
    const handleRegister = async () => {
        message.loading('提交中...');
        loading.value = true;

        try {
            const { code, message: msg } = await userStore.login(form);
            message.destroyAll();
            console.log(code, message);
            if (code == ResultEnum.SUCCESS) {
                const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
                message.success('注册成功，即将进入首页');
                resetForm();
                if (route.name === REGISTER_NAME) {
                    router.replace('/');
                } else router.replace(toPath);
            } else {
                message.info(msg || '注册失败');
            }
            
        } finally {
           loading.value = false;
        }
        

    };

    // 定义表单重置方法
    const resetForm = () => {
        form.phone = '';
        form.password = '';
        error.value = '';
    };
</script>
  
<style scoped>
.login-card {
    max-width: 1000px;
    margin: 50px auto;
}
</style>