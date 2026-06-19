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
    const headerNodes: number[] = [];
    tr.doc.descendants((node, pos) => {
      if (node.type.name === 'heading') {
        headerNodes.push(pos);
        return false;
      }
      return true;
    });
    for (const pos of headerNodes) {
      const level =
        (tr.doc.nodeAt(pos)?.attrs.level as number | undefined) ?? 1;
      if (level > 1) {
        tr.setNodeAttribute(pos, 'level', level - 1);
      }
    }
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
    `<h1>hello world<h1>
<h2>hello world<h2>
<h3>hello world<h3>
<h4>hello world<h4>`;
});
