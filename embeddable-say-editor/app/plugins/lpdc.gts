import type { TOC } from '@ember/component/template-only';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import type { WidgetSignature } from '../../shared-types/widgets';
import LpdcInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/lpdc-plugin/lpdc-insert';

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    lpdc: typeof setupLpdcPlugin;
  }
  export interface SidebarListItemWidgets {
    'lpdc:insert': typeof insert;
  }
}

const insert: TOC<WidgetSignature> = <template>
  <LpdcInsert
    @controller={{@controller}}
    @config={{@setup.pluginSpecs.lpdc.config}}
  />
</template>;
export const setupLpdcPlugin = (() => {
  return { name: 'lpdc', sidebarWidgets: { 'lpdc:insert': insert } };
}) satisfies PluginInitializer;
