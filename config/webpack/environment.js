const { environment } = require('@rails/webpacker')

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
environment.plugins.prepend(
  'LodashModuleReplacement',
  new LodashModuleReplacementPlugin({ cloning: true })
)

environment.loaders.append('md', {
  test: /\.md$/,
  use: 'raw-loader',
})

module.exports = environment
