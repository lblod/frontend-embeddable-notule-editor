import {
  em,
  strikethrough,
  strong,
  subscript,
  superscript,
  underline,
} from '@lblod/ember-rdfa-editor/plugins/text-style';
import {
  docWithConfig,
  paragraph,
  text,
  hard_break,
  horizontal_rule,
  repairedBlockWithConfig,
  blockRdfaWithConfig,
  invisibleRdfaWithConfig,
} from '@lblod/ember-rdfa-editor/nodes';
import { placeholder } from '@lblod/ember-rdfa-editor/plugins/placeholder';
import { blockquote } from '@lblod/ember-rdfa-editor/plugins/blockquote';
import { code_block } from '@lblod/ember-rdfa-editor/plugins/code';
import type { PluginInitializer } from '../../shared-types/editor-options';
import { highlight } from '@lblod/ember-rdfa-editor/plugins/highlight/marks/highlight';
import { color } from '@lblod/ember-rdfa-editor/plugins/color/marks/color';
import { firefoxCursorFix } from '@lblod/ember-rdfa-editor/plugins/firefox-cursor-fix';
import { lastKeyPressedPlugin } from '@lblod/ember-rdfa-editor/plugins/last-key-pressed';
import recreateUuidsOnPaste from '@lblod/ember-rdfa-editor/plugins/recreateUuidsOnPaste';

import {
  createInvisiblesPlugin,
  hardBreak,
  heading as headingInvisible,
  paragraph as paragraphInvisible,
} from '@lblod/ember-rdfa-editor/plugins/invisibles';
import {
  bulletListWithConfig,
  listItemWithConfig,
  orderedListWithConfig,
} from '@lblod/ember-rdfa-editor/plugins/list';
import { headingWithConfig } from '@lblod/ember-rdfa-editor/plugins/heading';
import { inlineRdfaWithConfig } from '@lblod/ember-rdfa-editor/nodes/inline-rdfa';
type CoreConfig = { docContent: string };

export const coreSetup: PluginInitializer<CoreConfig> = (_setup, config) => {
  const nodes = {
    doc: docWithConfig({
      content: config.docContent ?? 'block+',
      rdfaAware: true,
    }),
    paragraph,
    repaired_block: repairedBlockWithConfig({ rdfaAware: true }),
    list_item: listItemWithConfig(),
    ordered_list: orderedListWithConfig(),
    bullet_list: bulletListWithConfig(),
    placeholder,
    blockquote,
    horizontal_rule,
    code_block,
    text,
    hard_break,

    heading: headingWithConfig({ rdfaAware: true }),
    block_rdfa: blockRdfaWithConfig({ rdfaAware: true }),
    inline_rdfa: inlineRdfaWithConfig({ rdfaAware: true }),
    invisible_rdfa: invisibleRdfaWithConfig({ rdfaAware: true }),
  };
  const marks = {
    em,
    strong,
    underline,
    strikethrough,
    highlight,
    color,
    subscript,
    superscript,
  };
  const prosePlugins = [
    firefoxCursorFix(),
    lastKeyPressedPlugin,
    recreateUuidsOnPaste,
    createInvisiblesPlugin([hardBreak, paragraphInvisible, headingInvisible], {
      shouldShowInvisibles: false,
    }),
  ];
  return { name: 'core', config, nodes, marks, prosePlugins };
};
