import Component from '@glimmer/component';
import config from '../config/environment';

export default class EnvironmentBannerComponent extends Component {
  get applicationVersion() {
    return config.APP.packages['frontend-embeddable-notule-editor'].version;
  }
}
