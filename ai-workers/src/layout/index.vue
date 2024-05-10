<template>
    <!-- 定义一个布局组件，通常包含头部、侧边栏、主内容区和底部 -->
    <div class="layout-container">
        <!-- 头部区域 -->
        <header v-if="!hiddenHead" class="layout-header">  
            <div class="layout-header-right">
                <!--切换全屏-->
                <div class="layout-header-trigger layout-header-trigger-min">
                    <n-tooltip placement="bottom">
                        <template #trigger>
                            <n-icon size="18">
                                <component :is="fullscreenIcon" @click="toggleFullScreen" />
                            </n-icon>
                        </template>
                        <span>全屏</span>
                    </n-tooltip>
                </div>
                <!-- 个人中心 -->
                <div class="layout-header-trigger layout-header-trigger-min">
                    <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
                        <div class="avatar">
                            <n-avatar round>
                                {{username}} 
                                <template #icon>
                                    <UserOutlined />
                                </template>
                            </n-avatar>
                        </div>
                    </n-dropdown>
                </div>
                <!--设置-->
                <div class="layout-header-trigger layout-header-trigger-min" @click="openSetting">
                    <n-tooltip placement="bottom-end">
                        <template #trigger>
                            <n-icon size="18" style="font-weight: bold">
                                <SettingOutlined />
                            </n-icon>
                        </template>
                        <span @click="toSetting">项目配置</span>
                    </n-tooltip>
                </div>
              </div>
        </header>
        <div class="head-white-space">
           
        </div>
        <section class="layout-middle">
            <!-- 侧边栏区域 -->
            <aside v-if="!hiddenAside" class="layout-sidebar">
                <!-- 侧边栏内容可以根据需要进一步细分 -->
                <nav>Sidebar Content</nav>
            </aside>
            
            <!-- 主内容区域 -->
            <main class="layout-main">
                <!-- 这里放置页面主要内容 -->
                <router-view/>
            </main>
        </section>
        <!-- 底部区域 -->
        <footer v-if="!hidddenFoot" class="layout-footer"> 
            
        </footer>
        <div class="layout-chat-container">
            <!-- 店小二 功能等待细化
            <chat></chat>
            -->
        </div>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent, reactive, toRefs,  } from 'vue';
  import { NTooltip, NIcon, NDropdown, NAvatar, DropdownOption, useMessage } from 'naive-ui';
  import { useUserStoreInstance } from '@/store/modules/user';
  import { FullscreenOutlined, FullscreenExitOutlined, UserOutlined, SettingOutlined } from '@vicons/antd';
  //import Chat from "@/components/chat/index.vue";

  import { useRouter } from "vue-router";
  
  
    /**
     * Layout 组件定义了一个基本的页面布局结构
     * 包括头部、侧边栏、主内容区和底部
     */
    export default defineComponent({
        name: 'Layout',
        components: {
            NIcon,
            NTooltip,
            NDropdown,
            NAvatar,
            UserOutlined,
            SettingOutlined,
           // Chat,
        },
        props: {
            hiddenHead: {
                type: Boolean,
                default: false,
            },
            hiddenAside: {
                type: Boolean,
                default: true,
            },
            hidddenFoot: {
                type: Boolean,
                default: false,
            },
            customProp: {
                type: Object,
                default: {}
            }
        },
        /**
         * 传递给布局组件的自定义属性
         * 可以根据需要添加更多的 props
         */
        customProp: {
            type: String,
            default: 'Default Value'
        
        },
        setup(props) {
            const userStore = useUserStoreInstance();
            const router = useRouter();
            const message = useMessage();
            const { name } = userStore?.info || {};
            const state = reactive({
                username: name || '',
                fullscreenIcon: FullscreenOutlined,
            });
            /**
             * setup 函数是 Composition API 的入口
             * 在这里可以使用响应式数据、计算属性、方法等
             */
            const { customProp } = props;

            const avatarOptions = [
                {
                    label: '个人信息',
                    key: 1,
                },
                {
                    label: '退出登录',
                    key: 2,
                },
            ];

            const loginOut = () => {
                userStore.logout();
                router.push({name: "Login"});
            }

            const toSetting = () => {
                message.info("功能正在开发中");
            }
        
            /**
             * 一个示例方法
             */
            const exampleMethod = () => {
                console.log('This is an example method:', customProp);
            };

            // 切换全屏图标
            const toggleFullscreenIcon = () =>
                (state.fullscreenIcon =
                document.fullscreenElement !== null ? FullscreenExitOutlined : FullscreenOutlined);

            // 监听全屏切换事件
            document.addEventListener('fullscreenchange', toggleFullscreenIcon);

            // 全屏切换
            const toggleFullScreen = () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            };

            const avatarSelect = (key: string | number, option: DropdownOption) => {
                // 图标选择方法
                if (key == 1)
                {
                    router.push({name: "Mine"});
                }
                if (key == 2)
                {
                    loginOut();
                }
            }

            const openSetting = () => {
                // 打开设置
            }
        
            // 返回给模板使用的所有响应式数据和方法
            return {
                exampleMethod,
                toggleFullScreen,
                avatarOptions,
                avatarSelect,
                openSetting,
                toSetting,
                ...toRefs(state)
                
            };
        }
    });
</script>
  
<style lang="less" scoped>
@import "@/styles/var.less";
    /* 为布局组件添加一些基本的样式 */
    .layout-container {
        width: 100vw;
        height: 100vh;
    }
    .head-white-space {
        height: @header-height;
    }
    .layout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        height: @header-height;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        transition: all 0.2s ease-in-out;
        width: 100%;
        z-index: 11;
        position: fixed;
        background: @background-color-soft;
        top: 0;
    
        &-left {
            display: flex;
            align-items: center;
        
            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                height: @header-height;
                line-height: @header-height;
                overflow: hidden;
                white-space: nowrap;
                padding-left: 10px;
        
                img {
                width: auto;
                height: 32px;
                margin-right: 10px;
                }
        
                .title {
                margin-bottom: 0;
                }
            }
        
            ::v-deep(.ant-breadcrumb span:last-child .link-text) {
                color: #515a6e;
            }
        
            .n-breadcrumb {
                display: inline-block;
            }
        
            &-menu {
                color: var(--text-color);
            }
        }
    
        &-right {
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;
            margin-right: 20px;
        
            .avatar {
                display: flex;
                align-items: center;
                height: 100%;
            }
        
            > * {
                cursor: pointer;
            }
        }
    
            &-trigger {
                display: inline-block;
                width: @header-height;
                height: @header-height;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
            
            .n-icon {
                display: flex;
                align-items: center;
                height: @header-height;
                line-height: @header-height;
            }
        
            &:hover {
                background: hsla(0, 0%, 100%, 0.08);
            }
        
            .anticon {
                font-size: 16px;
                color: #515a6e;
            }
            }
        
            &-trigger-min {
                width: auto;
                padding: 0 12px;
            }
        }
        
        .layout-header-light {
            background: #fff;
            color: #515a6e;
        
            .n-icon {
            color: #515a6e;
            }
        
            .layout-header-left {
            ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
                color: #515a6e;
            }
            }
        
            .layout-header-trigger {
            &:hover {
                background: #f8f8f9;
            }
            }
        }
        
        .layout-header-fix {
            position: fixed;
            top: 0;
            right: 0;
            left: 200px;
            z-index: 11;
        }
        
        //::v-deep(.menu-router-link) {
        //  color: #515a6e;
        //
        //  &:hover {
        //    color: #1890ff;
        //  }
        //}
    .layout-footer {
        /* 底部样式 */
        
        text-align: center;
        bottom: 0;
    }
    .layout-middle {
       .layout-main {
            height: 92vh;
       }
    }
    
    .layout-sidebar {
       
        background-color: #e0e0e0;
    }
    
    .layout-chat-container {
        position: fixed;
        bottom: 0;
        width: 100%;
    }

</style>








































































