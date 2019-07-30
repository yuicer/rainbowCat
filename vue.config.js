module.exports = {
  publicPath: '/rainbowCat/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .tap(() => {
        return {
          limit: 1
        }
      })
  }
}
