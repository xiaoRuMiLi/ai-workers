<template>
    <!-- 定义一个布局组件，通常包含头部、侧边栏、主内容区和底部 -->
    <div class="layout-container">
        <!-- 头部区域 -->
        <header v-if="!hiddenHead" class="layout-header">  
            <div class="layout-header-right">
                <div
                  class="layout-header-trigger layout-header-trigger-min"
                  v-for="item in iconList"
                  :key="item.icon.name"
                >
                  <n-tooltip placement="bottom">
                    <template #trigger>
                      <n-icon size="18">
                        <component :is="item.icon" v-on="item.eventObject || {}" />
                      </n-icon>
                    </template>
                    <span>{{ item.tips }}</span>
                  </n-tooltip>
                </div>
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
                         username 
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
                    <span>项目配置</span>
                  </n-tooltip>
                </div>
              </div>
        </header>
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
        <footer v-if="!hidddenFoot" class="layout-footer">Footer Area</footer>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, computed, unref } from 'vue';
  import { NTooltip, NIcon, NDropdown, NAvatar } from 'naive-ui';
  import { useUserStoreInstance } from '@/store/modules/user';
  import { useProjectSettingStoreInstance } from "@/store/modules/projectSetting";
  
    
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
            NAvatar
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
                default: true,
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
            const { getNavMode, getNavTheme, getHeaderSetting, getMenuSetting, getCrumbsSetting } =
            useProjectSettingStoreInstance();
            const userStore = useUserStoreInstance();
            const { name } = userStore?.info || {};
            const state = reactive({
                username: name || '',
                fullscreenIcon: 'FullscreenOutlined',
                navMode: getNavMode,
                navTheme: getNavTheme,
                headerSetting: getHeaderSetting,
                crumbsSetting: getCrumbsSetting,
            });
            /**
             * setup 函数是 Composition API 的入口
             * 在这里可以使用响应式数据、计算属性、方法等
             */
            const { customProp } = props;
            
            const iconList = ref(
                [
                {tips: "tips", icon: {name: "name"}, eventObject: () => {}}
            ]);
        
            /**
             * 一个示例方法
             */
            const exampleMethod = () => {
                console.log('This is an example method:', customProp);
            };
        
            // 返回给模板使用的所有响应式数据和方法
            return {
                exampleMethod,
                iconList,
                ...toRefs(state)
                
            };
        }
    });
</script>
  
<style lang="less" scoped>
    /* 为布局组件添加一些基本的样式 */
    .layout-container {
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        display: flex;
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
    
        &-left {
          display: flex;
          align-items: center;
    
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 64px;
            line-height: 64px;
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
          display: flex;
          align-items: center;
          margin-right: 20px;
    
          .avatar {
            display: flex;
            align-items: center;
            height: 64px;
          }
    
          > * {
            cursor: pointer;
          }
        }
    
        &-trigger {
          display: inline-block;
          width: 64px;
          height: 64px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
    
          .n-icon {
            display: flex;
            align-items: center;
            height: 64px;
            line-height: 64px;
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
        padding: 1rem;
        background-color: #f0f0f0;
        text-align: center;
        bottom: 0;
    }
    .layout-middle {
        flex-grow: 1;
        display: flex;
        
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

</style>








































































