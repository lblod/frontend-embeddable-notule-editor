import { processDocumentHeadlessly } from '../../app/main.ts';
import { pluginDemoConfig } from '../shared-config.ts';
import { setBesluitType } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/besluit-type-plugin/utils/set-besluit-type';
import { type BesluitTypeInstance } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/besluit-type-plugin/utils/besluit-type-instances';
import { router } from '../router.ts';

document.body.insertBefore(router, document.body.firstChild);

document.getElementById('button')?.addEventListener('click', () => {
  const besluit = (
    document.getElementById('besluit') as unknown as HTMLInputElement
  ).value;
  const besluitType = (
    document.getElementById('besluitType') as unknown as HTMLInputElement
  ).value;
  const html = processDocumentHeadlessly(
    besluit,
    (state) =>
      setBesluitType(state, {
        parent: { uri: besluitType },
      } as unknown as BesluitTypeInstance),
    pluginDemoConfig,
  );
  (document.getElementById('result') as HTMLElement).textContent = html;
});
