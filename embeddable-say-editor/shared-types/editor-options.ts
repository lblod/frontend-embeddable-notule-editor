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
