import type { TOC } from '@ember/component/template-only';
import type { PluginInitializer } from '../embedded-plugin';
import type { WidgetSignature } from '../widgets';
import LpdcInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/lpdc-plugin/lpdc-insert';
import { mergeConfigs } from '../setup/defaults';

export interface LpdcConfig {
  endpoint: string;
  decisionUri?: string;
}

export const lpdcInsert: TOC<WidgetSignature<'lpdc'>> = <template>
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
    sidebarWidgets: { 'lpdc:insert': lpdcInsert },
  };
}) satisfies PluginInitializer;
