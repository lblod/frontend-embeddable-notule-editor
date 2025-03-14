import type { PluginInitializer } from '../../shared-types/editor-options';
export type LpdcPluginConfig = unknown;

export const setupLpdcPlugin: PluginInitializer<LpdcPluginConfig> = (
  _setup,
  config,
) => {
  return { name: 'lpdc', config };
};
