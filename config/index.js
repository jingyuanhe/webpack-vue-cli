'use strict'
const path = require('path')
module.exports = {
    dev: {
        assetsPublicPath: '/', // 代表打包后，index.html里面引用资源的的相对地址
        assetsSubDirectory: 'static', // 除了 index.html 之外的静态资源要存放的路径
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,
        cssSourceMap: true,
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
        proxyTable: {},
        quiet: true, //// necessary for FriendlyErrorsPlugin
        poll: false
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        productionSourceMap: false,
        assetsSubDirectory: '', // 
    }
}