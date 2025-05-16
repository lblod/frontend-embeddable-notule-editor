import { renderEditor } from '../../app/main.ts';
import type {
  KebabPluginName,
  UserPluginOptions,
} from '../../app/plugins/embedded-plugin.ts';
import { router } from '../router.ts';

const plugins: KebabPluginName[] = ['besluit-topic', 'lpdc', 'location'];
const decisionUri = 'http://example.org/besluit/12345';
const options: UserPluginOptions = {
  lpdc: {
    endpoint:
      'https://embeddable.dev.gelinkt-notuleren.lblod.info/lpdc-service/doc/instantie',
    decisionUri,
  },
  besluitTopic: {
    endpoint: 'https://data.vlaanderen.be/sparql',
    widgetLocation: 'sidebar',
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
  { heading: 'Ruling', label: 'ruling', height: '250px', content: '...' },
];
window.editors = {};

editors.forEach((config) => {
  container.append(
    document
      .createElement('h4')
      .appendChild(document.createTextNode(config.heading)),
  );

  const element = document.createElement('div');
  element.className = 'editor-container';
  container.append(element);
  renderEditor({
    element,
    width: '60%',
    height: config.height,
    growEditor: true,
    plugins,
    shadowDom: true,
    options,
  })
    .then((editor) => {
      editor.setHtmlContent(config.content);
      window.editors![config.label] = editor;
    })
    .catch(console.error);
});
