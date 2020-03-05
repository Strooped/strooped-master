/* eslint-disable comma-dangle */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const { getReleaseVersion } = require('./releaseUtil');

const ROOT_DIR = path.join(__dirname, '../');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const BUILD_DIR = path.join(ROOT_DIR, 'dist');
const STATIC_OUT_DIR = 'static';

/**
 * Common configurations for all environments of Webpack (default and prod)
 * */
const config = {
  target: 'web',
  entry: `${SRC_DIR}/index.js`,
  context: ROOT_DIR,
  output: {
    path: BUILD_DIR,
    /**
     * Ensures that every page and subpage requests the resources
     * as '/js/[name].bundle.js', instead of 'js/[name].bundle.js'
     * */
    publicPath: '/',
    filename: `${STATIC_OUT_DIR}/js/[name].bundle.js`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      SRC_DIR,
      path.join(ROOT_DIR, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: SRC_DIR,
        exclude: path.join(ROOT_DIR, 'node_modules/'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: SRC_DIR,
        exclude: path.join(ROOT_DIR, 'node_modules/'),
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer()
              ]
            }
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
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: `${STATIC_OUT_DIR}/img/`,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          // Force vendors name to be "vendors", ...suffixed with .bundle.js
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT_DIR, 'public/index.html'),
      favicon: 'public/favicon.ico'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
      SENTRY_DSN: '',
      RELEASE_VERSION: getReleaseVersion(),
    }),
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(process.env.API_HOST),
    }),
    new StyleLintPlugin({})
  ],
};

module.exports = {
  config,
  env: {
    ROOT_DIR,
    SRC_DIR,
    BUILD_DIR,
    STATIC_OUT_DIR,
  }
};
