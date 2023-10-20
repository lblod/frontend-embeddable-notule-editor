'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');
const compat = require('@embroider/compat');
const rdfaEditorWebpackConfig = require('@lblod/ember-rdfa-editor/webpack-config');

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

  return compat.compatBuild(app, Webpack, {
    packagerOptions: {
      webpackConfig: rdfaEditorWebpackConfig,
    },
  });
};
