import { renderEditor } from '@lblod/embeddable-say-editor';

const containers = [
  document.createElement('div'),
  document.createElement('div'),
  document.createElement('div'),
];
document.body.append(...containers);

await renderEditor({
  element: containers[0],
  width: '30%',
  height: '500px',
  plugins: [],
  options: {},
});
await renderEditor({
  element: containers[1],
  width: '30%',
  height: '500px',
  plugins: [],
  options: {},
});
await renderEditor({
  element: containers[2],
  width: '30%',
  height: '500px',
  plugins: [],
  options: {},
});
