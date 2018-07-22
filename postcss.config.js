const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    autoprefixer,
    postcssPresetEnv({
      stage: 2,
      features: {
        'color-functional-notation': true,
      },
    }),
  ],
  syntax: 'postcss-scss',
}
