import BesluitTopicDropdown from '@lblod/ember-rdfa-editor-lblod-plugins/components/besluit-topic-plugin/besluit-topic-toolbar-dropdown';
import { mergeConfigs } from '../setup/defaults.ts';
import type { TOC } from '@ember/component/template-only';
import type { PluginInitializer } from '../embedded-plugin.ts';
import type { WidgetSignature } from '../widgets.ts';

const name = 'besluitTopic';
export interface BesluitTopicConfig {
  widgetLocation: 'toolbar' | 'sidebar';
  endpoint: string;
  decisionUri?: string;
}

declare module '../plugin-registry' {
  interface EmbeddedPlugins {
    [name]: typeof besluitTopic;
  }
  interface PluginOptions {
    [name]?: Partial<BesluitTopicConfig>;
  }
  interface ToolbarWidgets {
    'besluit:topic': typeof besluitTopicWidget;
  }
  interface SidebarWidgets {
    'besluit:topic': typeof besluitTopicWidget;
  }
}

const besluitTopicWidget: TOC<WidgetSignature<'besluitTopic'>> = <template>
  <BesluitTopicDropdown
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.besluitTopic.config}}
  />
</template>;
const defaultConfig: BesluitTopicConfig = {
  widgetLocation: 'toolbar',
  endpoint: 'https://data.vlaanderen.be/sparql',
};

export const besluitTopic = (({ options }) => {
  const config = options?.besluitTopic;

  return {
    name,
    config: mergeConfigs(defaultConfig, config),
    toolbarWidgets: { 'besluit:topic': besluitTopicWidget },
    sidebarWidgets: { 'besluit:topic': besluitTopicWidget },
  };
}) satisfies PluginInitializer;
