'use strict'
const path = require('path');
const PROXY_API = process.env.PROXY_API;
module.exports = {
    dev: {
        assetsPublicPath: '/', // 代表打包后，index.html里面引用资源的的相对地址
        assetsSubDirectory: 'static', // 除了 index.html 之外的静态资源要存放的路径
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,
        cssSourceMap: true, // 开发环境开启soureMap
        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,
        devtool: 'cheap-module-eval-source-map',
        autoOpenBrowser: true,
        notifyOnErrors: true,
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        errorOverlay: true,
        proxyTable: {
            [PROXY_API]: {
                target: "http://localhost:3000",
                pathRewrite: {[PROXY_API] : ""},
                changeOrigin: false,
                xfwd: true,
                autoRewrite: true,
            }
        },
        quiet: true, //// necessary for FriendlyErrorsPlugin
        poll: false,
        useEslint: false
    },
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: './',
        productionSourceMap: true, // 线上减小包体积，不启用soureceMap
        assetsSubDirectory: '', // 
        devtool: 'source-map',
        productionGzip: false, //压缩
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
        distZip: false // 是否自动压缩成zip
    }
}