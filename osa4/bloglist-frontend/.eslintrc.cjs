/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    "react-app",
    "react-app/jest",
  ],
  plugins: ['prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    eqeqeq: 'error',
    semi: 0,
    'linebreak-style': ['error', 'windows'],
    'arrow-parens': ['error', 'as-needed'],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     endOfLine: 'auto',
    //   },
    // ],
  },
};
