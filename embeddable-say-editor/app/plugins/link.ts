import {
  linkView,
  link,
  linkPasteHandler,
} from '@lblod/ember-rdfa-editor/plugins/link';
import type { PluginInitializer } from '../../shared-types/editor-options';

export type LinkPluginConfig = unknown;
export const setupLinkPlugin: PluginInitializer<LinkPluginConfig> = (
  _setup,
  config,
) => {
  const linkConfig = { interactive: true, rdfaAware: true };

  const nodes = {
    link: link(linkConfig),
  };
  return {
    name: 'link',
    config,
    nodes,
    nodeViews: { link: linkView(linkConfig) },
    prosePlugins: [linkPasteHandler(nodes.link)],
  };
};
