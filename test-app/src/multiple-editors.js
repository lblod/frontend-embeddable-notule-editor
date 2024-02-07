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

renderEditor({
  element: editors[0],
  width: '500px',
  height: '500px',
  plugins: [],
  options: {},
})
  .then((editor) => {
    editor.setHtmlContent('Editor 1');
  })
  .catch(console.error);
renderEditor({
  element: editors[1],
  width: '500px',
  height: '500px',
  plugins: [],
  options: {},
})
  .then((editor) => {
    editor.setHtmlContent('Editor 2');
  })
  .catch(console.error);
renderEditor({
  element: editors[2],
  width: '500px',
  height: '500px',
  plugins: [],
  options: {},
})
  .then((editor) => {
    editor.setHtmlContent('Editor 3');
  })
  .catch(console.error);
