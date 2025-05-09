import type { EditorOptions } from './plugins/embedded-plugin.ts';

/**
 * The options for rendering the editor.
 */
export type RenderEditorOptions = {
  /**
   * The HTML element to render the editor in.
   */
  element: Element | string;
  /**
   * The title for the editor.
   * @deprecated no longer does anything
   */
  title?: string;
  /**
   * The width of the editor.
   * @deprecated prefer simply styling the outer element
   */
  width?: string;
  /**
   * The height of the editor.
   * @deprecated prefer simply styling the outer element
   */
  height?: string;
  /**
   * Record of CSS Variables and their values to be applied to the editor.
   */
  cssVariables?: Record<string, string>;
  /**
   * Whether the editor should grow to fit its content.
   * @deprecated prefer setting no max-height on the outer element
   */
  growEditor?: boolean;
  /**
   * Whether the editor will be rendered using the shadow DOM
   */
  shadowDom?: boolean;
} & EditorOptions;
