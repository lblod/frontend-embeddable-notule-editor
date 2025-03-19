import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../config/defaults';
import { v4 as uuidv4 } from 'uuid';
import type { TOC } from '@ember/component/template-only';
import InsertArticleComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/decision-plugin/insert-article';
import type { WidgetSignature } from '../../shared-types/widgets';

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
  export interface SidebarListItemWidgets {
    'besluit:article-insert': typeof articleInsert;
  }
}
const articleInsert: TOC<WidgetSignature> = <template>
  <InsertArticleComponent
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.besluit.config}}
    @label='Voeg artikel in'
  />
</template>;

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
    sidebarWidgets: {
      'besluit:article-insert': articleInsert,
    },
  };
}) satisfies PluginInitializer;
