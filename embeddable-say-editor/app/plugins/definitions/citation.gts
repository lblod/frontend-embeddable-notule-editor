import {
  citationPlugin,
  type CitationPluginEmberComponentConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';
import type { PluginInitializer } from '../embedded-plugin';
import { mergeConfigs } from '../setup/defaults';
import type { EditorState } from '@lblod/ember-rdfa-editor';
import type { TOC } from '@ember/component/template-only';
import CitationInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/citation-plugin/citation-insert';
import CitationEditCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/citation-plugin/citation-card';
import type { WidgetSignature } from '../widgets';

const name = 'citation';

export const citationInsert: TOC<WidgetSignature<'citation'>> = <template>
  <CitationInsert
    @controller={{@controller}}
    @config={{@setup.pluginSpecs.citation.config}}
  />
</template>;

export const citationEdit: TOC<WidgetSignature<'citation'>> = <template>
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
      'citation:insert': citationInsert,
      'citation:edit': citationEdit,
    },
  };
}) satisfies PluginInitializer;
