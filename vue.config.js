module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/accounts': {
        target: 'http://127.0.0.1:8000',
      }
    }
  },
  lintOnSave: false
}
