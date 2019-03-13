const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
  test: /\.(ts|tsx)?(\.erb)?$/,
  use: [
    {
      loader: 'babel-loader',
      options: PnpWebpackPlugin.tsLoaderOptions(),
    },
  ],
}
