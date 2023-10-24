const webpack = require('webpack');
module.exports = {
  entry: ['./main.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'embeddable.js',
    globalObject: 'this',
    library: { name: '@lblod/embeddable-say-editor', type: 'umd' },
  },
  externals: {},
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /@lblod\/embeddable-say-editor\/app/,
    }),
  ],
  module: {
    rules: [
      {
        test: /dist\/assets\/.*\.js$/,
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
  // plugins: []
};
