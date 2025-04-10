import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import HTMLEditorMenu from '@lblod/ember-rdfa-editor/components/plugins/html-editor/menu';
const name = 'htmlEdit' as const;

declare module '../../shared-types/plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupHtmlEdit;
  }
  export interface ToolbarWidgets {
    'html:edit': typeof HTMLEditorMenu;
  }
}
export const setupHtmlEdit = (() => {
  return {
    name,
    toolbarWidgets: {
      'html:edit': HTMLEditorMenu,
    },
  };
}) satisfies PluginInitializer;
