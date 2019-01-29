const { environment } = require('@rails/webpacker')
const typescript = require('./loaders/typescript')

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
environment.plugins.prepend(
  'LodashModuleReplacement',
  new LodashModuleReplacementPlugin({ cloning: true })
)

environment.loaders.append('md', {
  test: /\.md$/,
  use: 'raw-loader',
})

const path = require('path')
environment.config.merge({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      Docs: path.resolve(__dirname, '../../docs'),
    },
  },
})

environment.loaders.prepend('typescript', typescript)

// eslint-disable-next-line no-undef
module.exports = environment
