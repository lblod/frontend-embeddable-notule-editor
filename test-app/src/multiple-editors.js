import { renderEditor } from '@lblod/embeddable-say-editor';
import { router } from './router';

document.body.appendChild(router);
const container = document.createElement('div');
document.body.appendChild(container);
container.style.display = 'flex';
container.style.justifyContent = 'space-between';
container.style.flexWrap = 'wrap';
const editors = [
  document.createElement('div'),
  document.createElement('div'),
  document.createElement('div'),
];
container.append(...editors);

editors.forEach((element, i) => {
  renderEditor({
    element,
    width: '500px',
    height: '500px',
    plugins: [],
    options: {},
  })
    .then((editor) => {
      editor.setHtmlContent(`Editor ${i}`);
      window[`editor${i}`] = editor;
    })
    .catch(console.error);
});
