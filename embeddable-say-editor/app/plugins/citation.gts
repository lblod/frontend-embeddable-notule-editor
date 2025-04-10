import {
  citationPlugin,
  type CitationPluginEmberComponentConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../setup/defaults';
import type { EditorState } from '@lblod/ember-rdfa-editor';
import type { TOC } from '@ember/component/template-only';
import CitationInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/citation-plugin/citation-insert';
import CitationEditCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/citation-plugin/citation-card';
import type { WidgetSignature } from '../../shared-types/widgets';

const name = 'citation' as const;

declare module '../../shared-types/plugin-registry' {
  export interface PluginOptions {
    [name]?: Partial<CitationPluginEmberComponentConfig>;
  }
  export interface EmbeddedPlugins {
    [name]: typeof setupCitationPlugin;
  }
  export interface SidebarWidgets {
    'citation:edit': typeof edit;
  }
  export interface SidebarListItemWidgets {
    'citation:insert': typeof insert;
  }
}

const insert: TOC<WidgetSignature<'citation'>> = <template>
  <CitationInsert
    @controller={{@controller}}
    @config={{@setup.pluginSpecs.citation.config}}
  />
</template>;

const edit: TOC<WidgetSignature<'citation'>> = <template>
  <CitationEditCard
    @controller={{@controller}}
    @config={{@setup.pluginSpecs.citation.config}}
  />
</template>;
const defaultConfig: CitationPluginEmberComponentConfig = {
  activeInRanges: (state: EditorState) => [[0, state.doc.content.size]],
  endpoint: 'https://codex.opendata.api.vlaanderen.be:8888/sparql',
};
export const setupCitationPlugin = (({ options }) => {
  const config = mergeConfigs(defaultConfig, options?.citation);

  return {
    name,
    config,
    prosePlugins: [citationPlugin(config)],
    sidebarWidgets: {
      'citation:insert': insert,
      'citation:edit': edit,
    },
  };
}) satisfies PluginInitializer;
