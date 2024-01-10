/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:flowtype/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['cypress', 'react', 'flowtype', '@typescript-eslint'],
  rules: {
    'no-duplicate-imports': ['warn'],
    'flowtype/no-types-missing-file-annotation': 0,
    'react/jsx-boolean-value': ['warn', 'never'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['coverage/**/*.js', 'flow-typed/**/*.js', 'public/**/*.js'],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
    react: {
      version: 'detect',
    },
  },
}
