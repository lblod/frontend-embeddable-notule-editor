import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Transition from '@ember/routing/transition';
import IntlService from 'ember-intl/services/intl';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  beforeModel(transition: Transition) {
    const userLocale = navigator.language ?? navigator.languages[0];
    this.intl.setLocale([userLocale, 'nl-BE']);
    return super.beforeModel(transition);
  }
}
