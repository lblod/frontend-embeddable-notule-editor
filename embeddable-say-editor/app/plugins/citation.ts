import {
  citationPlugin,
  type CitationPluginEmberComponentConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../config/defaults';
import type { EditorState } from '@lblod/ember-rdfa-editor';
const name = 'citation' as const;

declare module 'plugin-registry' {
  export interface PluginOptions {
    [name]?: Partial<CitationPluginEmberComponentConfig>;
  }
  export interface EmbeddedPlugins {
    [name]: typeof setupCitationPlugin;
  }
}
const defaultConfig: CitationPluginEmberComponentConfig = {
  activeInRanges: (state: EditorState) => [[0, state.doc.content.size]],
  endpoint: 'https://codex.opendata.api.vlaanderen.be:8888/sparql',
};
export const setupCitationPlugin = (({ options }) => {
  const config = mergeConfigs(defaultConfig, options?.citation);

  return { name, config, prosePlugins: [citationPlugin(config)] };
}) satisfies PluginInitializer;
