import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import HTMLPreviewMenu from '../components/html-preview/menu.gts';
const name = 'htmlPreview' as const;

declare module '../../shared-types/plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupHtmlPreview;
  }
  export interface ToolbarWidgets {
    'html:preview': typeof HTMLPreviewMenu;
  }
}
export const setupHtmlPreview = (() => {
  return {
    name,
    toolbarWidgets: {
      'html:preview': HTMLPreviewMenu,
    },
  };
}) satisfies PluginInitializer;
