import {
  osloLocation,
  osloLocationView,
  type LocationPluginConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/location-plugin/node';
import { mergeConfigs } from '../setup/defaults';
import OSLOLocationInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/location-plugin/insert';
import type { PluginInitializer } from '../embedded-plugin';
import type { TOC } from '@ember/component/template-only';
import type { WidgetSignature } from '../widgets';

const name = 'location';
type Config = LocationPluginConfig & {
  defaultMunicipality?: string;
  locationTypes: Array<'address' | 'place' | 'area'>;
};
declare module '../plugin-registry' {
  export interface PluginOptions {
    [name]?: Partial<Config>;
  }
  export interface EmbeddedPlugins {
    [name]: typeof setupLocationPlugin;
  }
  export interface SidebarListItemWidgets {
    'location:insert': typeof insert;
  }
}
const insert: TOC<WidgetSignature<'location'>> = <template>
  <OSLOLocationInsert
    @controller={{@controller}}
    @config={{@setup.pluginSpecs.location.config}}
    @defaultMunicipality={{@setup.pluginSpecs.location.config.defaultMunicipality}}
    @locationTypes={{@setup.pluginSpecs.location.config.locationTypes}}
  />
</template>;
const defaultConfig: Config = {
  defaultPointUriRoot: 'https://example.net/id/geometrie/',
  defaultPlaceUriRoot: 'https://example.net/id/plaats/',
  defaultAddressUriRoot: 'https://example.net/id/adres/',
  locationTypes: ['address', 'place', 'area'],
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
    sidebarWidgets: { 'location:insert': insert },
  };
}) satisfies PluginInitializer;
