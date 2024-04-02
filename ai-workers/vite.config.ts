/*
 * @Description: 
 * @Author: lyq
 * @Date: 2024-04-01 11:39:43
 * @LastEditTime: 2024-04-02 11:38:30
 * @LastEditors: lyq
 */

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig(({command, mode}) => {
    // 获取当前环境的配置,就是.env.devalopment 里面的值,或.envproduction里面的值,
    const config = loadEnv(mode, './');
    return {
        mode: 'development',
        plugins: [
            vue(),
        ],
        resolve: {
            // 配置路径别名
            alias: {
                // 键必须以斜线开始和结束，配置后可以引用文件时使用@/代表src目录
                //'/@/': path.resolve(__dirname, './src')
                // '/@components/': path.resolve(__dirname, './src/components')
                '@': path.resolve(__dirname, './src'),
                // '@components': path.resolve(__dirname, './src/components')
                '@static': path.resolve(__dirname, './public/static')
            },
            // 省略后缀配置
            // extensions: ['','.js','.json','.vue','.less','.scss','.css']

        },
        server: {
            // 本地运行配置，及反向代理配置
            open: true,// 是否自动在浏览器打开
            https: false,// 是否开启 https
            ssr: false,// 服务端渲染
            hot: true,
            outDir: 'target',
            host: "127.0.0.1",
            port: 3000,
            proxy: {
                // 这三种跨域设置都是可以的
                '/laravel': {
                    // 使用配置文件的值
                    target: config.VITE_BASIC_API,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/laravel/, '')
                },
                /*
                '^/laravel': {
                    target: 'http://127.0.0.1:8000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/laravel/, '')
                },
                */
                /*'/laravel': {
                    target: 'http://127.0.0.1:8000',
                    changeOrigin: true,
                    configure: (proxy, options) => {
                    // proxy 是 'http-proxy' 的实例
                    },
                },*/
                '//car3.autoimg.cn': "https://car3.autoimg.cn",
            }
        },
        // 禁用或配置hmr 连接
        hmr: true,
        css: {
            preprocessorOptions: {
              less: {
                modifyVars: {},
                javascriptEnabled: true,
                additionalData: `@import "src/styles/var.less";`,
              },
            }
        },
        
        base: config.VITE_BASE, // 静态资源路由前缀,不配置这个会显示 https://manager.weixiubang.club/assets/index.af39c231.js net::ERR_ABORTED 404,出现空白页
        //静态资源服务的文件夹
        publicDir: "public",
        //静态资源处理
        assetsInclude: "",
        //打包配置
        build: {
            outDir: 'dist', // 构建得包名  默认：dist
            assetsDir: 'assets', // 静态资源得存放路径文件名  assets 和outDir同级 默认assets
            sourcemap: false, //构建后是否生成 source map 文件
            brotliSize: false, // 启用/禁用 brotli 压缩大小报告。 禁用该功能可能会提高大型项目的构建性能
            minify: 'esbuild', // 项目压缩 :boolean | 'terser' | 'esbuild'
            chunkSizeWarningLimit: 1000, //chunk 大小警告的限制（以 kbs 为单位）默认：500
            cssTarget: 'chrome61', //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式  (要兼容的场景是安卓微信中的 webview 时,它不支持 CSS 中的 #RGBA 十六进制颜色符号)
            assetsSubDirectory: 'static',
            assetsPublicPath: './'
        },
  
    }
})