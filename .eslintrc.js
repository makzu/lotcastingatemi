/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:@eslint-community/eslint-comments/recommended',
  ],
  ignorePatterns: [
    'postcss.config.js',
    'config/**/*.js',
    'coverage/**/*.js',
    'flow-typed/**/*.js',
    'public/**/*.js',
  ],
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-undef': 'error',
      },
    },
    { files: ['.eslintrc.js'], rules: {} },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'cypress', 'react', 'flowtype'],
  root: true,
  rules: {
    '@eslint-community/eslint-comments/no-unused-disable': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'flowtype/no-types-missing-file-annotation': 0,
    'no-duplicate-imports': ['warn'],
    'no-restricted-imports': ['error', { patterns: ['@mui/*/*/*'] }],
    quotes: [
      'warn',
      'single',
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    flowtype: { onlyFilesWithFlowAnnotation: true },
    react: { version: 'detect' },
  },
}

// eslint-disable-next-line no-undef
module.exports = config
