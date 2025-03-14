import { roadsign_regulation } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin/nodes';
import type { PluginInitializer } from '../../shared-types/editor-options';
import type { RoadsignRegulationPluginOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin';

export const setupRoadsignRegulationPlugin: PluginInitializer<
  RoadsignRegulationPluginOptions
> = (_setup, config) => {
  return {
    name: 'roadsign-regulation',
    config,
    nodes: { roadsign_regulation },
  };
};
