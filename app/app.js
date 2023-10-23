import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'frontend-embeddable-notule-editor/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  async startEditor({ rootElement }) {
    try {
      this.rootElement = rootElement;
      this.autoboot = false;
      this.init();
      await this.visit('/', { rootElement });
    } catch (err) {
      console.error('Error starting embeddable editor', err);
    }
    return this;
  }
}
loadInitializers(App, config.modulePrefix);
