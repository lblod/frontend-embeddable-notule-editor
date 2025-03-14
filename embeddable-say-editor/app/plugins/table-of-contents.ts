import {
  table_of_contents,
  tableOfContentsView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/table-of-contents-plugin/nodes';
import type { PluginInitializer } from '../../shared-types/editor-options';
export type TableOfContentsPluginConfig = Parameters<
  typeof table_of_contents
>[0];

export const setupTableOfContentsPlugin: PluginInitializer<
  TableOfContentsPluginConfig
> = (setup, config) => {
  if (
    !(
      setup.activePlugins.includes('article-structure') ||
      setup.activePlugins.includes('besluit')
    )
  ) {
    console.warn(
      `The table of contents plugin will not show any contents unless either the 'besluit' or 'article-structure' plugins are active,
        as they set up the nodes which the ToC builds its contents from (articles, chapters, etc)`,
    );
  }

  return {
    name: 'table-of-contents',
    config,
    nodes: { table_of_contents: table_of_contents(config) },
    nodeViews: {
      table_of_contents: tableOfContentsView(config),
    },
  };
};
