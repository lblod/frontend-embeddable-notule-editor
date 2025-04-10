import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
// import './styles/app.scss';
import config from './config/environment';

// const ENV = {
//   modulePrefix: 'embeddable-say-editor',
//   environment: 'production',
//   rootURL: '/',
//   locationType: 'history',
//   EmberENV: {
//     EXTEND_PROTOTYPES: false,
//     FEATURES: {
//       // Here you can enable experimental features on an ember canary build
//       // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
//     },
//   },

//   APP: {
//     // Here you can pass flags/options to your application instance
//     // when it is created
//   },
// };
export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
}

loadInitializers(App, config.modulePrefix, compatModules);
