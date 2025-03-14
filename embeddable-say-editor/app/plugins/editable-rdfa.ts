import { editableNodePlugin } from '@lblod/ember-rdfa-editor/plugins/_private/editable-node';
import type { PluginInitializer } from '../../shared-types/editor-options';
type EditableRdfaPluginConfig = unknown;

export const setupEditableRdfaPlugin: PluginInitializer<
  EditableRdfaPluginConfig
> = (_setup, config) => {
  return { name: 'rdfa-editor', config, prosePlugins: [editableNodePlugin()] };
};
