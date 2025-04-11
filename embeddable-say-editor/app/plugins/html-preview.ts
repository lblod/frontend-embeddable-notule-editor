import type { PluginInitializer } from '../../shared-types/embedded-plugin.ts';
import HTMLPreviewMenu from '../components/html-preview/menu.gts';
const name = 'htmlPreview';

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
