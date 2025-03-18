import {
  osloLocation,
  osloLocationView,
  type LocationPluginConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/location-plugin/node';
import { mergeConfigs } from '../config/defaults';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';

const name = 'location' as const;
type Config = LocationPluginConfig & {
  defaultMunicipality?: string;
  locationOptions: ['address', 'place', 'area'];
};
declare module 'plugin-registry' {
  export interface PluginOptions {
    [name]?: Config;
  }
  export interface EmbeddedPlugins {
    [name]: typeof setupLocationPlugin;
  }
}
const defaultConfig: Config = {
  defaultPointUriRoot: 'https://example.net/id/geometrie/',
  defaultPlaceUriRoot: 'https://example.net/id/plaats/',
  defaultAddressUriRoot: 'https://example.net/id/adres/',
  locationOptions: ['address', 'place', 'area'],
};
export const setupLocationPlugin = (({ options }) => {
  const config = mergeConfigs(defaultConfig, options?.location);
  return {
    name,
    nodes: { oslo_location: osloLocation(config) },
    config,
    nodeViews: {
      oslo_location: (controller) => osloLocationView(config)(controller),
    },
  };
}) satisfies PluginInitializer;
