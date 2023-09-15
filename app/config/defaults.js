import merge from 'lodash.mergewith';

/**
 * @type {import("@lblod/ember-rdfa-editor-lblod-plugins/plugins/rdfa-date-plugin/index").DateOptions}
 */
export const defaultRdfaDatePluginConfig = (t) => ({
  placeholder: {
    insertDate: t('date-plugin.insert.date'),
    insertDateTime: t('date-plugin.insert.datetime'),
  },
  formats: [
    {
      label: 'Short Date',
      key: 'short',
      dateFormat: 'dd/MM/yy',
      dateTimeFormat: 'dd/MM/yy HH:mm',
    },
    {
      label: 'Long Date',
      key: 'long',
      dateFormat: 'EEEE dd MMMM yyyy',
      dateTimeFormat: 'PPPPp',
    },
  ],
  allowCustomFormat: true,
});

/**
 * @type {import("@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin").CitationPluginEmberComponentConfig}
 */
export const defaultCitationPluginConfig = {
  type: 'ranges',
  activeInRanges: (state) => [[0, state.doc.content.size]],
  endpoint: '/codex/sparql',
};

/**
 * @type {import("@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin").RoadsignRegulationPluginOptions}
 */
export const defaultRoadsignRegulationPluginConfig = {
  endpoint: 'https://dev.roadsigns.lblod.info/sparql',
  imageBaseUrl: 'https://register.mobiliteit.vlaanderen.be/',
};

/**
 * @type {import("@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/edit").LocationEditOptions}
 */
export const defaultLocationVariablePluginConfig = {
  endpoint: 'https://dev.roadsigns.lblod.info/sparql',
  zonalLocationCodelistUri:
    'http://lblod.data.gift/concept-schemes/62331E6900730AE7B99DF7EF',
  nonZonalLocationCodelistUri:
    'http://lblod.data.gift/concept-schemes/62331FDD00730AE7B99DF7F2',
};

/**
 * @type {import("@lblod/ember-rdfa-editor-lblod-plugins/plugins/table-of-contents-plugin").TableOfContentsConfig}
 */
export const defaultTableOfContentsPluginConfig = [
  {
    nodeHierarchy: [
      'title|chapter|section|subsection|article',
      'structure_header|article_header',
    ],
  },
];

const mergeCustomizer = (objValue, srcValue) => {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return srcValue;
  }
};

/**
 * If the user config is present, merge it with the default config.
 * Otherwise return the default config.
 * @param defaultConfig
 * @param userConfig
 * @returns {*}
 */
export const mergeConfigs = (defaultConfig, userConfig) => {
  if (userConfig) {
    return merge(defaultConfig, userConfig, mergeCustomizer);
  }

  return defaultConfig;
};
