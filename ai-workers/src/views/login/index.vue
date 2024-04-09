<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-06 20:42:37
-->
<template>
    <n-card class="login-card">
      <n-form ref="loginForm" :model="form" :rules="rules" label-width="120px">
        <n-form-item label="电话号码" path="phone">
          <n-input v-model:value="form.phone" placeholder="请输入电话号码" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="form.password" type="password" placeholder="请输入密码" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="handleLogin" :loading="loading">登录</n-button>
        </n-form-item>
        <n-alert v-if="error" type="error" show-icon>{{ error }}</n-alert>
      </n-form>
    </n-card>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { NCard, NForm, NFormItem, NInput, NButton, NAlert } from 'naive-ui';
  import { useUserStoreInstance  } from '@/store/modules/user';
  import { useRouter } from 'vue-router';
  
  const userStore = useUserStoreInstance();
  // 定义表单数据
  const form = reactive({
    phone: '',
    password: '',
  });
  
  // 定义表单验证规则
  const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };
  
  // 定义当前组件的状态
  const loading = ref(false);
  const error = ref('');
  
  // 定义登录方法
  const handleLogin = async () => {
    
    const data = await userStore.login(form);
    console.log(data);
    
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
    max-width: 400px;
    margin: 50px auto;
  }
  </style>