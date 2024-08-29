export const pluginDemoConfig = {
  title: 'my editor',
  width: '100%',
  height: '800px',
  plugins: [
    'citation',
    'besluit',
    'besluit-topic',
    'lpdc',
    'article-structure',
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
    docContent:
      'table_of_contents? ((block|chapter)+|(block|title)+|(block|article)+)',
    citation: {
      type: 'ranges',
      activeInRanges: (state) => [[0, state.doc.content.size]],
    },
    besluitTopic: {
      endpoint: 'https://data.vlaanderen.be/sparql',
    },
    lpdc: {
      endpoint: 'http://localhost/lpdc-service',
    },
  },
};
