import type { EditorState } from '@lblod/ember-rdfa-editor';
import type { LocationEditOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/edit';
import type { CitationPluginEmberComponentConfig } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';
import type { LocationPluginConfig } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/location-plugin/node';
import type { RoadsignRegulationPluginOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin';
import type { TableOfContentsConfig } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/table-of-contents-plugin';
import type { DateOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/variable-plugin/variables';
import merge from 'lodash.mergewith';

export const defaultRdfaDatePluginConfig: DateOptions = {
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
};

export const defaultRoadsignRegulationPluginConfig: RoadsignRegulationPluginOptions =
  {
    endpoint: 'https://dev.roadsigns.lblod.info/sparql',
    imageBaseUrl: 'https://register.mobiliteit.vlaanderen.be/',
  };

export const defaultLocationVariablePluginConfig: LocationEditOptions = {
  endpoint: 'https://dev.roadsigns.lblod.info/sparql',
  zonalLocationCodelistUri:
    'http://lblod.data.gift/concept-schemes/62331E6900730AE7B99DF7EF',
  nonZonalLocationCodelistUri:
    'http://lblod.data.gift/concept-schemes/62331FDD00730AE7B99DF7F2',
};

export const defaultTableOfContentsPluginConfig: TableOfContentsConfig = [
  {
    nodeHierarchy: [
      'title|chapter|section|subsection|article',
      'structure_header|article_header',
    ],
  },
];
export const defaultLocationPluginConfig: LocationPluginConfig = {
  defaultPointUriRoot: 'https://example.net/id/geometrie/',
  defaultPlaceUriRoot: 'https://example.net/id/plaats/',
  defaultAddressUriRoot: 'https://example.net/id/adres/',
};

const mergeCustomizer = (
  {options}
): Array<unknown> | undefined => {
  // if the src provides an array, overwrite instead of merging
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return srcValue;
  }
};

/**
 * If the user config is present, merge it with the default config.
 * Otherwise return the default config.
 */
export const mergeConfigs = <C, U extends Partial<C>>(
  defaultConfig: C,
  userConfig?: U,
): C => {
  if (userConfig) {
    return merge(defaultConfig, userConfig, mergeCustomizer);
  }

  return defaultConfig;
};
