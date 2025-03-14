import type {
  NodeView,
  ProsePlugin,
  PNode,
  SayController,
  SayView,
  MarkSpec,
} from '@lblod/ember-rdfa-editor';
import type SayNodeSpec from '@lblod/ember-rdfa-editor/core/say-node-spec';
import type IntlService from 'ember-intl/services/intl';

/**
 * "plugins" which are not exposed to the user config
 */
export type CorePluginName = 'core' | 'table' | 'image' | 'link';
export type PluginName =
  | 'citation'
  | 'article-structure'
  | 'besluit'
  | 'besluit-topic'
  | 'lpdc'
  | 'roadsign-regulation'
  | 'variable'
  | 'table-of-contents'
  | 'template-comments'
  | 'confidentiality'
  | 'location'
  | 'rdfa-editor'
  | 'formatting-toggle'
  | 'html-edit'
  | 'html-preview';
export type InternalPluginName = CorePluginName | PluginName;

export type EditorConfig = Record<string, unknown>;
/**
 * The options for rendering the editor.
 */
export type RenderEditorOptions = {
  /**
   * The HTML element to render the editor in.
   */
  element: HTMLElement;
  /**
   * The title for the editor.
   */
  title?: string;
  /**
   * The width of the editor.
   */
  width: string;
  /**
   * The height of the editor.
   */
  height: string;
  /**
   * The plugins to initialize the editor with.
   */
  plugins?: PluginName[];
  /**
   * The options to initialize the editor with.
   */
  options?: EditorConfig;
  /**
   * Record of CSS Variables and their values to be applied to the editor.
   */
  cssVariables?: Record<string, string>;
  /**
   * Whether the editor should grow to fit its content.
   */
  growEditor?: boolean;
};
export type SayNodeViewConstructor = (
  node: PNode,
  view: SayView,
  getPos: () => number | undefined,
) => NodeView;
export interface PluginSetup {
  intl: IntlService;
  activePlugins: PluginName[];
  nodes: Record<string, SayNodeSpec>;
  nodeViews: Record<
    string,
    (controller: SayController) => SayNodeViewConstructor
  >;
  prosePlugins: ProsePlugin[];
}
export interface InitializedPluginSetup<C> {
  name: InternalPluginName;
  nodes?: Record<string, SayNodeSpec>;
  marks?: Record<string, MarkSpec>;
  config: C;
  nodeViews?: Record<
    string,
    (controller: SayController) => SayNodeViewConstructor
  >;
  prosePlugins?: ProsePlugin[];
}
export type PluginInitializer<C> = (
  setup: PluginSetup,
  config: C,
) => InitializedPluginSetup<C>;
