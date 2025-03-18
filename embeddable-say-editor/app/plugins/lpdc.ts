import type { PluginInitializer } from '../../shared-types/embedded-plugin';

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    lpdc: typeof setupLpdcPlugin;
  }
}
export const setupLpdcPlugin = (() => {
  return { name: 'lpdc' };
}) satisfies PluginInitializer;
