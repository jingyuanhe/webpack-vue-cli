'use strict'
const path = require('path');
const utils = require('./utils');
const merge = require('webpack-merge');
const config = require('../config');
const webpackBaseConfig = require('./webpack.base');
const env = require('../config/prod.env')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //js压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css抽离
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const webpackProdConfig = merge(webpackBaseConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    mode:env.NODE_ENV,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 比如你要单独把jq之类的官方库文件打包到一起，就可以使用这个缓存组，如想具体到库文件（jq）为例，就可把test写到具体目录下
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    priority: 10,
                    enforce: true
                },
                // 这里定义的是在分离前被引用过两次的文件，将其一同打包到common.js中，最小为30K
                common: {
                    name: "common",
                    minChunks: 2,
                    minSize: 30000
                }

            },
            chunks: "all",
            minSize: 40000
        }
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {  // 压缩
                   
                },
                warnings: false
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true // 并行
        }),
        // 将CSS提取为独立的文件
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
        }),
        // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index, // 将HTML写入的文件。默认为index.html。您可以在这里指定一个子目录
            template: 'index.html',
            inject: true,  // 所有javascript资源都将放置在body元素的底部
            minify: {
                removeComments: true,  // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                removeAttributeQuotes: true // 移除属性的引号
                // more options:
                // https://www.jianshu.com/p/08a60756ffda
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // 预编译功能
        new webpack.optimize.ModuleConcatenationPlugin(),
        // // 如果该模块是js文件并且在node_modules中，就会加入到vendor当中
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks(module) {
        //         // any required modules inside node_modules are extracted to vendor
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     }
        // }),
        // // 只有当入口文件（entry chunks） >= 3 才生效，用来在第三方库中分离自定义的公共模块
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks: Infinity
        // }),
        // // This instance extracts shared chunks from code splitted chunks and bundles them
        // // in a separate chunk, similar to the vendor chunk
        // // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        // // https://segmentfault.com/a/1190000012828879?utm_source=tag-newest
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'app',
        //     async: 'vendor-async', // async设为true时，commons chunk 将不会合并到自身，而是使用一个新的异步的commons chunk
        //     children: true, // 指定为true的时候，就代表source chunks是通过entry chunks（入口文件）进行code split出来的children chunks
        //     minChunks: 3
        // }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                //from: path.resolve(__dirname, '../static'),
                from: path.resolve(__dirname, '../src/assets'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        //build progress
        new SimpleProgressWebpackPlugin()
    ]
})
module.exports = webpackProdConfig