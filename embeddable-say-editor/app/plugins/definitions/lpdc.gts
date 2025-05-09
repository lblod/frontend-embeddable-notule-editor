import type { TOC } from '@ember/component/template-only';
import type { PluginInitializer } from '../embedded-plugin';
import type { WidgetSignature } from '../widgets';
import LpdcInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/lpdc-plugin/lpdc-insert';
import { mergeConfigs } from '../setup/defaults';

export interface LpdcConfig {
  /** @deprecated use the explicit lpdcEndpoint where you specify the full url*/
  endpoint?: string;
  lpdcEndpoint?: string;
  decisionUri?: string;
}

export const lpdcInsert: TOC<WidgetSignature<'lpdc'>> = <template>
  <LpdcInsert
    @controller={{@controller}}
    @config={{@setup.pluginSpecs.lpdc.config}}
  />
</template>;
const defaultConfig: LpdcConfig = {
  lpdcEndpoint: 'https://some.endpoint.be/lpdc/doc/instanties',
};
export const setupLpdcPlugin = (({ options }) => {
  const { endpoint, lpdcEndpoint, ...rest } = mergeConfigs(
    defaultConfig,
    options?.lpdc,
  );
  const fullEndpoint = lpdcEndpoint ?? endpoint + '/doc/instantie';
  const pluginConfig = { ...rest, endpoint: fullEndpoint };
  return {
    name: 'lpdc',
    config: pluginConfig,
    sidebarWidgets: { 'lpdc:insert': lpdcInsert },
  };
}) satisfies PluginInitializer;
