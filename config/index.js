'use strict'
const path = require('path')
module.exports = {
    dev: {
        assetsPublicPath: '/',
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
    }
}