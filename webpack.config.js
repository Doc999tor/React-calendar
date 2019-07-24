const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const alias = {
  'project-components': path.resolve('./components-lib'),
  'project-services': path.resolve('./src/services'),
  components: path.resolve('./src/components'),
  lib: path.resolve('./components-lib/lib'),
  helpers: path.resolve('./src/helpers'),
  store: path.resolve('./src/store')
}

module.exports = (env, args) => {
  let outputJS = 'bundle.js'
  let outputCSS = 'bundle.css'
  if (env === 'production-p') {
    outputCSS = 'main.bundle.min.css'
    outputJS = 'main.bundle.min.js'
  }
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: outputJS
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx?)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.styl$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: args.mode === 'development',
                reloadAll: true
              }
            },
            'css-loader', 'stylus-loader']
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: args.mode === 'development',
                reloadAll: true
              }
            },
            'css-loader', 'less-loader']
        }
        // {
        //   test: /\.less$/,
        //   use: ['style-loader', 'css-loader', 'less-loader']
        // }
      ]
    },
    devServer: {
      historyApiFallback: true,
      stats: {
        version: false,
        modules: false,
        assets: false,
        hash: false
      },
      port: '3000'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: outputCSS
      }),
      new webpack.ProvidePlugin({
        'React': 'react'
      }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ],
    resolve: {
      alias: alias
    },
    devtool: 'source-map'
  }
}