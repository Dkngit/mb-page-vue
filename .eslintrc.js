module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [0],
    'indent': 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        'baseIndent': 1
      }
    ],
    "space-before-function-paren": [1, "never"],
    "object-curly-spacing": [2, "never"]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
