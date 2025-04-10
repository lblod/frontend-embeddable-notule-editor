import { editableNodePlugin } from '@lblod/ember-rdfa-editor/plugins/_private/editable-node';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';

const name = 'rdfaEditor' as const;
declare module '../../shared-types/plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupEditableRdfaPlugin;
  }
}
export const setupEditableRdfaPlugin = (() => {
  return { name, prosePlugins: [editableNodePlugin()] };
}) satisfies PluginInitializer;
