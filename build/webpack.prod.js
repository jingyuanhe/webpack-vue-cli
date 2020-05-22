'use strict'
const path = require('path');
const glob = require("glob")
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
const PurgecssPlugin = require('purgecss-webpack-plugin'); // 擦除无用的 CSS
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); //打包速度分析
const smp = new SpeedMeasurePlugin();
const PATHS = {
    src: path.join(__dirname, './src')
};
const webpackProdConfig = smp.wrap(merge(webpackBaseConfig, {
    module: {
        // rules: utils.styleLoaders({
        //     sourceMap: config.build.productionSourceMap,
        //     extract: true,
        //     minimize:true,
        //     usePostCSS: true
        // })
        rules: [
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ],
            }
          ]
    },
    // 性能检测
    performance: {
        maxEntrypointSize: 1000000,
        maxAssetSize: 200000,
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },
    mode:'production',
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
                    enforce: true,
                    minChunks:1
                },
                consoleVendor: {
                    test: /vconsole/,
                    priority: 20,
                    chunks: 'all',
                    name: 'consoleVendor'
                },
                // 这里定义的是在分离前被引用过两次的文件，将其一同打包到common.js中，最小为30K
                common: {
                    name: "common",
                    minChunks: 2,
                },
            },
            chunks: "all"
        },
        minimizer: [
            new OptimizeCSSPlugin()
          ]
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
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
        // new CopyWebpackPlugin([
        //     {
        //         //from: path.resolve(__dirname, '../static'),
        //         from: path.resolve(__dirname, '../src/assets'),
        //         to: config.build.assetsSubDirectory,
        //         ignore: ['.*']
        //     }
        // ]),
        //build progress
        new SimpleProgressWebpackPlugin()
    ]
}))
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
if (config.build.distZip) {
    const FileManagerPlugin = require('filemanager-webpack-plugin'); //压缩成zip
    webpackProdConfig.plugins.push(new FileManagerPlugin({
        onEnd: {
            delete: [
                './www.zip',
            ],
            archive: [
                {source: './dist', destination: './www.zip'},
            ]
        }
    }))
}
module.exports = webpackProdConfig