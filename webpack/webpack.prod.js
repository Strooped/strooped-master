/* eslint-disable comma-dangle */

const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

const common = require('./webpack.common');

module.exports = merge.smart(common.config, {
  mode: 'production',
  output: {
    filename: path.join(common.env.STATIC_OUT_DIR, 'js/[name].[hash].bundle.js'),
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: path.join(common.env.STATIC_OUT_DIR, 'js/[name].[hash].js.map'),
      exclude: [path.join(common.env.STATIC_OUT_DIR, 'js/vendors**')],
      // Required by Sentry to connect map to source codes
      append: '//# sourceMappingURL=[url]',
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CleanWebpackPlugin({ root: common.env.ROOT_DIR }),
    new MiniCssExtractPlugin(({
      filename: path.join(common.env.STATIC_OUT_DIR, 'css/[name]-[hash].css'),
    })),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              minimize: true,
              outputStyle: 'compressed',
            },
          },
        ],
      },
    ],
  }
});
