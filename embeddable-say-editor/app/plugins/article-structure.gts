import type { TOC } from '@ember/component/template-only';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import type { WidgetSignature } from '../../shared-types/widgets';
import { v4 as uuidv4 } from 'uuid';
import ArticleStructureInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/article-structure-plugin/article-structure-card';
import { mergeConfigs } from '../config/defaults';

const name = 'articleStructure' as const;

interface ArticleStructureConfig {
  uriGenerator: () => string;
  fullLengthArticles: boolean;
  onlyArticleSpecialName: boolean;
}
declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof articleStructurePlugin;
  }
  export interface PluginOptions {
    [name]?: ArticleStructureConfig;
  }
  export interface SidebarListItemWidgets {
    'article-structure:insert': typeof insert;
  }
}
const insert: TOC<WidgetSignature<'articleStructure'>> = <template>
  <ArticleStructureInsert
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.articleStructure.config}}
  />
</template>;
const defaultConfig: ArticleStructureConfig = {
  uriGenerator: () => `http://data.lblod.info/artikels/${uuidv4()}`,
  fullLengthArticles: false,
  onlyArticleSpecialName: true,
};
export const articleStructurePlugin = (({ plugins, options }) => {
  if (plugins?.includes('besluit')) {
    throw new Error(`The besluit and article-structure plugins can not be active at the same time.
        They configure the editor to handle two different kinds of documents: 'besluiten' or 'reglementen'
        (The plugin name of 'article-structure', instead of 'reglement' is due to historical reasons)
        `);
  }
  return {
    name,
    sidebarWidgets: { 'article-structure:insert': insert },
    config: mergeConfigs(defaultConfig, options?.['article-structure']),
  };
}) satisfies PluginInitializer;
