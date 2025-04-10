const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (environment) => ({
  entry: ['./main.ts'],
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
        {
          from: 'assets/images/**/*',
          context: path.resolve(__dirname, 'ember-build'),
          to: path.resolve(__dirname, 'dist'),
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
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-typescript', { allowDeclareFields: true }],
            ],
          },
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
      {
        test: /\.(png|jpg)$/i,

        type: 'asset/resource',
      },
    ],
  },
});
