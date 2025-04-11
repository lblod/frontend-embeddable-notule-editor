import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import './styles/app.scss';

export default class App extends Application {
  modulePrefix = '@lblod/embeddable-say-editor'
  Resolver = Resolver.withModules(compatModules);
}

loadInitializers(App, '@lblod/embeddable-say-editor', compatModules);
