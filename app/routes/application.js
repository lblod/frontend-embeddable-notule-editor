import EmberObject from '@ember/object';
import Route from '@ember/routing/route';

const defaultContext = {
  vocab: 'http://data.vlaanderen.be/ns/besluit#',
  prefix: {
    eli: 'http://data.europa.eu/eli/ontology#',
    prov: 'http://www.w3.org/ns/prov#',
    mandaat: 'http://data.vlaanderen.be/ns/mandaat#',
    besluit: 'http://data.vlaanderen.be/ns/besluit#',
    ext: 'http://mu.semte.ch/vocabularies/ext/',
    person: 'http://www.w3.org/ns/person#',
    foaf: 'http://xmlns.com/foaf/0.1/'
  }
};

export default Route.extend({
  model() {
    return EmberObject.create({
      title: "new document",
      content: `<div><ul class="bullet-list" data-editor-position-level="2">
            <li><span class="mark-highlight-manual">Voeg juridische context in</span></li><li><span data-editor-highlight="true">Het besluit van de gemeenteraad van 30 april 2015 betreffende samenwerkingsovereenkomsten gemeente-OCMW</span>.</li><li><span data-editor-highlight="true">Het besluit van de OCMW-raad van 29 april 2015 betreffende 6</span><span data-editor-highlight="true"> Samenwerking OCMW </span><span data-editor-highlight="true">-gemeente: goedkeuring samenwerkingsovereenkomst</span>.</li><li data-editor-position-level="1"><span data-editor-highlight="true" data-editor-position-level="0">Het besluit van de gemeenteraad van 31 mei 2018 betreffende</span> Decreet lokaal bestuur -<span data-editor-highlight="true">Kennisname van rechtswege aanstelling algemeen directeur</span>.</li><li>Het voorgelegd ontwerp van de nieuwe beheersovereenkomst tussende gemeente en het OCMW Laarne​</li><li>Het decreet over het lokaal bestuur van 22 december 2017,<span data-editor-highlight="true"> artikel 40 en 41</span></li>
          </ul></div>`,
      context: defaultContext
    });
  }
});
