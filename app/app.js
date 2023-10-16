import Application from '@ember/application/index';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'frontend-embeddable-notule-editor/config/environment';

export default class App extends Application {
  rootElement = '#my-editor';
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}
console.log('about to init');
loadInitializers(App, config.modulePrefix);
