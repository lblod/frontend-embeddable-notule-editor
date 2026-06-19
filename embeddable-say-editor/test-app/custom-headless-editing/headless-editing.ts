import {
  processDocumentHeadlessly,
  transactionCombinator,
  type EditorState,
} from '../../app/main.ts';
import { pluginDemoConfig } from '../shared-config.ts';
import { router } from '../router.ts';
import { renderEditor } from '../../app/main.ts';

document.body.insertBefore(router, document.body.firstChild);

const editorBeforeElement = document.getElementById('editor-before')!;

const editorAfterElement = document.getElementById('editor-after')!;

if (editorBeforeElement && editorAfterElement) {
  const beforeEditor = await renderEditor({
    element: editorBeforeElement,
    ...pluginDemoConfig,
    height: '100%',
  });
  const afterEditor = await renderEditor({
    element: editorAfterElement,
    ...pluginDemoConfig,
    height: '100%',
  });

  document.getElementById('insert-content')?.addEventListener('click', () => {
    const content =
      (document.getElementById('besluit') as HTMLInputElement | undefined)
        ?.value ?? '';
    beforeEditor.setHtmlContent(content);
  });

  document
    .getElementById('insert-content-after')
    ?.addEventListener('click', () => {
      const content =
        (document.getElementById('result') as HTMLElement | undefined)
          ?.textContent ?? '';

      afterEditor.setHtmlContent(content);
    });
}

document.getElementById('replace')?.addEventListener('click', () => {
  const sampledoc = (
    document.getElementById('besluit') as unknown as HTMLInputElement
  ).value;

  const myCustomProcessor = (state: EditorState) => {
    const tr = state.tr;
    tr.replaceRangeWith(
      0,
      tr.doc.nodeSize - 2,
      state.schema.text('replaced with something else!'),
    );
    return { initialState: state, transaction: tr, result: true };
  };

  const html = processDocumentHeadlessly(
    sampledoc,
    (state) => transactionCombinator<boolean>(state)([myCustomProcessor]),
    pluginDemoConfig,
  );

  (document.getElementById('result') as HTMLElement).textContent = html;
});

document.getElementById('sample-document')?.addEventListener('click', () => {
  (document.getElementById('besluit') as unknown as HTMLInputElement).value =
    'hello world';
});
