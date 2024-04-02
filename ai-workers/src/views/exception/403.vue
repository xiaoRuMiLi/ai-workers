<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-02 22:54:14
-->

以下是一个使用 Vue 3 和 TypeScript 的 setup 语法编写的简单的 403 错误提示组件的示例：

<template>
  <div class="forbidden">
    <h1>403</h1>
    <p>Access denied</p>
    <button @click="goHome">Return to Home</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const goHome = () => {
  window.history.length > 1
    ? window.history.back()
    : window.location.replace('/');
};

const isClicked = ref(false);
const handleClick = () => {
  if (!isClicked.value) {
    goHome();
    isClicked.value = true;
  }
};
</script>

<style scoped>
.forbidden {
  text-align: center;
  padding-top: 50px;
  font-size: 1.5em;
}

.forbidden h1 {
  font-size: 3em;
  color: #f44336;
}

.forbidden p {
  color: #333;
  margin-bottom: 20px;
}

.forbidden button {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.forbidden button:hover {
  background-color: #d32f2f;
}
</style>