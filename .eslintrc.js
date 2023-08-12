module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:unicorn/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  env: {
    browser: true,
    es2020: true,
    jest: false,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // jsx-a11y
    'jsx-a11y/label-has-associated-control': [
      'warn',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    // js/ts
    'max-len': ["error", { "code": 110 }],
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-exports': 'off', // https://github.com/airbnb/javascript/issues/2500
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    // ts
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    // react
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    // unicorn
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          prop: false,
          props: false,
          ref: false,
        },
      },
    ],
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-null': 'off'
  },
};
