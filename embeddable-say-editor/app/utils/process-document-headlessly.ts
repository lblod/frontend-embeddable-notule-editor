import type IntlService from 'ember-intl/services/intl';
import { EditorState } from '@lblod/ember-rdfa-editor';
import type { TransactionCombinatorResult } from '@lblod/ember-rdfa-editor/utils/transaction-utils';
import type { EditorOptions } from '../plugins/embedded-plugin.ts';
import { setupPlugins } from '../plugins/setup/setup-plugins.ts';
import {
  _doProcessDocument,
  _getState,
} from './_private/headless-document-internals.ts';

export function processDocumentHeadlessly(
  html: string,
  transactionGenerator: (
    state: EditorState,
  ) => TransactionCombinatorResult<boolean>,
  editorConfig: EditorOptions,
): string {
  const state = getStateFromConfig(html, editorConfig);
  return _doProcessDocument(transactionGenerator, state);
}

function getStateFromConfig(
  html: string,
  editorConfig: EditorOptions,
): EditorState {
  // We mock the intl service as we don't have it available in this context and we don't need it
  const editorSetup = setupPlugins({
    intl: { t: () => '' } as unknown as IntlService,
    ...editorConfig,
  });
  return _getState(html, editorSetup);
}
