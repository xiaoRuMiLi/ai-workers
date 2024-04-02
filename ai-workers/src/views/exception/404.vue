<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-04-02 22:53:15
-->
<template>
    <div class="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <router-link to="/">Return to Home</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router';
  
  const goHome = () => {
    window.history.length > 1
      ? window.history.back()
      : window.location.replace('/');
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding-top: 50px;
    font-size: 1.5em;
  }
  
  .not-found h1 {
    font-size: 3em;
    color: #f44336;
  }
  
  .not-found p {
    color: #333;
    margin-bottom: 20px;
  }
  
  .not-found a {
    display: inline-block;
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .not-found a:hover {
    background-color: #d32f2f;
  }
  </style>