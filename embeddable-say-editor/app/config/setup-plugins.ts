import type {
  MarkSpec,
  NodeViewConstructor,
  ProsePlugin,
  SayController,
  Schema,
} from '@lblod/ember-rdfa-editor';
import type SayNodeSpec from '@lblod/ember-rdfa-editor/core/say-node-spec';
import type { EmbeddedPlugins } from 'plugin-registry';
import type { PluginInitArgs } from '../../shared-types/embedded-plugin';
export type EditorSetup = {
  nodes: Record<string, SayNodeSpec>;
  marks: Record<string, MarkSpec>;

  nodeViews: (controller: SayController) => Record<string, NodeViewConstructor>;
  pluginSpecs: EmbeddedPlugins;
  schema: Schema;
  prosePlugins: ProsePlugin[];
};

export function setupPlugins(args: PluginInitArgs): EditorSetup {}
