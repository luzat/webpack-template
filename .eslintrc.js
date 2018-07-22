module.exports = {
  root: true,
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['flowtype', 'node', 'promise', 'react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 9,
    sourceType: 'script',
  },
  env: {
    node: true,
    'shared-node-browser': true,
  },
  globals: {
    process: true, // allows passing in process.env.NODE_ENV
  },
  rules: {
    'arrow-parens': 'off', // prettier only support always or avoid
    'class-methods-use-this': 'off',
    curly: ['error', 'all'], // override airbnb's multi-line
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.config.js'],
      },
    ],
    'no-mixed-operators': 'off', // trust prettier
    'no-multiple-empty-lines': 'off', // trust prettier
    'no-use-before-define': ['error', { functions: false }],
    'no-plusplus': 'off', // just make sensible use of ++ and --
    'padding-line-between-statements': [
      'error',
      { blankLine: 'never', prev: '*', next: ['case', 'default'] },
      { blankLine: 'never', prev: ['case', 'default'], next: '*' },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'block-like',
          'class',
          'const',
          'directive',
          'export',
          'function',
          'import',
          'let',
          'return',
          'var',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'block',
          'block-like',
          'class',
          'const',
          'directive',
          'export',
          'function',
          'import',
          'let',
          'return',
          'var',
        ],
        next: '*',
      },
      { blankLine: 'any', prev: 'const', next: 'const' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
      { blankLine: 'any', prev: 'export', next: 'export' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'any', prev: 'let', next: 'let' },
      { blankLine: 'any', prev: 'var', next: 'var' },
    ],
    'react/jsx-filename-extension': 'off', // don't require .jsx
  },
  overrides: [
    {
      files: ['**/*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.mjs'],
      settings: {
        'import/resolver': 'webpack',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        browser: true,
        node: false,
        serviceworker: true,
      },
    },
  ],
}
