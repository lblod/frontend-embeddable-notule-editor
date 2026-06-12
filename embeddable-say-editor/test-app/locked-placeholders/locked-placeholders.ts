import {
  processDocumentHeadlessly,
  replaceLockedPlaceholderContent,
} from '../../app/main.ts';
import { pluginDemoConfig } from '../shared-config.ts';
import { router } from '../router.ts';
import { renderEditor } from '../../app/main.ts';

document.body.insertBefore(router, document.body.firstChild);

const editorBeforeElement: HTMLElement =
  document.getElementById('editor-before');
const beforeEditor = await renderEditor({
  element: editorBeforeElement,
  ...pluginDemoConfig,
  height: '100%',
});
const editorAfterElement = document.getElementById('editor-after');
const afterEditor = await renderEditor({
  element: editorAfterElement,
  ...pluginDemoConfig,
  height: '100%',
});

document.getElementById('replace')?.addEventListener('click', () => {
  const besluit = (
    document.getElementById('besluit') as unknown as HTMLInputElement
  ).value;
  const values = {
    inline: '<b>generated content for inline</b>',
    block: '<p>Generated content for block:</p><ul><li>Sample item 1</li><li>Sample item 2</li></ul>',
  };
  const html = processDocumentHeadlessly(
    besluit,
    (state) => replaceLockedPlaceholderContent(state, values),
    pluginDemoConfig,
  );
  (document.getElementById('result') as HTMLElement).textContent = html;
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
document.getElementById('sample-document')?.addEventListener('click', () => {
  (document.getElementById('besluit') as unknown as HTMLInputElement).value =
    '<div data-content-container="true"><p class="say-paragraph"><span data-locked-placeholder="true" data-locked-placeholder-type="inline" data-label="Inline" data-key="inline"></span><span data-locked-placeholder="true" data-locked-placeholder-type="inline" data-label="Second Inline" data-key="inline"></span></p><div data-locked-placeholder="true" data-locked-placeholder-type="block" data-label="Block" data-key="block"></div></div>';
});
