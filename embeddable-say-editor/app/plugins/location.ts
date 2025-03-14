import {
  osloLocation,
  osloLocationView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/location-plugin/node';
import type { PluginInitializer } from '../../shared-types/editor-options';

export type LocationPluginConfig = {
  defaultAddressUriRoot: string;
  defaultPlaceUriRoot: string;
  defaultPointUriRoot: string;
};
export const setupLocationPlugin: PluginInitializer<LocationPluginConfig> = (
  _setup,
  config,
) => {
  return {
    name: 'location',
    nodes: { oslo_location: osloLocation(config) },
    config,
    nodeViews: {
      oslo_location: (controller) => osloLocationView(config)(controller),
    },
  };
};
