import type { MarkSpec, SayController } from '@lblod/ember-rdfa-editor';
import type { SayNodeViewConstructor } from '@lblod/ember-rdfa-editor/utils/ember-node';
import type SayNodeSpec from '@lblod/ember-rdfa-editor/core/say-node-spec';
import type { EmbeddedPlugins } from 'plugin-registry';
export type EditorSetup = {
  nodes: Record<string, SayNodeSpec>;
  marks: Record<string, MarkSpec>;

  nodeViews: Record<
    string,
    (controller: SayController) => SayNodeViewConstructor
  >;
  pluginSpecs: EmbeddedPlugins;
};

export function setupPlugins<C>(
  plugins: InitializedPluginSetup<
    Array<
      C extends InitializedPluginSetup<infer S>
        ? InitializedPluginSetup<S>
        : never
    >
  >,
): EditorSetup {}
