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
    'plugin:react/jsx-runtime',
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
  plugins: ['cypress', 'react', '@typescript-eslint', 'material-ui'],
  rules: {
    'no-duplicate-imports': ['warn'],
    'react/jsx-boolean-value': ['warn', 'never'],
    '@typescript-eslint/consistent-type-exports': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // '@typescript-eslint/no-unsafe-assignment': 'off',
    // '@typescript-eslint/no-unsafe-member-access': 'off',
    // '@typescript-eslint/no-unsafe-argument': 'off',
    // '@typescript-eslint/no-unsafe-return': 'off',
    // '@typescript-eslint/no-unsafe-call': 'off',
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
    react: {
      version: 'detect',
    },
  },
}
