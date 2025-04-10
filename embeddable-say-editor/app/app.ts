import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import Leaflet from 'leaflet';
import './styles/app.scss';

const ENV = {
  modulePrefix: 'embeddable-say-editor',
  environment: 'production',
  rootURL: '/',
  locationType: 'history',
  EmberENV: {
    EXTEND_PROTOTYPES: false,
    FEATURES: {
      // Here you can enable experimental features on an ember canary build
      // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
    },
  },

  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
  },
};
interface AppArgs {
  name: string;
  autoboot: boolean;
}
export default class App extends Application {
  modulePrefix = ENV.modulePrefix;
  Resolver = Resolver.withModules(compatModules);
  static start(args: AppArgs): Application {
    window.L = Leaflet;
    return this.create(args);
  }
}

loadInitializers(App, ENV.modulePrefix, compatModules);
