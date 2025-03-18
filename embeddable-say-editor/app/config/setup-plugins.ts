import type { MarkSpec, ProsePlugin, Schema } from '@lblod/ember-rdfa-editor';
import type SayNodeSpec from '@lblod/ember-rdfa-editor/core/say-node-spec';
import type {
  PluginInitArgs,
  PluginSpecs,
} from '../../shared-types/embedded-plugin';
export type EditorSetup = {
  nodes: Record<string, SayNodeSpec>;
  marks: Record<string, MarkSpec>;

  // nodeViews: (controller: SayController) => Record<string, NodeViewConstructor>;
  pluginSpecs: PluginSpecs;
  schema: Schema;
  prosePlugins: ProsePlugin[];
};

export function setupPlugins(args: PluginInitArgs): EditorSetup {}
const test: EditorSetup;
