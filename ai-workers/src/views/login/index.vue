<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-06 20:42:37
-->
<template>
    <n-card class="login-card">
      <n-form ref="loginForm" :model="form" :rules="rules" label-width="120px">
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="form.username" placeholder="请输入用户名" />
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
  import { useRouter } from 'vue-router';
  
  // 定义表单数据
  const form = reactive({
    username: '',
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
    try {
      loading.value = true;
      // 这里应该调用API进行登录验证，以下代码仅为示例
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        // 登录成功，导航到主页或其他页面
        useRouter().push('/dashboard');
      } else {
        // 登录失败，显示错误信息
        error.value = data.message || '登录失败';
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      error.value = '登录请求失败';
    } finally {
      loading.value = false;
    }
  };
  
  // 定义表单重置方法
  const resetForm = () => {
    form.username = '';
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