import {  processDocumentHeadlessly } from '../../app/main.ts';
import { pluginDemoConfig } from '../shared-config.ts';
import { setBesluitType } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/besluit-type-plugin/utils/set-besluit-type';
import { router } from '../router.ts';

document.body.insertBefore(router, document.body.firstChild);



document.getElementById('button').addEventListener('click', () => {
  const besluit = document.getElementById('besluit').value as string
  const besluitType = document.getElementById('besluitType').value as string
  const html = processDocumentHeadlessly(
    besluit,
    (state) =>
      setBesluitType(state, { parent: { uri: besluitType } }),
    pluginDemoConfig,
  );
  document.getElementById('result').textContent = html;
})
