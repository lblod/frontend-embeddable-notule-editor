// This file split from ../process-document-headlessly.ts to prevent circular dependency loops in
// plugins which use these functions, such as the AR-design plugin.
import { v4 as uuidv4 } from 'uuid';
import SaySerializer from '@lblod/ember-rdfa-editor/core/say-serializer';
import { EditorState, ProseParser } from '@lblod/ember-rdfa-editor';
import type { TransactionCombinatorResult } from '@lblod/ember-rdfa-editor/utils/transaction-utils';
import { htmlToDoc } from '@lblod/ember-rdfa-editor/utils/_private/html-utils';
import { defaultAttributeValueGeneration } from '@lblod/ember-rdfa-editor/plugins/default-attribute-value-generation';
import { removePropertiesOfDeletedNodes } from '@lblod/ember-rdfa-editor/plugins/remove-properties-of-deleted-nodes';
import { rdfaInfoPlugin } from '@lblod/ember-rdfa-editor/plugins/rdfa-info';
import { onChangedPlugin } from '@lblod/ember-rdfa-editor/plugins/on-changed/plugin';
import type { EditorSetup } from '../../plugins/setup/setup-plugins.ts';

export function _processDocumentHeadlesslyFromEditorSetup(
  html: string,
  transactionGenerator: (
    state: EditorState,
  ) => TransactionCombinatorResult<boolean>,
  editorSetup: EditorSetup,
): string {
  const state = _getState(html, editorSetup);
  return _doProcessDocument(transactionGenerator, state);
}

export function _doProcessDocument(
  transactionGenerator: (
    state: EditorState,
  ) => TransactionCombinatorResult<boolean>,
  state: EditorState,
): string {
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

export function _getState(html: string, { schema, prosePlugins }: EditorSetup): EditorState {
  const parser = ProseParser.fromSchema(schema);
  const doc = htmlToDoc(html, {
    schema: schema,
    parser,
  });

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
