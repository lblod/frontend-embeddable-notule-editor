import { roadsign_regulation } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin/nodes';
import type { RoadsignRegulationPluginOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin';
import type { PluginInitializer } from '../embedded-plugin';
import { mergeConfigs } from '../setup/defaults';
import RoadsignRegulationInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/roadsign-regulation-plugin/roadsign-regulation-card';
import type { TOC } from '@ember/component/template-only';
import type { WidgetSignature } from '../widgets';

const name = 'roadsignRegulation';

export const roadsignInsert: TOC<WidgetSignature<'roadsignRegulation'>> =
  <template>
    <RoadsignRegulationInsert
      @controller={{@controller}}
      @options={{@setup.pluginSpecs.roadsignRegulation.config}}
    />
  </template>;
const defaultConfig: RoadsignRegulationPluginOptions = {
  endpoint: 'https://dev.roadsigns.lblod.info/sparql',
  imageBaseUrl: 'https://dev.roadsigns.lblod.info/',
};
export const setupRoadsignRegulationPlugin = (({ options }) => {
  return {
    name,
    config: mergeConfigs(defaultConfig, options?.roadsignRegulation),
    nodes: { roadsign_regulation },
    sidebarWidgets: { 'roadsign-regulation:insert': roadsignInsert },
  };
}) satisfies PluginInitializer;
