module.exports = {
  extends: ['standard', 'plugin:flowtype/recommended'],
  plugins: [
    'jest',
    'flowtype'
  ],
  env: {
    'jest/globals': true
  },
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always']
  }
}
