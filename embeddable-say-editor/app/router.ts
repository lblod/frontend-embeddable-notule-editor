import EmberRouter from '@ember/routing/router';
//@ts-expect-error TODO figure out how to type this
import config from '@lblod/embeddable-say-editor/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('route-not-found', {
    path: '/*wildcard',
  });
});
