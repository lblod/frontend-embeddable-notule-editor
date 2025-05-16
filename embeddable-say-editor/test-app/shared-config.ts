import type { RenderEditorOptions } from '../app/render-editor-options';

export const pluginDemoConfig: Omit<RenderEditorOptions, 'element'> &
  Required<Pick<RenderEditorOptions, 'plugins'>> = {
  title: 'my editor',
  width: '100%',
  height: '800px',
  plugins: [
    'citation',
    'besluit',
    'besluit-topic',
    'lpdc',
    // 'article-structure',
    'variable',
    'table-of-contents',
    'roadsign-regulation',
    'formatting-toggle',
    'template-comments',
    'confidentiality',
    'html-edit',
    'html-preview',
    'location',
  ],
  options: {
    docContent: 'table_of_contents? block+',
    citation: {
      type: 'ranges',
      activeInRanges: (state) => [[0, state.doc.content.size]],
    },
    besluitTopic: {
      endpoint: 'https://data.vlaanderen.be/sparql',
      widgetLocation: 'sidebar',
    },
    lpdc: {
      endpoint:
        'https://embeddable.dev.gelinkt-notuleren.lblod.info/lpdc-service/doc/instantie',
    },
    besluit: {
      fullLengthArticles: false,
      onlyArticleSpecialName: true,
    },
    location: {
      locationTypes: ['address', 'place'],
    },
  },
};
