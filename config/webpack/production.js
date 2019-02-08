const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

environment.plugins.prepend(
  'HashedModuleIds',
  new webpack.HashedModuleIdsPlugin()
)

module.exports = environment.toWebpackConfig()
