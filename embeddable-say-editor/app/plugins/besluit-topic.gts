import BesluitTopicDropdown from '@lblod/ember-rdfa-editor-lblod-plugins/components/besluit-topic-plugin/besluit-topic-toolbar-dropdown';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../config/defaults';
import type { TOC } from '@ember/component/template-only';
import type { WidgetSignature } from '../../shared-types/widgets';

const name = 'besluitTopic' as const;
export interface BesluitTopicConfig {
  widgetLocation: 'toolbar' | 'sidebar';
  endpoint: string;
}

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof besluitTopic;
  }
  export interface PluginOptions {
    [name]?: Partial<BesluitTopicConfig>;
  }
  export interface ToolbarWidgets {
    'besluit:topic': typeof besluitTopicWidget;
  }
  export interface SidebarWidgets {
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
  const config = options?.['besluit-topic'];

  return {
    name,
    config: mergeConfigs(defaultConfig, config),
    toolbarWidgets: { 'besluit:topic': besluitTopicWidget },
    sidebarWidgets: { 'besluit:topic': besluitTopicWidget },
  };
}) satisfies PluginInitializer;
