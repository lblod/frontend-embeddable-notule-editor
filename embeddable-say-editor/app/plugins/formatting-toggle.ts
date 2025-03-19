import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import FormattingToggle from '@lblod/ember-rdfa-editor/components/plugins/formatting/formatting-toggle';
const name = 'formattingToggle' as const;

declare module 'plugin-registry' {
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
