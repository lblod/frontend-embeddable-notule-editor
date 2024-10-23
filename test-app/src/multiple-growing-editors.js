import { renderEditor } from '@lblod/embeddable-say-editor';
import { router } from './router';

const plugins = ['besluit', 'lpdc', 'roadsign-regulation'];
const decisionUri = 'http://example.org/besluit/12345';
const decisionType =
  'https://data.vlaanderen.be/id/concept/BesluitType/0d1278af-b69e-4152-a418-ec5cfd1c7d0b';
const options = {
  besluit: { decisionUri },
  lpdc: {
    endpoint: 'http://embeddable.dev.gelinkt-notuleren.lblod.info:7070',
    decisionUri,
  },
  roadsignRegulation: { decisionContext: { decisionUri, decisionType } },
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
    width: '1000px',
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
