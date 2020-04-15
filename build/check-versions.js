'use strict'
const chalk = require('chalk'); // 控制台添加文字背景什么的,改变字体颜色什么的
const semver = require('semver'); // 比较版本
const packageConfig = require('../package.json');
const shell = require('shelljs'); // 自动化部署

//创建子进程
function exec (cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}
const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version), // 提取版本号
        versionRequirements: packageConfig.engines.node
    }
]
if (shell.which) { // 在环境变量PATH中寻找指定命令的地址，判断该命令是否可执行，返回该命令的绝对地址
    versionRequirements.push({
        name: 'npm',
        currentVersion:exec('npm --version'),
        versionRequirements: packageConfig.engines.npm
    })
}
module.exports = function () {
    const warnings = [];
    for (let i = 0; i<versionRequirements.length; i++) {
        const mod = versionRequirements[i];
        if(!semver.satisfies(mod.currentVersion, mod.versionRequirements)) { ////如果版本号不符合package.json文件中指定的版本号，就执行下面的代码
            warnings.push(mod.name + ':'+ chalk.red(mod.currentVersion) + ' should be ' + chalk.green(mod.versionRequirements))
        }
    }
    if (warnings.length) {
        console.log('');
        console.log(chalk.yellow('To use this template, you must update following to modules:'))
        console.log()
        for (let i = 0;i <warnings.length;i++) {
            const warning = warnings[i];
            console.log(' ' + warning);
        }
        console.log();
        process.exit(1);
    }
}