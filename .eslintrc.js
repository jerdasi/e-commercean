module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'at-rule-no-unknown': [
      0,
      {
        ignoreAtRules: [
          'extends',
          'apply',
          'tailwind',
          'components',
          'utilities',
          'screen',
        ],
      },
    ],
    'comma-dangle': 0,
  },
};
