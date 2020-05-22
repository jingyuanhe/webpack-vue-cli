const merge=require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const config = require('../config');
const webpack = require('webpack')
const utils = require('./utils');
const path = require('path');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const portfinder = require('portfinder');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const devWebpackConfig = merge(baseWebpackConfig,{
    module: {
        // rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
        rules: [
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ],
            }
          ]
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {
                    from: /\.*/,
                    to: path.posix.join(config.dev.assetsPublicPath,'index.html')
                }
            ]
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true, // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
        noInfo: true,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),  // 热模块
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(), // 确保输出资源不会包含错误
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true  // 所有javascript资源都将放置在body元素的底部
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
            //from: path.resolve(__dirname, '../static'),
            from: path.resolve(__dirname, '../src/assets'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
            }
        ])
    ]
})
module.exports = new Promise ((resolve,reject) => {
    portfinder.basePort = process.env.port || config.dev.port;
    portfinder.getPort((err,port) => {
        if (err) {
            reject(err);
        } else {
            process.env.port = port;
            devWebpackConfig.devServer.port = port;
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({ //错误提醒
                compilationSuccessInfo:{
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined  //右下角错误提示
            }))
            resolve(devWebpackConfig);
        }
    })
})