import {
  linkView,
  link,
  linkPasteHandler,
} from '@lblod/ember-rdfa-editor/plugins/link';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';

const name = 'link' as const;

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupLinkPlugin;
  }
}
export const setupLinkPlugin = (() => {
  const config = { interactive: true, rdfaAware: true };

  const nodes = {
    link: link(config),
  };
  return {
    name,
    config,
    nodes,
    nodeViews: { link: linkView(config) },
    prosePlugins: [linkPasteHandler(nodes.link)],
  };
}) satisfies PluginInitializer;
