import type { PluginInitializer } from '../embedded-plugin.ts';
import { mergeConfigs } from '../setup/defaults';
import { v4 as uuidv4 } from 'uuid';
import type { TOC } from '@ember/component/template-only';
import InsertArticleComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/decision-plugin/insert-article';
import type { WidgetSignature } from '../widgets';
import {
  structureWithConfig,
  structureViewWithConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/structure-plugin/node';
import type { SayController } from '@lblod/ember-rdfa-editor';
import type { SayNodeViewConstructor } from '@lblod/ember-rdfa-editor/utils/ember-node';

const name = 'besluit';

export interface BesluitPluginConfig {
  uriGenerator: () => string;
  fullLengthArticles: boolean;
  onlyArticleSpecialName: boolean;
  decisionUri?: string;
}

export const articleInsert: TOC<WidgetSignature> = <template>
  <InsertArticleComponent
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.besluit.config}}
    @label="Voeg artikel in"
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
  const config = mergeConfigs(defaultConfig, options?.besluit);
  return {
    name,
    config,

    nodes: {
      structure: structureWithConfig(config),
    },
    nodeViews: {
      structure: (controller: SayController): SayNodeViewConstructor =>
        structureViewWithConfig(config)(controller),
    } as Record<string, (controller: SayController) => SayNodeViewConstructor>,
    sidebarWidgets: {
      'besluit:article-insert': articleInsert,
    },
  };
}) satisfies PluginInitializer;
