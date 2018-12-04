const { environment } = require('@rails/webpacker')

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
environment.plugins.prepend(
  'LodashModuleReplacement',
  new LodashModuleReplacementPlugin()
)

module.exports = environment
