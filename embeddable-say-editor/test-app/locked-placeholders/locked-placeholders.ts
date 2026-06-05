import { processDocumentHeadlessly } from '../../app/main.ts';
import { pluginDemoConfig } from '../shared-config.ts';
import replaceLockedPlaceholderContent from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/locked-placeholder-plugin/utils/replace-content-function';
import { router } from '../router.ts';

document.body.insertBefore(router, document.body.firstChild);

document.getElementById('replace')?.addEventListener('click', () => {
  const besluit = (
    document.getElementById('besluit') as unknown as HTMLInputElement
  ).value;
  const values = {
    inline: '<b>inline</b>',
    block: '<ul><li>Block 1</li><li>Block 2</li></ul>',
  };
  const html = processDocumentHeadlessly(
    besluit,
    (state) => replaceLockedPlaceholderContent(state, values),
    pluginDemoConfig,
  );
  (document.getElementById('result') as HTMLElement).textContent = html;
});

document.getElementById('sample-document')?.addEventListener('click', () => {
  (document.getElementById('besluit') as unknown as HTMLInputElement).value =
    '<div data-content-container="true"><p class="say-paragraph"><span data-locked-placeholder="true" data-locked-placeholder-type="inline" data-label="Inline" data-key="inline"></span><span data-locked-placeholder="true" data-locked-placeholder-type="inline" data-label="Second Inline" data-key="inline"></span></p><div data-locked-placeholder="true" data-locked-placeholder-type="block" data-label="Block" data-key="block"></div></div>';
});
