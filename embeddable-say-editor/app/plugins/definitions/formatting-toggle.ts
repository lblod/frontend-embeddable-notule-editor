import FormattingToggle from '@lblod/ember-rdfa-editor/components/plugins/formatting/formatting-toggle';
import type { PluginInitializer } from '../embedded-plugin.ts';
const name = 'formattingToggle';

declare module '../plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupFormattingToggle;
  }
  export interface ToolbarWidgets {
    formatting: typeof FormattingToggle;
  }
}
export const setupFormattingToggle = (() => {
  return {
    name,
    toolbarWidgets: {
      formatting: FormattingToggle,
    },
  };
}) satisfies PluginInitializer;
