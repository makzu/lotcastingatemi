process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

environment.config.merge({
  optimization: {
    splitChunks: {
      name: true,
    },
  },
})

module.exports = environment.toWebpackConfig()
