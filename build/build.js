'use strict'
// 检测node 与 npm 版本
require('./check-versions')();

process.env.NODE_ENV = 'production'
const ora = require('ora'); // 要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等
const rm = require('rimraf'); // 以包的形式删除文件和文件夹
const config = require('../config');
const webpack = require('webpack');
const webpackProdConfig = require('./webpack.prod');
const path = require('path');
const chalk = require('chalk'); // // 控制台添加文字背景什么的,改变字体颜色什么的
// 终端开始
const spinner = ora('building for production...');
spinner.start();
//删除dist目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackProdConfig, (err, status) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(status.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')
        if (status.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })

})