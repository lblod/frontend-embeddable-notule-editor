import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../config/defaults';

const name = 'besluitTopic' as const;
export interface BesluitTopicConfig {
  widgetLocation: 'toolbar' | 'sidebar';
  endpoint: string;
}

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof besluitTopic;
  }
  export interface PluginOptions {
    [name]?: Partial<BesluitTopicConfig>;
  }
}
const defaultConfig: BesluitTopicConfig = {
  widgetLocation: 'toolbar',
  endpoint: 'https://data.vlaanderen.be/sparql',
};

export const besluitTopic = (({ options }) => {
  const config = options?.['besluit-topic'];

  return { name, config: mergeConfigs(defaultConfig, config) };
}) satisfies PluginInitializer;
