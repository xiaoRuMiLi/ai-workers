<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-02 22:57:34
-->
<template>
    <div class="error-500">
      <h1>500 Internal Server Error</h1>
      <p>Something went wrong on the server side.</p>
      <button @click="refreshPage">Refresh</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  /**
   * 刷新页面的函数
   * @returns {void} 无返回值，但会触发页面刷新
   */
  const refreshPage = (): void => {
    window.location.reload();
  };
  
  // 定义一个响应式引用，用于存储页面是否已经刷新过
  const hasRefreshed = ref(false);
  </script>
  
  <style scoped>
  .error-500 {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f8f9fa;
  }
  
  .error-500 h1 {
    color: #721c24;
    margin-bottom: 20px;
  }
  
  .error-500 p {
    color: #333;
    margin-bottom: 30px;
    font-size: 1.2rem;
  }
  
  .error-500 button {
    padding: 10px 20px;
    background-color: #721c24;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
  }
  
  .error-500 button:hover {
    background-color: #491217;
  }
  </style>