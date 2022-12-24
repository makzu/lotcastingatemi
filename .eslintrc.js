// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['cypress', 'react', 'flowtype', '@typescript-eslint'],
  root: true,
  rules: {
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
    'flowtype/no-types-missing-file-annotation': 0,
    'react/jsx-boolean-value': ['warn', 'never'],
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
}
