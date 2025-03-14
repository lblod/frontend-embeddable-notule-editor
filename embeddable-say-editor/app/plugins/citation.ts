import type { PluginInitializer } from '../../shared-types/editor-options';

import {
  citationPlugin,
  type CitationPluginEmberComponentConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';

export const setupCitationPlugin: PluginInitializer<
  CitationPluginEmberComponentConfig
> = (_setup, config) => {
  return { name: 'citation', config, prosePlugins: [citationPlugin(config)] };
};
