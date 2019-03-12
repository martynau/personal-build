const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

var version = 1;

module.exports = {
  entry: {
    main: './src/js/app.js',
    notes: './src/js/notes.js'
  },
  output: {
    filename: '../dist/js/[name]' + '-v' + version + '.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },      
      {
      test: /\.(scss)$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },  
  plugins: [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '../dist/css/styles-v' + version + '.css',
        chunkFilename: '[id].css'
    }),
    new CopyPlugin([
      { from: 'src/html/*', to: '../dist/', flatten: true },
      { from: 'src/static/root/*', to: '../dist/', flatten: true },
      { from: 'img/**', to: '../dist/', context: 'src/static/' },
      { from: 'files/**', to: '../dist/', context: 'src/static/' }
    ]
    /* , { logLevel: 'debug' }*/
    ) 
  ]
};