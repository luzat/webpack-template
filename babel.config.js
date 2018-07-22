module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
        shippedProposals: true,
        useBuiltIns: 'usage',
        exclude: ['web.dom.iterable'],
      },
    ],
    '@babel/react',
    '@babel/flow',
  ],
  plugins: [
    '@babel/proposal-async-generator-functions',
    '@babel/proposal-class-properties',
    '@babel/proposal-json-strings',
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-optional-catch-binding',
    '@babel/proposal-unicode-property-regex',
    '@babel/syntax-dynamic-import',
    '@babel/syntax-import-meta',
    [
      '@babel/transform-runtime',
      {
        useBuiltIns: true,
        useESModules: true,
      },
    ],
  ],
}
