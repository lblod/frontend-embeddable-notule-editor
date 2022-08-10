'use strict';

const mainPjson = require('../package.json');
const fs = require('fs');

function extractRepoUrl(pjson) {
  const repo = pjson.repository;
  if (typeof repo === 'string') {
    return repo.replace('git+', '');
  } else if (typeof repo === 'object') {
    return repo?.url?.replace('git+', '');
  }
}
function getPackages() {
  const packages = {
    [mainPjson.name]: {
      version: mainPjson.version,
      url: extractRepoUrl(mainPjson),
    },
  };
  const dirs = fs
    .readdirSync('node_modules/@lblod')
    .filter((dir) => dir.startsWith('ember-rdfa-editor'));
  dirs.forEach((dir) => {
    const file = `../node_modules/@lblod/${dir}/package.json`;
    const pjson = require(file);
    packages[pjson.name] = {
      version: pjson.version,
      url: extractRepoUrl(pjson),
    };
  });
  return packages;
}

module.exports = function (environment) {
  const editorDeps = getPackages();
  let ENV = {
    modulePrefix: 'frontend-embeddable-notule-editor',
    environment,
    rootURL: '/',
    locationType: 'none',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      autoboot: false,
      plugins: [],
      packages: {
        ...editorDeps,
      },
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.featureFlags = { 'editor-html-paste': true };
    // here you can enable a production-specific feature
  }

  return ENV;
};
