// https://github.com/rails/webpacker/blob/master/docs/webpack.md
const { environment } = require('@rails/webpacker')

environment.resolvedModules.append('vendor', 'vendor')
const splitChunks = {
  output: {
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
}
environment.config.merge(splitChunks)

const WebpackAssetsManifest = require('webpack-assets-manifest')
environment.plugins.insert(
  'Manifest',
  new WebpackAssetsManifest({
    entrypoints: true,
    writeToDisk: true,
    publicPath: true,
  })
)

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

// eslint-disable-next-line no-undef
module.exports = environment
