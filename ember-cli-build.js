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
    // autoImport: {
    //   webpack: {
    //     output: {
    //       filename: 'frontend-embeddable-notule-editor-[name].js',
    //     },
    //     plugins: [
    //       new webpack.optimize.LimitChunkCountPlugin({
    //         maxChunks: 1,
    //       }),
    //     ],
    //   },
    // },
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
      webpackConfig: {
        ...rdfaEditorWebpackConfig,
        // This is relative to the root of the built app (in node_modules/.embroider/rewritten-app),
        // not the project source
        entry: './app.js',
        output: {
          filename: 'assets/frontend-embeddable-notule-editor.js',
          // filename: 'assets/frontend-embeddable-notule-editor-[name].js',
          globalObject: 'window',
          library: {
            name: 'embeddableNotuleEditor',
            type: 'umd',
          },
        },
        plugins: [
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
          }),
        ],
      },
      // publicAssetURL: 'https://embeddable.gelinkt-notuleren.lblod.info/',
      // webpackConfig: {
      //   resolve: {
      //     fallback: {
      //       stream: require.resolve('stream-browserify'),
      //       crypto: require.resolve('crypto-browserify'),
      //     },
      //   },
      // },
    },
  });
};
