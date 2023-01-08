const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

environment.plugins.prepend('NamedModules', new webpack.NamedModulesPlugin())

environment.config.merge({
  optimization: {
    splitChunks: {
      name: true,
    },
  },
  // resolve: {
  //   alias: {
  //     'react-dom': '@hot-loader/react-dom',
  //   },
  // },
})

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

environment.plugins.append('fork-ts-checker', new ForkTsCheckerWebpackPlugin())

module.exports = environment.toWebpackConfig()
