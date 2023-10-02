'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const webpack = require('webpack');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false,
    },
    autoImport: {
      webpack: {
        output: {
          filename: 'frontend-embeddable-notule-editor-[name].js',
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
    svgJar: {
      sourceDirs: [
        'node_modules/@appuniversum/ember-appuniversum/public/icons',
      ],
    },
  });

  return app.toTree();
};
