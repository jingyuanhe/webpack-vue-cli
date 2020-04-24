module.exports = {
    plugins: [
      require('autoprefixer')({
        browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie> 8']
      }),
      require('postcss-px-to-viewport')({
        viewportWidth: 750,     // (Number) The width of the viewport.
        unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw',     // (String) Expected units.
    //   propList:['*','!font','!font-size'],
        selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
        mediaQuery: false,       // (Boolean) Allow px to be converted in media queries.
        exclude: /(\/|\\)(node_modules)(\/|\\)/
      })
    ]
  }