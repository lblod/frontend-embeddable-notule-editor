const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const pages = {
  index: {
    title: 'Index',
    source: './src/index.js',
  },
  'multiple-editors': {
    title: 'Multiple editors',
    source: './src/multiple-editors.js',
  },
};

const htmlPlugins = [];
const entries = {};
Object.entries(pages).forEach(([name, page]) => {
  htmlPlugins.push(
    new HtmlWebPackPlugin({
      filename: `${name}.html`,
      chunks: [name],
      title: page.title,
    })
  );
  entries[name] = page.source;
});
console.log(entries);
console.log(htmlPlugins);

module.exports = (environment) => {
  console.log('Resolved: ', path.resolve(__dirname, 'dist'));
  console.log(path.resolve(__dirname, 'index.html'));
  console.log(path.resolve(__dirname, 'dist'));
  return {
    mode: environment.development ? 'development' : 'production',
    entry: entries,
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      client: {
        overlay: false,
      },
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [...htmlPlugins],
  };
};
