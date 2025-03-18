import {
  table_of_contents,
  tableOfContentsView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/table-of-contents-plugin/nodes';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';

const name = 'tableOfContents' as const;
declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupTableOfContentsPlugin;
  }
}

export const setupTableOfContentsPlugin = (({ plugins }) => {
  if (
    !(plugins?.includes('article-structure') || plugins?.includes('besluit'))
  ) {
    console.warn(
      `The table of contents plugin will not show any contents unless either the 'besluit' or 'article-structure' plugins are active,
        as they set up the nodes which the ToC builds its contents from (articles, chapters, etc)`,
    );
  }

  return {
    name,
    nodes: { table_of_contents: table_of_contents() },
    nodeViews: {
      table_of_contents: tableOfContentsView(),
    },
  };
}) satisfies PluginInitializer;
