import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from '@lblod/embeddable-say-editor/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  async startEditor({ rootElement, pluginNames, config = {} }) {
    let editorElement;
    if (!rootElement || !pluginNames) {
      throw new Error('Missing configuration when starting embeddable editor');
    }
    try {
      this.rootElement = rootElement;
      this.autoboot = false;
      this.init();
      const app = await this.visit('/', { rootElement });
      const editorContainer =
        app.application._document.getElementById('my-editor');
      editorElement =
        editorContainer.getElementsByClassName('notule-editor')[0];
      editorElement.initEditor(pluginNames, config);
    } catch (err) {
      console.error('Error starting embeddable editor', err);
      throw err;
    }
    return editorElement;
  }
}
loadInitializers(App, config.modulePrefix);
