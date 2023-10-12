'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const webpack = require('webpack');
const { Webpack } = require('@embroider/webpack');
const compat = require('@embroider/compat');
const rdfaEditorWebpackConfig = require('@lblod/ember-rdfa-editor/webpack-config');

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

  return compat.compatBuild(app, Webpack, {
    packagerOptions: {
      webpackConfig: rdfaEditorWebpackConfig,
    },
  });
};
