import type { TOC } from '@ember/component/template-only';
import type { PluginInitializer } from '../embedded-plugin';
import type { WidgetSignature } from '../widgets';
import LpdcInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/lpdc-plugin/lpdc-insert';
import { mergeConfigs } from '../setup/defaults';

const name = 'lpdc';
interface LpdcConfig {
  endpoint: string;
  decisionUri?: string;
}
declare module '../plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupLpdcPlugin;
  }
  export interface PluginOptions {
    [name]?: Partial<LpdcConfig>;
  }
  export interface SidebarListItemWidgets {
    'lpdc:insert': typeof insert;
  }
}

const insert: TOC<WidgetSignature<'lpdc'>> = <template>
  <LpdcInsert
    @controller={{@controller}}
    @config={{@setup.pluginSpecs.lpdc.config}}
  />
</template>;
const defaultConfig: LpdcConfig = {
  endpoint: 'https://some.endpoint.be/lpdc',
};
export const setupLpdcPlugin = (({ options }) => {
  return {
    name: 'lpdc',
    config: mergeConfigs(defaultConfig, options?.lpdc),
    sidebarWidgets: { 'lpdc:insert': insert },
  };
}) satisfies PluginInitializer;
