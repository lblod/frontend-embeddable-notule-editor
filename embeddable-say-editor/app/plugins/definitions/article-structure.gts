import type { TOC } from '@ember/component/template-only';
import ArticleStructureInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/article-structure-plugin/article-structure-card';
import {
  structureWithConfig,
  structureViewWithConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/structure-plugin/node';
import type { StructurePluginOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/structure-plugin/structure-types';
import type { SayNodeViewConstructor } from '@lblod/ember-rdfa-editor/utils/ember-node';
import type { SayController } from '@lblod/ember-rdfa-editor';
import type { WidgetSignature } from '../widgets.ts';
import type { PluginInitializer } from '../embedded-plugin.ts';

const name = 'articleStructure';

export const insert: TOC<WidgetSignature<'articleStructure'>> = <template>
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
  const structureConfig: StructurePluginOptions = {
    uriGenerator: 'template-uuid4',
    fullLengthArticles: true,
    onlyArticleSpecialName: false,
  };
  return {
    name,
    sidebarWidgets: { 'article-structure:insert': insert },
    config: structureConfig,
    nodes: {
      structure: structureWithConfig(structureConfig),
    },
    nodeViews: {
      structure: (controller: SayController): SayNodeViewConstructor =>
        structureViewWithConfig(structureConfig)(controller),
    } as Record<string, (controller: SayController) => SayNodeViewConstructor>,
  };
}) satisfies PluginInitializer;
