import { roadsign_regulation } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin/nodes';
import type { PluginInitializer } from '../../shared-types/editor-options';

export type RoadsignRegulationPluginConfig = unknown;
export const setupRoadsignRegulationPlugin: PluginInitializer<
  RoadsignRegulationPluginConfig
> = (_setup, config) => {
  return {
    name: 'roadsign-regulation',
    config,
    nodes: { roadsign_regulation },
  };
};
