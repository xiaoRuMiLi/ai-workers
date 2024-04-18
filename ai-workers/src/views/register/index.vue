<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-06 20:42:37
-->
<template>
    
    <n-card size="large" class="login-card">
        <n-form ref="formRef" size="large" :model="form" :rules="rules" label-width="120px">
            <n-form-item size="large" label="电话号码" path="phone">
                <n-input v-model:value="form.phone" size="large" :style="inputStyle" placeholder="请输入电话号码" />
            </n-form-item>
            <n-form-item size="large" label="密码" path="password">
                <n-input v-model:value="form.password" size="large" :style="inputStyle" type="password" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item size="large" label="重复密码" path="password_confirmation">
                <n-input v-model:value="form.password_confirmation" size="large" :style="inputStyle" type="password" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item v-if="showVerifycode">
                <div class="verifyCode" :style="inputStyle">
                    <n-input v-model:value="form.verification_code" size="large"  placeholder="请输入验证码" />
                    <div class="btn">
                        <n-button :disabled="second > 0" type="tertiary" @click="handleVerifyCode" >{{secondOrAgain}}</n-button>
                    </div>
                </div>
            </n-form-item>
            <n-form-item>
                <n-button type="primary" :loading="loading"  @click="handleRegister">提交注册</n-button>
            </n-form-item>
            <n-alert v-if="error" type="error" show-icon>{{ error }}</n-alert>
        </n-form>
        <n-space>
            <n-checkbox v-model:checked="disabled" style="margin-right: 12px">
                同意
            </n-checkbox>
            <span>
                我已阅读并同意<a disa href="" @click="toServiceStatement">服务条款</a>和<a href="" @click="toPrivacyStatement">隐私声明</a>
            </span>
        </n-space>
    </n-card>

    
    
  </template>
  
<script setup lang="ts">
    import { ref, reactive, computed } from 'vue';
    import { NCard, NForm, NFormItem, NInput, NButton, NAlert, useMessage, FormItemRule, NSpace, NCheckbox,  FormInst, FormRules } from 'naive-ui';
    import { useUserStoreInstance  } from '@/store/modules/user';
    import { useRouter, useRoute } from 'vue-router';
    import { ResultEnum } from '@/enums/httpEnum';
    import { PageEnum } from '@/enums/pageEnum';
    import { getPhoneVerifyCode } from "@/api/system/verify";
    const inputStyle = {
        minWidth: '30VW'
    }
    const userStore = useUserStoreInstance();
    // 定义表单数据
    const form = reactive({
        phone: '',
        password: '',
        password_confirmation: "",
        verification_key: "",
        verification_code: ""
    });

    // form对象
    const formRef = ref<FormInst | null>(null);
    // 表单验证是否通过
    const formValid = ref(false);
    // 验证码读秒
    const second = ref(0);
    // 显示验证码
    const showVerifycode = ref(false);
    // 是否选择同意服务条款
    const disabled = ref(false);
    const message = useMessage();
    // 定义当前组件的状态
    const loading = ref(false);
    const error = ref('');
    const router = useRouter();
    const route = useRoute();
    const REGISTER_NAME = PageEnum.BASE_REGISTER_NAME;

    const secondOrAgain = computed(() => {
        if (second.value == 0 )
        {
            return "重新发送";
        }
        return second;
    })

    const useSetInteval = (secondRef: Ref<number>, num: number) => {
        secondRef.value = num
        const interval = setInterval(() => {
            secondRef.value -- ;
            if (secondRef.value == 0) clearInterval(interval);
        }, 1000);
    }
    
    const toServiceStatement = (e: Event) => {
        e.preventDefault();
        router.push({name: "Service"});
    }
    
    const toPrivacyStatement = (e: Event) => {
        e.preventDefault();
        router.push({name: "Privacy"});
    }

    // 定义表单验证规则
    const rules = {
        
        password: {
            required: true,
            validator (rule: FormItemRule, value: string)
            {
                if (!value) {
                    return new Error('需要输入密码');
                }
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(value)) 
                {  
                    return new Error("至少6个字符，包含至少1个大写1个小写和1个数字");
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
        },
        verification_code: {
            required: true,
            message: "输入验证码",
            trigger: ['input', 'blur']
        }
    };
    
    const getVerifyCode = async () =>
    {
        message.loading('提交中...');
        loading.value = true;
        const params = {phone: form.phone};
        try {
            const {code, data} = await getPhoneVerifyCode(params);
            //message.destroyAll();
            if (code == ResultEnum.SUCCESS){
                useSetInteval(second, 300);
                form.verification_key = data.verification_key;
            }
        } finally {
            loading.value = false;
        }
    }
    //点击发送验证码
    const handleVerifyCode = () => {
        getVerifyCode();
    }

    // 表单验证 

    const validate = async () => {
        if (formRef.value) {
            const {warnings} = await formRef.value.validate();
            if (!warnings)
            {
                return true
            }
        }
        return false;
    }
    // 定义登录方法
    const handleRegister = async () => {

        // 先验证表单
        try {
            formValid.value = await validate();
        } catch (err) {
           return message.info("没有正确输入内容，请先正确输入内容");
        }
        // 是否勾选许可协议
        if (disabled.value == false)
        {
            return message.info("请先同意许可协议");
        }
        // 如果验证电话号码没有show，先显示
        if (!showVerifycode.value)
        {
            showVerifycode.value = true;
            getVerifyCode();
            return;
        }
        if (!form.verification_code || !form.verification_key) {
            message.info("没有输入验证码");
            return ;
        }

        message.loading('提交中...');
        loading.value = true;
        try {
            const { code, message: msg } = await userStore.register(form);
            message.destroyAll();
            console.log("register:::::", code, message);
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
.verifyCode {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn {
        margin-left: 10px;
    }
}
</style>