module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "warn",
      "single",
      { "allowTemplateLiterals": true }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    "jsx-quotes": [
      "warn",
      "prefer-double"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};
