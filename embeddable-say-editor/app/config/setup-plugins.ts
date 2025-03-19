import {
  Schema,
  type MarkSpec,
  type NodeViewConstructor,
  type ProsePlugin,
  type SayController,
} from '@lblod/ember-rdfa-editor';
import type SayNodeSpec from '@lblod/ember-rdfa-editor/core/say-node-spec';
import type {
  EmbeddedPluginSpec,
  KebabPluginName,
  PluginInitArgs,
  PluginName,
  PluginSpecs,
} from '../../shared-types/embedded-plugin';
import type { EmbeddedPlugins } from 'plugin-registry';
import { articleStructurePlugin } from '../plugins/article-structure';
import { besluitTopic } from '../plugins/besluit-topic';
import { besluitPlugin } from '../plugins/besluit';
import { setupCitationPlugin } from '../plugins/citation';
import { confidentialityPlugin } from '../plugins/confidentiality';
import { setupEditableRdfaPlugin } from '../plugins/editable-rdfa';
import { setupImagePlugin } from '../plugins/image';
import { coreSetup } from '../plugins/core/core';
import { setupLinkPlugin } from '../plugins/link';
import { setupLocationPlugin } from '../plugins/location';
import { setupLpdcPlugin } from '../plugins/lpdc';
import { setupRoadsignRegulationPlugin } from '../plugins/roadsign-regulation';
import { setupTableOfContentsPlugin } from '../plugins/table-of-contents';
import { tableSetup } from '../plugins/table';
import { setupTemplateCommentsPlugin } from '../plugins/template-comments';
import { setupVariablePlugin } from '../plugins/variable';
import type { SayNodeViewConstructor } from '@lblod/ember-rdfa-editor/utils/ember-node';
import type {
  SidebarConfig,
  ToolbarConfig,
  WidgetComponent,
} from '../../shared-types/widgets';
import { defaultToolbar } from './default-toolbar';
import { defaultSidebar } from './default-sidebar';
import { setupHtmlEdit } from '../plugins/html-edit';
import { setupHtmlPreview } from '../plugins/html-preview';
import { setupFormattingToggle } from '../plugins/formatting-toggle';
type EnsuredSpecs<
  S extends PluginSpecs,
  N extends PluginName | void,
> = N extends PluginName ? S & Required<Pick<S, N>> : S;
type CoreSpecs = EnsuredSpecs<PluginSpecs, 'core' | 'table'>;
export type EditorSetup<N extends PluginName | void = void> = {
  nodes: Record<string, SayNodeSpec>;
  marks: Record<string, MarkSpec>;

  nodeViews: (controller: SayController) => Record<string, NodeViewConstructor>;
  pluginSpecs: EnsuredSpecs<CoreSpecs, N>;
  schema: Schema;
  prosePlugins: ProsePlugin[];
  toolbarConfig: ToolbarConfig;
  sidebarConfig: SidebarConfig;
  widgetMaps: {
    toolbar: Record<string, WidgetComponent>;
    sidebar: Record<string, WidgetComponent>;
  };
};
export type ToCamel<S extends string | number | symbol> = S extends string
  ? S extends `${infer Head}_${infer Tail}`
    ? `${ToCamel<Uncapitalize<Head>>}${Capitalize<ToCamel<Tail>>}`
    : S extends `${infer Head}-${infer Tail}`
      ? `${ToCamel<Uncapitalize<Head>>}${Capitalize<ToCamel<Tail>>}`
      : Uncapitalize<S>
  : never;
const camelize = <const S extends string>(s: S): ToCamel<S> =>
  s.replace(/-./g, (match) => match?.[1]?.toUpperCase() ?? '') as ToCamel<S>;

const PLUGIN_MAP: { [K in PluginName]: EmbeddedPlugins[K] } = {
  core: coreSetup,
  articleStructure: articleStructurePlugin,
  besluitTopic: besluitTopic,
  besluit: besluitPlugin,
  citation: setupCitationPlugin,
  confidentiality: confidentialityPlugin,
  htmlEdit: setupHtmlEdit,
  htmlPreview: setupHtmlPreview,
  formattingToggle: setupFormattingToggle,
  rdfaEditor: setupEditableRdfaPlugin,
  image: setupImagePlugin,
  link: setupLinkPlugin,
  location: setupLocationPlugin,
  lpdc: setupLpdcPlugin,
  roadsignRegulation: setupRoadsignRegulationPlugin,
  tableOfContents: setupTableOfContentsPlugin,
  table: tableSetup,
  templateComments: setupTemplateCommentsPlugin,
  variable: setupVariablePlugin,
} as const;
export function setupPlugins(args: PluginInitArgs): EditorSetup {
  const { plugins = [] as const, sidebar, toolbar } = args;

  let nodes: Record<string, SayNodeSpec> = {};
  let marks: Record<string, MarkSpec> = {};
  const prosePlugins: ProsePlugin[] = [];
  let pluginSpecs: PluginSpecs = {};
  let nodeViews: Record<
    string,
    (controller: SayController) => SayNodeViewConstructor
  > = {};
  const pluginsWithCore: KebabPluginName[] = [
    'core',
    'table',
    ...(plugins ?? []),
  ];
  let toolbarWidgets: Record<string, WidgetComponent> = {};
  let sidebarWidgets: Record<string, WidgetComponent> = {};

  const realSpecs = pluginsWithCore.map((name) => ({
    name,
    spec: PLUGIN_MAP[camelize(name)](args),
  }));

  for (const realSpec of realSpecs) {
    pluginSpecs = { ...pluginSpecs, [realSpec.name]: realSpec.spec };

    // safe cast, the types are too specific here, we want the general type
    const spec = realSpec.spec as EmbeddedPluginSpec;

    if (spec.nodes) {
      nodes = { ...nodes, ...spec.nodes };
    }
    if (spec.marks) {
      marks = { ...marks, ...spec.marks };
    }
    if (spec.prosePlugins) {
      prosePlugins.push(...spec.prosePlugins);
    }
    if (spec.nodeViews) {
      nodeViews = { ...nodeViews, ...spec.nodeViews };
    }
    if (spec.toolbarWidgets) {
      toolbarWidgets = {
        ...toolbarWidgets,
        // TODO make this safe
        ...(spec.toolbarWidgets as Record<string, WidgetComponent>),
      };
    }
    if (spec.sidebarWidgets) {
      sidebarWidgets = {
        ...sidebarWidgets,
        // TODO make this safe
        ...(spec.sidebarWidgets as Record<string, WidgetComponent>),
      };
    }
  }
  const schema = new Schema({ nodes, marks });
  let result = {
    nodes,
    marks,
    // safe cast, we guarantee core and table exist
    pluginSpecs: pluginSpecs as CoreSpecs,
    prosePlugins,
    schema,
    nodeViews: (controller: SayController) => {
      const result: Record<string, NodeViewConstructor> = {};
      for (const [name, nodeView] of Object.entries(nodeViews)) {
        // TODO: these core types are weird, should be fixed in the editor
        result[name] = nodeView(controller) as unknown as NodeViewConstructor;
      }
      return result;
    },
    sidebarConfig: sidebar ?? defaultSidebar(args),
    toolbarConfig: toolbar ?? defaultToolbar(args),
    widgetMaps: { sidebar: sidebarWidgets, toolbar: toolbarWidgets },
  };

  for (const realSpec of realSpecs) {
    // safe cast, the types are too specific here, we want the general type
    const spec = realSpec.spec as EmbeddedPluginSpec;
    if (spec.afterSetup) {
      result = spec.afterSetup(result);
    }
  }
  return result;
}
