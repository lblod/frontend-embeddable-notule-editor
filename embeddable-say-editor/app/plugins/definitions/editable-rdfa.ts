import { editableNodePlugin } from '@lblod/ember-rdfa-editor/plugins/_private/editable-node';
import type { PluginInitializer } from '../embedded-plugin.ts';

const name = 'rdfaEditor';
declare module '../plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupEditableRdfaPlugin;
  }
}
export const setupEditableRdfaPlugin = (() => {
  return { name, prosePlugins: [editableNodePlugin()] };
}) satisfies PluginInitializer;
