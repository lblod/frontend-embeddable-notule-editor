const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (environment) => {
  console.log('Resolved: ', path.resolve(__dirname, 'dist'));
  console.log(path.resolve(__dirname, 'index.html'));
  console.log(path.resolve(__dirname, 'dist'));
  return {
    mode: environment.development ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      client: {
        overlay: false,
      },
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'index.html'),
            to: path.resolve(__dirname, 'dist/'),
          },
        ],
      }),
    ],
  };
};
