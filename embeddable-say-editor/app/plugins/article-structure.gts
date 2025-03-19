import type { TOC } from '@ember/component/template-only';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import type { WidgetSignature } from '../../shared-types/widgets';
import ArticleStructureInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/article-structure-plugin/article-structure-card';

const name = 'articleStructure' as const;

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof articleStructurePlugin;
  }
  export interface SidebarListItemWidgets {
    'article-structure:insert': typeof insert;
  }
}
const insert: TOC<WidgetSignature> = <template>
  <ArticleStructureInsert
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.articleStructure.config}}
  />
</template>;
export const articleStructurePlugin = (({ plugins }) => {
  if (plugins?.includes('besluit')) {
    throw new Error(`The besluit and article-structure plugins can not be active at the same time.
        They configure the editor to handle two different kinds of documents: 'besluiten' or 'reglementen'
        (The plugin name of 'article-structure', instead of 'reglement' is due to historical reasons)
        `);
  }
  return { name, sidebarWidgets: { 'article-structure:insert': insert } };
}) satisfies PluginInitializer;
