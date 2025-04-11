import type { EditorOptions } from './embedded-plugin';

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
   * Record of CSS Variables and their values to be applied to the editor.
   */
  cssVariables?: Record<string, string>;
  /**
   * Whether the editor should grow to fit its content.
   */
  growEditor?: boolean;
} & EditorOptions;
