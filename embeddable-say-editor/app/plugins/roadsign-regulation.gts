import { roadsign_regulation } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin/nodes';
import type { RoadsignRegulationPluginOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../config/defaults';
import RoadsignRegulationInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/roadsign-regulation-plugin/roadsign-regulation-card';
import type { TOC } from '@ember/component/template-only';
import type { WidgetSignature } from '../../shared-types/widgets';

const name = 'roadsignRegulation' as const;
declare module 'plugin-registry' {
  export interface PluginOptions {
    [name]?: RoadsignRegulationPluginOptions;
  }
  export interface EmbeddedPlugins {
    [name]: typeof setupRoadsignRegulationPlugin;
  }
  export interface SidebarListItemWidgets {
    'roadsign-regulation:insert': typeof insert;
  }
}

const insert: TOC<WidgetSignature<'roadsignRegulation'>> = <template>
  <RoadsignRegulationInsert
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.roadsignRegulation.config}}
  />
</template>;
const defaultConfig: RoadsignRegulationPluginOptions = {
  endpoint: 'https://dev.roadsigns.lblod.info/sparql',
  imageBaseUrl: 'https://register.mobiliteit.vlaanderen.be/',
};
export const setupRoadsignRegulationPlugin = (({ options }) => {
  return {
    name,
    config: mergeConfigs(defaultConfig, options?.['roadsign-regulation']),
    nodes: { roadsign_regulation },
    sidebarWidgets: { 'roadsign-regulation:insert': insert },
  };
}) satisfies PluginInitializer;
