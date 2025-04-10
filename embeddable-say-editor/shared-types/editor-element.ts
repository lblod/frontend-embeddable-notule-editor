import type SayController from '@lblod/ember-rdfa-editor/core/say-controller';
import type { KebabPluginName, UserPluginOptions } from './embedded-plugin';

/**
 * An HTML element with the class `notule-editor`.
 * These are functions available from the editor element.
 * :warning: **`initEditor` has to be called before accessing any other methods**.
 */
export type EditorElement = HTMLElement & {
  /**
   * provides direct access to a [SayController](https://github.com/lblod/ember-rdfa-editor/blob/master/addon/core/say-controller.ts) object.
   */
  controller: SayController;
  /**
   * Initialize the editor by passing an array of plugin names that should be activated and an object that contains the configuration for the editor and its plugins.
   * See {@link file://./README.md#managing-plugins} for more info.
   */
  initEditor: (
    arrayOfPluginNames: readonly KebabPluginName[],
    options: UserPluginOptions,
  ) => Promise<void>;
  /**
   * enable the banner that shows the environment and versions of plugins used.
   */
  enableEnvironmentBanner: () => void;
  /**
   * disable the banner.
   */
  disableEnvironmentBanner: () => void;
  /**
   * set the HTML content inside the editor, overwriting all previous content.
   */
  setHtmlContent: (content: string) => void;
  /**
   * Get the HTML content of the editor.
   * This might be different than custom content set via `setHtmlContent`, because of HTML parsing logic.
   */
  getHtmlContent: () => string;
  /**
   * set the current locale of the editor.
   * Any locale is accepted, but will fallback to `nl-BE` if it is not `nl-BE` or `en-US` (the supported languages).
   */
  setLocale: (locale: string) => void;
  /**
   * returns the current locale of the editor.
   * This will be the user's browser locale, the set local with `setLocale`, or `nl-BE`/`en-US`, the supported languages.
   */
  getLocale: () => string;
  /**
   * Set the locale (language used) of the editor to Dutch.
   */
  setLocaleToDutch: () => void;
  /**
   * Set the locale (language used) of the editor to English.
   */
  setLocaleToEnglish: () => void;
};
