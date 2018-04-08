module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:flowtype/recommended'],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'flowtype',
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'no-duplicate-imports': [
      'warn'
    ],
    'quotes': [
      'warn',
      'single',
      { 'allowTemplateLiterals': true }
    ],
    'object-curly-spacing': [
      'error',
      'always',
      { 'objectsInObjects': false }
    ],
    'jsx-quotes': [
      'warn',
      'prefer-double'
    ],
    'semi': [ 'error', 'never' ]
  }
}
