import type { PluginInitializer } from '../../shared-types/editor-options';

interface BesluitPluginConfig {
  uriGenerator: () => string;
  fullLengthArticles: boolean;
  onlyArticleSpecialName: boolean;
}
export const besluitPlugin: PluginInitializer<BesluitPluginConfig> = (
  setup,
  config,
) => {
  if (setup.activePlugins.includes('article-structure')) {
    throw new Error(`The besluit and article-structure plugins can not be active at the same time.
        They configure the editor to handle two different kinds of documents: 'besluiten' or 'reglementen'
        (The plugin name of 'article-structure', instead of 'reglement', is due to historical reasons)
        `);
  }
  return { name: 'besluit', config };
};
