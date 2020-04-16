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
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');
    webpackProdConfig.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
        ),
        threshold: 10240,
        minRatio: 0.8,
        filename: '[path].gz[query]'
    }))
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 8889
  })) 
}
module.exports = webpackProdConfig