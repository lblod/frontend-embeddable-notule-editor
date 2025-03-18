import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../config/defaults';
import { v4 as uuidv4 } from 'uuid';

const name = 'besluit' as const;
interface BesluitPluginConfig {
  uriGenerator: () => string;
  fullLengthArticles: boolean;
  onlyArticleSpecialName: boolean;
}

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof besluitPlugin;
  }
  export interface PluginOptions {
    [name]?: Partial<BesluitPluginConfig>;
  }
}
const defaultConfig: BesluitPluginConfig = {
  fullLengthArticles: true,
  onlyArticleSpecialName: false,
  uriGenerator: () => `http://data.lblod.info/artikels/${uuidv4()}`,
};
export const besluitPlugin = (({ options, plugins }) => {
  if (plugins?.includes('article-structure')) {
    throw new Error(`The besluit and article-structure plugins can not be active at the same time.
        They configure the editor to handle two different kinds of documents: 'besluiten' or 'reglementen'
        (The plugin name of 'article-structure', instead of 'reglement', is due to historical reasons)
        `);
  }
  return {
    name,
    config: mergeConfigs(defaultConfig, options?.besluit),
  };
}) satisfies PluginInitializer;
