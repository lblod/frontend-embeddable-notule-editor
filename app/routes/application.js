import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

const defaultContext = {
  vocab: 'http://data.vlaanderen.be/ns/besluit#',
  prefix: {
    eli: 'http://data.europa.eu/eli/ontology#',
    prov: 'http://www.w3.org/ns/prov#',
    mandaat: 'http://data.vlaanderen.be/ns/mandaat#',
    besluit: 'http://data.vlaanderen.be/ns/besluit#',
    ext: 'http://mu.semte.ch/vocabularies/ext/',
    person: 'http://www.w3.org/ns/person#',
    foaf: 'http://xmlns.com/foaf/0.1/',
  },
};

export default class ApplicationRoute extends Route {
  model() {
    return EmberObject.create({
      title: 'new document',
      content: '',
      context: defaultContext,
    });
  }
}
