import type { PluginInitializer } from '../../shared-types/embedded-plugin';

const name = 'articleStructure' as const;

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof articleStructurePlugin;
  }
}
export const articleStructurePlugin = (({ plugins }) => {
  if (plugins?.includes('besluit')) {
    throw new Error(`The besluit and article-structure plugins can not be active at the same time.
        They configure the editor to handle two different kinds of documents: 'besluiten' or 'reglementen'
        (The plugin name of 'article-structure', instead of 'reglement' is due to historical reasons)
        `);
  }
  return { name };
}) satisfies PluginInitializer;
