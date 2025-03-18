import type { PluginOptions } from 'plugin-registry';
import type { PluginName } from './embedded-plugin';
import type { Kebab, KebabKeys } from './type-utils';
import type { OtherOptions } from 'plugin-registry';

export type KebabPluginName = Kebab<PluginName>;

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
  plugins?: KebabPluginName[];
  /**
   * The options to initialize the editor with.
   */
  options?: KebabKeys<PluginOptions> & OtherOptions;
  /**
   * Record of CSS Variables and their values to be applied to the editor.
   */
  cssVariables?: Record<string, string>;
  /**
   * Whether the editor should grow to fit its content.
   */
  growEditor?: boolean;
};
