import type { PluginInitializer } from '../../shared-types/editor-options';

export interface BesluitTopicConfig {
  widgetLocation: 'toolbar' | 'sidebar';
  endpoint: string;
}

export const setupBesluitTopicPlugin: PluginInitializer<BesluitTopicConfig> = (
  _setup,
  config,
) => {
  return { name: 'besluit-topic', config };
};
