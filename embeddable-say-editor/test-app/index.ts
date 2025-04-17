import { renderEditor } from '../app/main.ts';
import { router } from './router.ts';

const container = document.createElement('div');
document.body.appendChild(router);
document.body.appendChild(container);
container.style.height = '90vh';
container.style.width = '90vw';
const editor = await renderEditor({
  element: container,
  title: 'my editor', // optional, this will set the "title" attribute of the iframe
  width: '100%', // width attribute of the iframe
  height: '100%', // height attribute of the iframe
  plugins: ['html-edit'], // array of plugin names (see below)
  options: {
    table: {
      rowBackground: {
        odd: 'whitesmoke',
      },
    },
    image: {
      allowBase64Images: true,
      pasteLimit: 2000000,
    },
  }, // configuration object (see below)
});

// the editor is now initialized and can be used
editor.setHtmlContent('hello world');

// Facilitate development by making editor globally available
window.editor = editor;
