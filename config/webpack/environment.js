// https://github.com/rails/webpacker/blob/master/docs/webpack.md
const { environment } = require('@rails/webpacker')

const typescript = require('./loaders/typescript')

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

environment.loaders.append('i18n', {
  test: /locales/i,
  use: {
    loader: '@alienfast/i18next-loader',
    options: { basenameAsNamespace: true },
  },
})

const path = require('path')
environment.config.merge({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      Docs: path.resolve(__dirname, '../../docs'),
      // eslint-disable-next-line no-undef
      Locales: path.resolve(__dirname, '../../locales'),
      'redux-api-middleware': 'redux-api-middleware/es',
    },
  },
})

environment.loaders.prepend('typescript', typescript)

// eslint-disable-next-line no-undef
module.exports = environment
