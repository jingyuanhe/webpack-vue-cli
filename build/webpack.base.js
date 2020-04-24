'use strict'
const path = require('path');
const config= require('../config');
const utils = require('./utils');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = dir => path.join(__dirname, '..', dir)
const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
}) 
module.exports = {
    context: path.resolve(__dirname, '../'), //入口文件所处目录的绝对路径
    entry: {
        main: './src/main.js'
    },
    
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: './'
    },
    resolve: {
        // 自动解析确定的扩展
        extensions: ['.js', '.json', '.vue'],
        //诉 webpack 解析模块时应该搜索的目录
        modules: [resolve('src'),resolve('node_modules')],
        // 创建 import 或 require 的别名，来确保模块引入变得更简单。
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  esModule: false,
                  limit: 1000,
                  name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  esModule: false,
                  limit: 10000,
                  name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  esModule: false,
                  limit: 10000,
                  name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
              }
        ]
    },
    // 以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中 
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ]
}