const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (environment) => ({
  entry: ['./main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    globalObject: 'this',
    library: { name: '@lblod/embeddable-say-editor', type: 'umd' },
  },
  externals: {},

  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /@lblod\/embeddable-say-editor\/app/,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../README.md'),
          to: path.resolve(__dirname),
        },
        {
          from: path.resolve(__dirname, '../LICENSE.md'),
          to: path.resolve(__dirname),
        },
      ],
    }),
  ],
  mode: environment.development ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /ember-build\/assets\/.*\.js$/,
        type: 'asset/source',
        exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader"
        // }
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        type: 'asset/source',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,

        type: 'asset/resource',
      },
    ],
  },
});
