import { renderEditor } from '@lblod/embeddable-say-editor';
import { router } from './router';

const plugins = ['besluit-topic', 'lpdc', 'location'];
const decisionUri = 'http://example.org/besluit/12345';
const options = {
  lpdc: {
    endpoint:
      'https://embeddable.dev.gelinkt-notuleren.lblod.info/lpdc-service',
    decisionUri,
  },
  besluitTopic: {
    endpoint: 'https://data.vlaanderen.be/sparql',
    decisionUri,
  },
  location: {
    defaultPointUriRoot: 'https://example.net/id/geometrie/',
    defaultPlaceUriRoot: 'https://example.net/id/plaats/',
    defaultAddressUriRoot: 'https://example.net/id/adres/',
    defaultMunicipality: 'Gent',
  },
  ui: {
    expandInsertMenu: true,
  },
};

document.body.appendChild(router);
const container = document.createElement('div');
document.body.appendChild(container);
const editors = [
  {
    heading: 'Description',
    label: 'desc',
    height: '250px',
    content:
      'This sample simulates using multiple embedded editors for the parts of a decision',
  },
  {
    heading: 'Motivation',
    label: 'motiv',
    height: '250px',
    content: 'Each editor has a decision URI passed to the plugins',
  },
  { heading: 'Ruling', label: 'ruling', height: '500px', content: '...' },
];
window.editors = {};

editors.forEach((config) => {
  container.append(
    document
      .createElement('h4')
      .appendChild(document.createTextNode(config.heading))
  );

  const element = document.createElement('div');
  container.append(element);
  renderEditor({
    element,
    width: '60%',
    height: config.height,
    growEditor: true,
    plugins,
    options,
  })
    .then((editor) => {
      editor.setHtmlContent(config.content);
      window.editors[config.label] = editor;
    })
    .catch(console.error);
});
