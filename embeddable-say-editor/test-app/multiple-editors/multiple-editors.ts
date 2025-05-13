import { renderEditor } from '../../app/main.ts';
import { router } from '../router.ts';

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

window.editors = {};
for (const element of editors) {
  await renderEditor({
    element,
    width: '500px',
    height: '500px',
    plugins: [],
    options: {},
  });
}
