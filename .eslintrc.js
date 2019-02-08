module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['cypress', 'react', 'flowtype', 'prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-trailing-spaces': ['error'],
    'no-duplicate-imports': ['warn'],
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'object-curly-spacing': ['error', 'always'],
    'jsx-quotes': ['warn', 'prefer-double'],
    semi: ['error', 'never'],
    'react/jsx-boolean-value': ['warn', 'never'],
  },
}
