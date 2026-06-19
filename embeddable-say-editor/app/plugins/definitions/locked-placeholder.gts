import {
  inlineLockedPlaceholder,
  inlineLockedPlaceholderView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/locked-placeholder-plugin/nodes/inline-locked-placeholder';

import {
  blockLockedPlaceholder,
  blockLockedPlaceholderView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/locked-placeholder-plugin/nodes/block-locked-placeholder';
import type { PluginInitializer } from '../embedded-plugin.ts';

const name = 'lockedPlaceholder';

export const setupLockedPlaceholderPlugin = (() => {
  const nodes = {
    inline_locked_placeholder: inlineLockedPlaceholder,
    block_locked_placeholder: blockLockedPlaceholder,
  };
  return {
    name,
    nodes,
    nodeViews: {
      inline_locked_placeholder: inlineLockedPlaceholderView,
      block_locked_placeholder: blockLockedPlaceholderView,
    },
  };
}) satisfies PluginInitializer;
