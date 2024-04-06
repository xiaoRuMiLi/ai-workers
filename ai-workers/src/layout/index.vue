<template>
    <!-- 定义一个布局组件，通常包含头部、侧边栏、主内容区和底部 -->
    <div class="layout-container">
        <!-- 头部区域 -->
        <header class="layout-header">Header Area</header>
        <section class="middle">
            <!-- 侧边栏区域 -->
            <aside class="layout-sidebar">
                <!-- 侧边栏内容可以根据需要进一步细分 -->
                <nav>Sidebar Content</nav>
            </aside>
            
            <!-- 主内容区域 -->
            <main class="layout-main">
                <!-- 这里放置页面主要内容 -->
                <slot></slot>
            </main>
        </section>
        <!-- 底部区域 -->
        <footer class="layout-footer">Footer Area</footer>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
    
    /**
     * Layout 组件定义了一个基本的页面布局结构
     * 包括头部、侧边栏、主内容区和底部
     */
    export default defineComponent({
        name: 'Layout',
        props: {
        /**
         * 传递给布局组件的自定义属性
         * 可以根据需要添加更多的 props
         */
        customProp: {
            type: String,
            default: 'Default Value'
        }
        },
        setup(props) {
        /**
         * setup 函数是 Composition API 的入口
         * 在这里可以使用响应式数据、计算属性、方法等
         */
        const { customProp } = props;
    
        /**
         * 一个示例方法
         */
        const exampleMethod = () => {
            console.log('This is an example method:', customProp);
        };
    
        // 返回给模板使用的所有响应式数据和方法
        return {
            exampleMethod
        };
    }
});
</script>
  
<style scoped>
    /* 为布局组件添加一些基本的样式 */
    .layout-container {
        display: flex;
        flex-direction: column;
    }
    
    .layout-header,
    .layout-footer {
        /* 头部和底部样式 */
        padding: 1rem;
        background-color: #f0f0f0;
        text-align: center;
    }
    
    .layout-sidebar {
        /* 侧边栏样式 */
        flex: 0 0 200px; /* 不可伸缩，宽度固定为 200px */
        background-color: #e0e0e0;
        padding: 1rem;
    }
    
    .layout-main {
        /* 主内容区样式 */
        flex: 1; /* 可伸缩，占据剩余空间 */
        padding: 1rem;
    }
    .middle {
        display: flex;
    }
</style>








































































