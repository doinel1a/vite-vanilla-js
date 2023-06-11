const path = require('node:path');

const html = require('html-webpack-plugin');
const css = require('mini-css-extract-plugin');
const fileManager = require('filemanager-webpack-plugin');
const partytown = require('@builder.io/partytown/utils');

const meta = require('./_config');

module.exports = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    target: 'browserslist',
    entry: {
      index: getDirectory('src/js/index.js')
    },
    output: {
      path: getDirectory('dist'),
      filename: isProduction ? '[name].[fullhash].js' : '[name].js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        },
        {
          test: /\.(sass|scss|css)$/i,
          use: [
            {
              loader: css.loader
            },
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'assets'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext][query]'
          }
        }
      ]
    },
    plugins: [
      new html({
        meta: {
          title: meta.title,
          'application-name': meta.title,
          description: meta.description,
          keywords: meta.keywords,
          'apple-mobile-web-app-title': meta.title
        },
        title: meta.title,
        icon192: isProduction
          ? '/favicon/favicon-192.webp'
          : '/assets/favicon/favicon-192.webp',
        icon512: isProduction
          ? '/favicon/favicon-512.webp'
          : '/assets/favicon/favicon-512.webp',
        manifest: isProduction ? '/app.webmanifest' : '/assets/app.webmanifest',
        sitemap: isProduction ? '/sitemap.xml' : '/assets/sitemap.xml',
        template: getDirectory('src/index.html'),
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: false,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      }),
      new css({
        filename: isProduction ? '[name].[fullhash].css' : '[name].css'
      }),
      new fileManager({
        events: {
          onEnd: [
            {
              copy: [
                {
                  source: getDirectory('src/assets/favicon/**'),
                  destination: 'dist/favicon'
                }
              ]
            },
            {
              copy: [
                {
                  source: getDirectory('src/assets/app.webmanifest'),
                  destination: 'dist/'
                }
              ]
            },
            {
              copy: [
                {
                  source: getDirectory('src/assets/sitemap.xml'),
                  destination: 'dist/'
                }
              ]
            },
            {
              copy: [
                {
                  source: partytown.libDirPath(),
                  destination: 'dist/~partytown'
                }
              ]
            }
          ]
        }
      })
    ],
    optimization: {
      minimize: isProduction
    },
    devServer: {
      static: {
        directory: isProduction ? getDirectory('dist') : getDirectory('src')
      },
      hot: true,
      server: 'http',
      historyApiFallback: true
    },
    devtool: isProduction ? false : 'source-map'
  };
};

function getDirectory(directory) {
  return path.resolve(__dirname, directory);
}
