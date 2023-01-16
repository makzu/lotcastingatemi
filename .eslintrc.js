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
    indent: ['error', 2, { SwitchCase: 1 }],
    'flowtype/no-types-missing-file-annotation': 0,
    'jsx-quotes': ['warn', 'prefer-double'],
    'linebreak-style': ['error', 'unix'],
    'no-duplicate-imports': ['warn'],
    'no-trailing-spaces': ['error'],
    'no-restricted-imports': ['error', { patterns: ['@mui/*/*/*'] }],
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'never'],
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    flowtype: { onlyFilesWithFlowAnnotation: true },
    react: { version: 'detect' },
  },
}
