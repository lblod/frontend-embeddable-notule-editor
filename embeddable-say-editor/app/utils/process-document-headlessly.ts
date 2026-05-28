import SaySerializer from '@lblod/ember-rdfa-editor/core/say-serializer';
import { EditorState, ProseParser } from '@lblod/ember-rdfa-editor';
import type { TransactionCombinatorResult } from '@lblod/ember-rdfa-editor/utils/transaction-utils';
import { htmlToDoc } from '@lblod/ember-rdfa-editor/utils/_private/html-utils';
import { defaultAttributeValueGeneration } from '@lblod/ember-rdfa-editor/plugins/default-attribute-value-generation';
import { removePropertiesOfDeletedNodes } from '@lblod/ember-rdfa-editor/plugins/remove-properties-of-deleted-nodes';
import { rdfaInfoPlugin } from '@lblod/ember-rdfa-editor/plugins/rdfa-info';
import { v4 as uuidv4 } from 'uuid';
import type { PluginInitArgs } from '../plugins/embedded-plugin.ts';
import { setupPlugins } from '../plugins/setup/setup-plugins.ts';
import { onChangedPlugin } from '@lblod/ember-rdfa-editor/plugins/on-changed/plugin';

export function processDocumentHeadlessly(
  html: string,
  transactionGenerator: (
    state: EditorState,
  ) => TransactionCombinatorResult<boolean>,
  editorConfig: PluginInitArgs,
): string {
  let state = getState(html, editorConfig);
  const combResult = transactionGenerator(state);
  if (combResult.result.every((ok) => ok)) {
    state = state.applyTransaction(combResult.transaction).state;
  }
  const serializer = SaySerializer.fromSchema(state.schema, () => state);
  const div = document.createElement('div');
  const doc = serializer.serializeNode(state.doc, undefined);
  div.appendChild(doc);

  return div.innerHTML;
}

function getState(html: string, editorConfig: PluginInitArgs): EditorState {
  const { schema, prosePlugins } = setupPlugins({intl: {t: () => {}},...editorConfig});
  const parser = ProseParser.fromSchema(schema);
  const doc = htmlToDoc(html, {
    schema: schema,
    parser,
  });
  console.log(prosePlugins)

  const state = EditorState.create({
    doc,
    // We need to configure some additional (default) plugins for the headless editor
    // (they are already configured by default on the headful one)
    plugins: [
      defaultAttributeValueGeneration([
        {
          attribute: '__guid',
          generator() {
            return uuidv4();
          },
        },
        {
          attribute: '__rdfaId',
          generator() {
            return uuidv4();
          },
        },
      ]),
      removePropertiesOfDeletedNodes(),
      rdfaInfoPlugin(),
      onChangedPlugin,
      ...prosePlugins,
    ],
  });
  return state;
}
