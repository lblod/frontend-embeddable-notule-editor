import {
  NodeType,
  type EditorState,
  type Schema,
} from '@lblod/ember-rdfa-editor';
import type { PluginInitializer } from '../../shared-types/editor-options';

import { citationPlugin } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';
export interface CitationPluginConfig {
  endpoint: string;
  type: 'nodes' | 'ranges';
  activeInNodeTypes: (schema: Schema, state: EditorState) => Set<NodeType>;
  activeInRanges: (state: EditorState) => [number, number][];
}
export const setupCitationPlugin: PluginInitializer<CitationPluginConfig> = (
  _setup,
  config,
) => {
  return { name: 'citation', config, prosePlugins: [citationPlugin(config)] };
};
