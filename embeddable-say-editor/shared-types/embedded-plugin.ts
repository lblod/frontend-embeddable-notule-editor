import type {
  MarkSpec,
  ProsePlugin,
  SayController,
} from '@lblod/ember-rdfa-editor';
import type SayNodeSpec from '@lblod/ember-rdfa-editor/core/say-node-spec';
import type { SayNodeViewConstructor } from '@lblod/ember-rdfa-editor/utils/ember-node';
import type { RenderEditorOptions } from './render-editor-options';
import type { EmbeddedPlugins } from 'plugin-registry';
import type IntlService from 'ember-intl/services/intl';

export type PluginName = Extract<keyof EmbeddedPlugins, string>;
export interface EmbeddedPluginSpec {
  name: PluginName;
  nodes?: Record<string, SayNodeSpec>;
  marks?: Record<string, MarkSpec>;
  nodeViews?: Record<
    string,
    (controller: SayController) => SayNodeViewConstructor
  >;
  prosePlugins?: ProsePlugin[];
  config?: unknown;
}

export type PluginInitializer = (
  args: RenderEditorOptions & { intl: IntlService },
) => EmbeddedPluginSpec;

export type SpecOf<F extends PluginInitializer> = F extends (
  args: RenderEditorOptions,
) => infer P
  ? P extends EmbeddedPluginSpec
    ? P
    : never
  : never;
export type PluginSpecs = {
  [K in keyof EmbeddedPlugins]: SpecOf<EmbeddedPlugins[K]>;
};
