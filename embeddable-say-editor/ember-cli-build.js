'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const webpack = require('webpack');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false,
    },
    sassOptions: {
      includePaths: 'node_modules/@appuniversum/ember-appuniversum/styles',
    },
    autoImport: {
      webpack: {
        output: {
          filename: '@lblod/embeddable-say-editor-[name].js',
        },
        optimization: {
          splitChunks: {
            name: 'vendor-bundle',
            chunks: 'all',
            cacheGroups: {
              default: false,
            },
          },
        },
        plugins: [
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
          }),
        ],
      },
    },
    '@appuniversum/ember-appuniversum': {
      disableWormholeElement: true,
    },
  });

  return app.toTree();
};
