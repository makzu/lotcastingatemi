// Note: You must restart bin/webpack-dev-server for changes to take effect
const webpack = require('webpack')
const merge = require('webpack-merge')
const sharedConfig = require('./shared.js')
const { publicPath } = require('./configuration.js')

module.exports = merge(sharedConfig, {
  devtool: 'sourcemap',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true,
    publicPath
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NamedModulesPlugin(),
  ],
})
