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
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['cypress', 'react', '@typescript-eslint'],
  rules: {
    'no-duplicate-imports': ['warn'],
    'react/jsx-boolean-value': ['warn', 'never'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['coverage/**/*.js', 'public/**/*.js'],
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
