'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const webpack = require('webpack');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false,
    },
    postcssOptions: {
      compile: {
        enabled: true,
        extension: 'scss',
        parser: require('postcss-scss'),
        plugins: [
          {
            module: require('@csstools/postcss-sass'),
          },
          {
            module: require('postcss-rem-to-pixel'),
            options: {
              rootValue: 10,
              unitPrecision: 5,
              propList: ['*'],
              selectorBlackList: [],
              replace: true,
              mediaQuery: false,
              minRemValue: 0,
            },
          },
        ],
      },
    },
    autoImport: {
      webpack: {
        output: {
          filename: 'embeddable-say-editor-[name].js',
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
