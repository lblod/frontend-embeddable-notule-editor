import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from '@lblod/embeddable-say-editor/config/environment';

/**
 * @typedef {import('ember-source/types')} EmberTypes
 * @typedef {import('ember-source/types/preview')} EmberPreviewTypes
 */
export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}
loadInitializers(App, config.modulePrefix);
