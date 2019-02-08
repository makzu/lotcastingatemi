// https://github.com/rails/webpacker/blob/master/docs/webpack.md
const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

const typescript = require('./loaders/typescript')

environment.plugins.prepend(
  'HashedModuleIds',
  new webpack.HashedModuleIdsPlugin()
)

environment.resolvedModules.append('vendor', 'vendor')

environment.splitChunks(() => ({
  optimization: {
    splitChunks: {
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 3000,
      cacheGroups: {
        react: {
          name: 'react',
          test: /\/node_modules\/(react|react-dom)\//,
        },
      },
    },
  },
}))

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
