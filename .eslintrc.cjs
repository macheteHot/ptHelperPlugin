/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['src/assets/**/*'],
  rules: {
    // '@typescript-eslint/rule-name': 'error',
    camelcase: 'off',
    'no-shadow': 'off',
    'prettier/prettier': ['error'],
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-use-before-define': ['off'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/prefer-default-export': ['off'],
    'import/no-unresolved': ['off'],
    'no-console': ['off'],
    'no-debugger': ['error'],
    'no-param-reassign': ['error', { props: false }],
    'no-unused-vars': ['off'],
    'no-plusplus': ['off'],
    'no-bitwise': ['error', { allow: ['~'] }],
    eqeqeq: 'error'
  }
}
