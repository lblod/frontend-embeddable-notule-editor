'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const webpack = require('webpack');
const { Webpack } = require('@embroider/webpack');
const compat = require('@embroider/compat');
const pluginsWebpackConfig = require('@lblod/ember-rdfa-editor-lblod-plugins/webpack-config');
const { merge } = require('webpack-merge');

// It seems there's no supported way of controlling whether embroider/webpack adds fingerprint
// hashes to filenames in production builds, so instead we extend their class to override the
// method.
// See https://github.com/embroider-build/embroider/blob/main/packages/webpack/src/ember-webpack.ts
class FingerprintlessWebpack extends Webpack {
  getFingerprintedFilename(filename) {
    return filename;
  }
}

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
    '@appuniversum/ember-appuniversum': {
      disableWormholeElement: true,
    },
    svgJar: {
      sourceDirs: [
        'node_modules/@appuniversum/ember-appuniversum/public/icons',
      ],
    },
  });

  return compat.compatBuild(app, FingerprintlessWebpack, {
    packagerOptions: {
      webpackConfig: merge(pluginsWebpackConfig, {
        output: {
          // This is a bit weird, but embroider seems to no longer respect the 'fingerprint'
          // configuration, so if we don't do this, it appends a hash to chunk names
          filename: (pathData) => {
            if (typeof pathData.runtime === 'string') {
              return pathData.runtime;
            } else {
              return 'assets/frontend-embeddable-notule-editor-app.js';
            }
          },
          library: {
            name: 'embeddable-say-editor',
            type: 'umd',
          },
        },
        plugins: [
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
          }),
        ],
      }),
    },
  });
};
