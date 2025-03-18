import { roadsign_regulation } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin/nodes';
import type { RoadsignRegulationPluginOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../config/defaults';

const name = 'roadsignRegulation' as const;
declare module 'plugin-registry' {
  export interface PluginOptions {
    [name]?: RoadsignRegulationPluginOptions;
  }
  export interface EmbeddedPlugins {
    [name]: typeof setupRoadsignRegulationPlugin;
  }
}
const defaultConfig: RoadsignRegulationPluginOptions = {
  endpoint: 'https://dev.roadsigns.lblod.info/sparql',
  imageBaseUrl: 'https://register.mobiliteit.vlaanderen.be/',
};
export const setupRoadsignRegulationPlugin = (({ options }) => {
  return {
    name,
    config: mergeConfigs(defaultConfig, options?.['roadsign-regulation']),
    nodes: { roadsign_regulation },
  };
}) satisfies PluginInitializer;
