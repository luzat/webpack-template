const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const recursiveIssuer = m =>
  m.issuer ? recursiveIssuer(m.issuer) : m.name || false
const mapValues = (o, f) =>
  Object.assign({}, ...Object.keys(o).map(k => ({ [k]: f(k, o[k]) })))
const jsTest = /\.(js|jsx|mjs)$/
const entries = {
  app: {
    html: 'index',
    title: 'Webpack template',
  },
}

module.exports = (env, argv = {}) => {
  const mode = process.env.WEBPACK_SERVE
    ? 'development'
    : argv.mode || 'production'
  const production = mode === 'production'
  const sourceMap = process.env.WEBPACK_SERVE ? 'eval-source-map' : 'source-map'

  return {
    mode,
    entry: mapValues(entries, name => `./src/${name}.mjs`),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: sourceMap,
    module: {
      rules: [
        {
          test: jsTest,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            production
              ? MiniCssExtractPlugin.loader
              : {
                  loader: 'style-loader',
                  options: {
                    sourceMap: true,
                  },
                },
            {
              loader: 'css-loader',
              options: {
                import: false,
                sourceMap: true,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.pug$/,
          use: 'pug-loader',
        },
      ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          uglifyOptions: {
            compress: {
              unsafe: true,
            },
            ecma: 8,
            toplevel: true,
          },
          parallel: true,
          sourceMap: true,
          test: jsTest,
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: { map: { inline: false, annotation: true } },
        }),
      ],
      splitChunks: {
        cacheGroups: mapValues(entries, name => ({
          name,
          test: (m, c, e = name) =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === e,
          chunks: 'all',
          enforce: true,
        })),
      },
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      ...Object.entries(entries)
        .filter(([, entry]) => entry.html)
        .map(
          ([name, { title, html }]) =>
            new HtmlWebpackPlugin({
              chunks: [name],
              minify: {
                caseSenstive: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                sortAttributes: true,
                sortClassName: true,
                useShortDoctype: true,
              },
              template: `src/${html}.pug`,
              title,
            }),
        ),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async',
      }),
      new MiniCssExtractPlugin({
        filename: production ? '[name].[hash].css' : '[name].css',
        chunkFilename: production ? '[id].[hash].css' : '[id].css',
      }),
    ],
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    },
  }
}
